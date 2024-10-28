import Router from "../router.js";
import { passportStrategyEnum } from "../../config/enums.js";
import { generateInvoice } from "../../controllers/invoice.controllers.js";

export default class InvoiceRouter extends Router {
    init() {
        this.get("/:cid", ["ADMIN"], passportStrategyEnum.JWT, generateInvoice)
    }
}