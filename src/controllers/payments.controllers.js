import { createPaymentService, deletePaymentService, getPaymentByIdService, getPaymentsService, updatePaymentService } from "../services/payments.services.js";
import { EntityNotFound, IncompleteValues } from "../utils/custom-exceptions.js";

const getPayments = async (req, res) => {
    try {
        const payments = await getPaymentsService();
        res.sendSuccess(payments);
    } catch (error) { 
        res.sendServerError(error.message);
    }
}

const getPaymentById = async (req, res) => {
    const { pid } = req.params; 
    try {
        const payment = await getPaymentByIdService(pid);
        res.sendSuccess(payment);
    } catch (error) {
        if (error instanceof EntityNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    }
}

const createPayment = async (req, res) => {
    const { bid } = req.params;
    const payment = req.body;
    try {
        const newPayment = await createPaymentService(payment, bid);
        res.sendCreated(newPayment);
    } catch (error) {
        if (error instanceof EntityNotFound) return res.sendClientError(error.message);
        if (error instanceof IncompleteValues) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    }
}

const updatePayment = async (req, res) => {
    const { pid } = req.params;
    const payment = req.body;
    try {
        const paymentUpdate = await updatePaymentService(pid, payment);
        res.sendSuccess(paymentUpdate);
    } catch (error) {
        if (error instanceof EntityNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    }
}

const deletePayment = async (req, res) => {
    const { pid } = req.params;
    try {
        const { deletedPayment, updatedBudget } = await deletePaymentService(pid);
        res.sendSuccess({
            message: 'Payment deleted successfully',
            deletedPayment,
            updatedBudget 
        });
    } catch (error) {
        if (error instanceof EntityNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    }
}

export {
    getPayments,
    getPaymentById,
    createPayment,
    updatePayment,
    deletePayment
}