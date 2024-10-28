import { BUDGETSDAO } from "../DAOs/factory.js";

export default class BudgetsRepository {
    constructor () {
        this.dao = BUDGETSDAO;
    }

    getBudgetsRepostory = async () => {
        const budgets = await this.dao.getAll();
        return budgets;
    }

    getBudgetByIdRepository = async (bid) => {
        const budget = await this.dao.getBudgetById(bid);
        return budget;
    }

    saveBudgetRepository = async (budget) => {
        const res = await this.dao.save(budget);
        return res;
    }

    updateBudgetRepository = async (bid, budget) => {
        const res = await this.dao.update(bid, budget);
        return res;
    }

    updateBudgetMaterialRepository = async (bid, material) => {
        const res = await this.dao.updateMaterials(bid, material);
        return res;
    }

    updateBudgetPaymentRepository = async (bid, payment) => {
        const res = await this.dao.updatePayments(bid, payment);
        return res;
    }

    deleteBudgetRepository = async (bid) => {
        const res = await this.dao.delete(bid);
        return res;
    }
}