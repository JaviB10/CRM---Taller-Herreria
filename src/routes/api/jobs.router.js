import Router from "../router.js";
import { passportStrategyEnum } from "../../config/enums.js";
import { createJob, deleteJob, getJobById, getJobs, updateJob } from "../../controllers/jobs.controllers.js";


export default class JobRouter extends Router {
    init() {
        this.get("/", ["ADMIN"], passportStrategyEnum.JWT, getJobs);
        this.get("/:jid", ["ADMIN"], passportStrategyEnum.JWT, getJobById);
        this.post("/:cid", ["ADMIN"], passportStrategyEnum.JWT, createJob);
        this.put("/:jid", ["ADMIN"], passportStrategyEnum.JWT, updateJob);
        this.delete("/:jid", ["ADMIN"], passportStrategyEnum.JWT, deleteJob);
    }
}