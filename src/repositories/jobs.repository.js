import { JOBSDAO } from "../DAOs/factory.js";

export default class JobsRepository {
    constructor () {
        this.dao = JOBSDAO;
    }

    getJobsRepository = async () => {
        const jobs = await this.dao.getAll();
        return jobs;
    }

    getJobByIdRepository = async (jid) => {
        const job = await this.dao.getJobById(jid);
        return job;
    }

    saveJobRepository = async (job) => {
        const res = await this.dao.save(job);
        return res;
    }

    updateJobsRepository = async (jid, job) => {
        const res = await this.dao.update(jid, job);
        return res;
    }

    deleteJobRepository = async (jid) => {
        const res = await this.dao.delete(jid);
        return res;
    }
}