import { createJobService, deleteJobService, getJobByIdService, getJobsService, updateJobService } from "../services/jobs.services.js";
import { CantDeleteEntity, EntityNotFound } from "../utils/custom-exceptions.js";

const getJobs = async (req, res) => {
    try {
        const jobs = await getJobsService();
        res.sendSuccess(jobs);
    } catch (error) { 
        res.sendServerError(error.message);
    }
}

const getJobById = async (req, res) => {
    const { jid } = req.params; 
    try {
        const job = await getJobByIdService(jid);
        res.sendSuccess(job);
    } catch (error) {
        if (error instanceof EntityNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    }
}

const createJob = async (req, res) => {
    const { cid } = req.params;
    const job = req.body;
    try {
        const newJob = await createJobService(job, cid);
        res.sendCreated(newJob);
    } catch (error) {
        if (error instanceof EntityNotFound) return res.sendNotFound(error.message);
        res.sendServerError(error.message);
    }
}

const updateJob = async (req, res) => {
    const { jid } = req.params;
    const job = req.body;
    try {
        const jobUpdate = await updateJobService(jid, job);
        res.sendSuccess(jobUpdate);
    } catch (error) {
        if (error instanceof EntityNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    }
}

const deleteJob = async (req, res) => {
    const { jid } = req.params;
    try {
        await deleteJobService(jid);
        res.sendSuccess({ message: 'Job deleted seccessfully' });
    } catch (error) {
        if (error instanceof EntityNotFound) return res.sendClientError(error.message);
        if (error instanceof CantDeleteEntity) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    }
}

export {
    getJobs,
    getJobById,
    createJob,
    updateJob,
    deleteJob
}