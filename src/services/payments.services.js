import BudgetsRepository from "../repositories/budgets.repository.js";
import PaymentsRepository from "../repositories/payments.repository.js";
import { CantUpdateEntity, EntityNotFound, IncompleteValues } from "../utils/custom-exceptions.js";

const paymentsRepository = new PaymentsRepository();
const budgetsRepository = new BudgetsRepository();

const getPaymentsService = async () => {
    return await paymentsRepository.getPaymentsRepository();
}

const getPaymentByIdService = async (pid) => {
    const payment = await paymentsRepository.getPaymentByIdRepository(pid);
    
    if (!payment) throw new EntityNotFound("Payment not found");
    
    return payment;
}

const createPaymentService = async (payment, bid) => {
    const existingBudget = await budgetsRepository.getBudgetByIdRepository(bid);
    
    if (!existingBudget) throw new EntityNotFound("Budget not found");

    if (!payment.amount || !payment.paymentMethod) throw new IncompleteValues("The payment has not provided all the required values");
    
    payment.budget = bid;

    const newPayment = await paymentsRepository.savePaymentRepository(payment);
    
    await budgetsRepository.updateBudgetPaymentRepository(bid, newPayment);

    // Volver a cargar el presupuesto con el nuevo pago agregado
    const updatedBudget = await budgetsRepository.getBudgetByIdRepository(bid);

    if (!updatedBudget) throw new EntityNotFound("Budget not found");
    
    // Calcular el total de los pagos realizados
    const totalPayments = updatedBudget.payments.reduce((acc, payment) => acc + payment.amount, 0);
    
    updatedBudget.paidAmount = totalPayments;
    
    if (totalPayments >= updatedBudget.totalMaterialCost + updatedBudget.labourCost) updatedBudget.paymentStatus = "Pagado completamente";
    else if (totalPayments > 0) updatedBudget.paymentStatus = "Parcialmente pagado";
    else if (totalPayments == 0) updatedBudget.paymentStatus = "No pagado";
    
    await budgetsRepository.updateBudgetRepository(bid, updatedBudget);
    return newPayment;
};

const updatePaymentService = async (pid, payment) => {
    const existingPayment = await paymentsRepository.getPaymentByIdRepository(pid);
    
    if (!existingPayment) throw new EntityNotFound("Payment not found");
    if (existingPayment.hasOwnProperty('paymentDate')) throw new CantUpdateEntity("Cannot directly update paymentDate. Use the appropriate methods to update these values.");

    const updatedPayment = { ...existingPayment, ...payment };
    await paymentsRepository.updatePaymentRepository(pid, updatedPayment);

    const bid = existingPayment.budget;
    const existingBudget = await budgetsRepository.getBudgetByIdRepository(bid);
    
    if (!existingBudget) throw new EntityNotFound("Budget not found");

    // Recalcular el total de pagos del presupuesto
    const totalPayments = existingBudget.payments.reduce((acc, payment) => acc + payment.amount, 0);

    // Actualizar el campo de pago total en el presupuesto
    existingBudget.paidAmount = totalPayments;

    if (totalPayments >= budget.totalMaterialCost + budget.labourCost) budget.paymentStatus = "Pagado completamente";
    if (totalPayments > 0) budget.paymentStatus = "Parcialmente pagado";
    if (totalPayments == 0) budget.paymentStatus = "No pagado";

    await budgetsRepository.updateBudgetRepository(bid, existingBudget);

    return updatedPayment;
}

const deletePaymentService = async (pid) => {
    const existingPayment = await paymentsRepository.getPaymentByIdRepository(pid);
    
    if (!existingPayment) throw new EntityNotFound("Payment not found");

    await paymentsRepository.deletePaymentRepository(pid);
    
    const bid = existingPayment.budget;
    const existingBudget = await budgetsRepository.getBudgetByIdRepository(bid);
    
    if (!existingBudget) throw new EntityNotFound("Budget not found");

    // Recalcular el total de pagos del presupuesto
    const totalPayments = existingBudget.payments.reduce((acc, payment) => acc + payment.amount, 0);

    // Actualizar el campo de pago total en el presupuesto
    existingBudget.paidAmount = totalPayments;

    if (totalPayments >= existingBudget.totalMaterialCost + existingBudget.labourCost) existingBudget.paymentStatus = "Pagado completamente";
    else if (totalPayments > 0) existingBudget.paymentStatus = "Parcialmente pagado";
    else if (totalPayments == 0) existingBudget.paymentStatus = "No pagado";

    await budgetsRepository.updateBudgetRepository(bid, existingBudget);

    return {
        deletedPayment: existingPayment,
        updatedBudget: existingBudget
    };
}

export {
    getPaymentsService,
    getPaymentByIdService,
    createPaymentService,
    updatePaymentService,
    deletePaymentService
}