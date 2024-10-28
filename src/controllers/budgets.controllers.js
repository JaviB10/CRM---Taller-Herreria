import { getBudgetByIdService, getBudgetsService, removeBudgetMaterialsService, updateBudgetMaterialsService, updateBudgetService } from "../services/budgets.services.js";
import { CantUpdateEntity, EntityNotFound } from "../utils/custom-exceptions.js";

const getBudget = async (req, res) => {
    try {
        const budgets = await getBudgetsService();
        res.sendSuccess(budgets);
    } catch (error) {
        res.sendServerError(error.message);
    }
}

const getBudgetById = async (req, res) => {
    const { bid } = req.params;
    try {
        const budget = await getBudgetByIdService(bid);
        res.sendSuccess(budget);
    } catch (error) {
        if (error instanceof EntityNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    }
}

const updateBudget = async (req, res) => {
    const { bid } = req.params;
    const budget = req.body;
    try {
        const budgetUpdated = await updateBudgetService(bid, budget);
        res.sendSuccess(budgetUpdated);
    } catch (error) {
        if (error instanceof EntityNotFound) return res.sendClientError(error.message);
        if (error instanceof CantUpdateEntity) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    }
}

const updateBudgetMaterials = async (req, res) => {
    const { bid } = req.params;
    const material = req.body;
    try {         
        const materialsUpdated = await updateBudgetMaterialsService(bid, material);
        res.sendSuccess(materialsUpdated);
    } catch (error) {
        if (error instanceof EntityNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    }
}

const removeBudgetMaterials = async (req, res) => {
    const { bid, mid } = req.params;
    try {
        const budgetUpdated = await removeBudgetMaterialsService(bid, mid);
        res.sendSuccess(budgetUpdated);
    } catch (error) {
        if (error instanceof EntityNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    }
}

export {
    getBudget,
    getBudgetById,
    updateBudget,
    updateBudgetMaterials,
    removeBudgetMaterials
}