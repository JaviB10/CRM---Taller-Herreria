import { generateInvoicePDF } from "../utils/pdf-invoice.js";

const generateInvoice = async (req, res) => {
    const { cid } = req.params;
    try {
        return await generateInvoicePDF(cid, res);
    } catch (error) {
        res.sendServerError(error.message);
    }
}

export {
    generateInvoice
}