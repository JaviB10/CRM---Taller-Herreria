import BudgetsRepository from "../repositories/budgets.repository.js";
import { CantUpdateEntity, EntityNotFound } from "../utils/custom-exceptions.js";

const budgetRespository = new BudgetsRepository();

const getBudgetsService = async () => {
    return await budgetRespository.getBudgetsRepostory();
}

const getBudgetByIdService = async (bid) => {
    const budget = await budgetRespository.getBudgetByIdRepository(bid);
    
    if (!budget) throw new EntityNotFound("Budget not found");
    
    return budget;
}

const updateBudgetService = async (bid, budget) => {
    const existingBudget = await budgetRespository.getBudgetByIdRepository(bid);
    
    if (!existingBudget) throw new EntityNotFound("Budget not found");
    if (budget.hasOwnProperty('totalMaterialCost') || budget.hasOwnProperty('paidAmount') || budget.hasOwnProperty('paymentStatus')) throw new CantUpdateEntity("Cannot directly update totalMaterialCost, paidAmount, or paymentStatus. Use the appropriate methods to update these values.");
    
    const updatedBudget = {...existingBudget, ...budget};

    return await budgetRespository.updateBudgetRepository(bid, updatedBudget);
}

const updateBudgetMaterialsService = async (bid, material) => {
    const existingBudget = await budgetRespository.getBudgetByIdRepository(bid);

    if (!existingBudget) throw new EntityNotFound("Budget not found");

    //Combinar los materiales existentes con el nuevo material
    const updatedMaterials = [...existingBudget.materials, material];

    const totalMaterialCost = updatedMaterials.reduce((acc, material) => acc + (material.amount * material.price), 0);

    const updatedBudget = {
        ...existingBudget,
        materials: updatedMaterials,
        totalMaterialCost: totalMaterialCost
    };

    return await budgetRespository.updateBudgetRepository(bid, updatedBudget);
}

const removeBudgetMaterialsService = async (bid, mid) => {
    const existingBudget = await budgetRespository.getBudgetByIdRepository(bid);

    if (!existingBudget) throw new EntityNotFound("Budget not found");

    const updatedMaterials = existingBudget.materials.filter(material => 
        material._id.toString() !== mid
    );
    
    existingBudget.materials = updatedMaterials;

    existingBudget.totalMaterialCost = updatedMaterials.reduce((acc, material) => acc + (material.amount * material.price), 0);

    return await budgetRespository.updateBudgetRepository(bid, existingBudget );
}

export {
    getBudgetsService,
    getBudgetByIdService,
    updateBudgetService,
    updateBudgetMaterialsService,
    removeBudgetMaterialsService
}