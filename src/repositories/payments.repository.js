import { PAYMENTSDAO } from "../DAOs/factory.js";

export default class PaymentsRepository {
    constructor () {
        this.dao = PAYMENTSDAO;
    }

    getPaymentsRepository = async () => {
        const jobs = await this.dao.getAll();
        return jobs;
    }

    getPaymentByIdRepository = async (pid) => {
        const job = await this.dao.getPaymentById(pid);
        return job;
    }

    savePaymentRepository = async (payment) => {
        const res = await this.dao.save(payment);
        return res;
    }

    updatePaymentRepository = async (pid, payment) => {
        const res = await this.dao.update(pid, payment);
        return res;
    }

    deletePaymentRepository = async (pid) => {
        const res = await this.dao.delete(pid);
        return res;
    }
}