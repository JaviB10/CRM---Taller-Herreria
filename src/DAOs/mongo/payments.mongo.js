import { paymentModel } from "./models/payments.model.js";
import { logger } from "../../utils/loggers.js";

export default class Payments {
    constructor() {
        logger.info("Working with Payment in the DB");
    }

    getAll = async () => {
        return await paymentModel.find().lean();
    }

    getJobById = async (pid) => {
        return await paymentModel.findOne({ _id: pid }).populate("budget").lean();
    }

    save = async (payment) => {
        return await paymentModel.create(payment);
    }

    update = async (pid, payment) => {
        return await paymentModel.findOneAndUpdate(
            { _id: pid }, 
            payment,
            { new: true, runValidators: true });
    }

    delete = async (pid) => {
        return await paymentModel.deleteOne({ _id: pid });
    }
}