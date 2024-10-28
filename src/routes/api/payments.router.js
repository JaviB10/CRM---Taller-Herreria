import Router from "../router.js";
import { passportStrategyEnum } from "../../config/enums.js";
import { createPayment, deletePayment, getPaymentById, getPayments, updatePayment } from "../../controllers/payments.controllers.js";

export default class PaymentRouter extends Router {
    init() {
        this.get("/", ["ADMIN"], passportStrategyEnum.JWT, getPayments),
        this.get("/:pid", ["ADMIN"], passportStrategyEnum.JWT, getPaymentById),
        this.post("/:bid", ["ADMIN"], passportStrategyEnum.JWT, createPayment),
        this.put("/:pid", ["ADMIN"], passportStrategyEnum.JWT, updatePayment),
        this.delete("/:pid", ["ADMIN"], passportStrategyEnum.JWT, deletePayment)
    }
}