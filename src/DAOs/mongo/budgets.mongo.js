import { budgetModel } from "./models/budgets.model.js";
import { logger } from "../../utils/loggers.js";

export default class Budgets {
    constructor() {
        logger.info("Working with budgets in the DB");
    }

    getAll = async () => {
        return await budgetModel.find().lean();
    }

    getBudgetById = async (bid) => {
        return await budgetModel.findOne({ _id: bid }).populate("payments").lean();
    }

    save = async (budget) => {
        return await budgetModel.create(budget);
    }

    update = async (bid, budget) => {
        return await budgetModel.updateOne({ _id: bid }, budget);
    } 

    updateMaterials = async (bid, material) => {
        return await budgetModel.findOneAndUpdate(
            { _id: bid },
            { $addToSet: { materials: material } },  // Agregar material al array de materiales
            { new: true, runValidators: true }
        );
    }

    updatePayments = async (bid, payment) => {
        return await budgetModel.findOneAndUpdate(
            { _id: bid },
            { $addToSet: { payments: payment._id } },  // Agregar ID de pago al array de pagos
            { new: true, runValidators: true }
        );
    }

    delete = async (bid) => {
        return await budgetModel.deleteOne({ _id: bid });
    }
}