import { jobModel } from "./models/jobs.model.js";
import { logger } from "../../utils/loggers.js";

export default class Jobs {
    constructor() {
        logger.info("Working with Jobs in the DB");
    }

    getAll = async () => {
        return await jobModel.find().lean();
    }

    getJobById = async (jid) => {
        return await jobModel.findOne({ _id: jid }).populate("budget").lean();
    }

    save = async (job) => {
        return await jobModel.create(job);
    }

    update = async (jid, job) => {
        return await jobModel.findOneAndUpdate(
            {_id:jid}, 
            job,
            { new: true, runValidators: true });
    }

    delete = async (jid) => {
        return await jobModel.deleteOne({_id:jid});
    }
}