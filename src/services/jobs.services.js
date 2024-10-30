import JobsRepository from "../repositories/jobs.repository.js";
import ClientsRepository from "../repositories/clients.repository.js";
import BudgetsRepository from "../repositories/budgets.repository.js";
import { CantDeleteEntity, EntityNotFound } from "../utils/custom-exceptions.js";

const jobRepository = new JobsRepository();
const clientRepository = new ClientsRepository();
const budgetsRepository = new BudgetsRepository();

const getJobsService = async () => {
    return await jobRepository.getJobsRepository();
}

const getJobByIdService = async (jid) => {
    const job = await jobRepository.getJobByIdRepository(jid);
    if (!job) throw new EntityNotFound("Job not found");
    return job;
}

const createJobService = async (job, cid) => {
    const existingClient = await clientRepository.getClientByIdRepository(cid);
    
    if (!existingClient) throw new EntityNotFound("Client not found");
    
    const newJob = await jobRepository.saveJobRepository(job);
    const newBudget = await budgetsRepository.saveBudgetRepository({
        job: newJob._id,
        materials: []
    })

    await jobRepository.updateJobsRepository(newJob._id, { budget: newBudget._id });

    existingClient.jobs.push(newJob._id);

    await clientRepository.updateClientRepository(cid, { jobs: existingClient.jobs });

    return newJob;
}

const updateJobService = async (jid, job) => {
    const existingJob  = await jobRepository.getJobByIdRepository(jid);
    
    if (!existingJob ) throw new EntityNotFound("Job not found");

    const updateJob = { ...existingJob, ...job };

    return await jobRepository.updateJobsRepository(jid, updateJob);
}

const deleteJobService = async (jid) => {
    const job = await jobRepository.getJobByIdRepository(jid);
    
    if (!job) throw new EntityNotFound("Job not found");
    if (job.budgetAccepted === true) throw new CantDeleteEntity("The job has a budget that is accepted")

    if (job.budget.payments) {
        for(const payment of job.budget.payments) {
            const pid = payment._id;
            await paymentssRepository.deletePaymentRepository(pid);
        }
    }

    const bid = job.budget._id;
    await budgetsRepository.deleteBudgetRepository(bid);

    return await jobRepository.deleteJobRepository(jid);
}

export {
    getJobsService,
    getJobByIdService,
    createJobService,
    updateJobService,
    deleteJobService
}