import Router from "../router.js";
import { passportStrategyEnum } from "../../config/enums.js";
import { getBudget, getBudgetById, removeBudgetMaterials, updateBudget, updateBudgetMaterials } from "../../controllers/budgets.controllers.js";

export default class BudgetRouter extends Router {
    init() {
        this.get("/", ["ADMIN"], passportStrategyEnum.JWT, getBudget),
        this.get("/:bid", ["ADMIN"], passportStrategyEnum.JWT, getBudgetById),
        this.put("/:bid", ["ADMIN"], passportStrategyEnum.JWT, updateBudget),
        this.put("/material/:bid", ["ADMIN"], passportStrategyEnum.JWT, updateBudgetMaterials),
        this.get("/remove/:bid/:mid", ["ADMIN"], passportStrategyEnum.JWT, removeBudgetMaterials)
    }
}