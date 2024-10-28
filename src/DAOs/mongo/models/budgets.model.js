import mongoose from "mongoose";

const budgetCollection = "budgets";

const budgetSchema = new mongoose.Schema({
    job: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'jobs' 
    },
    payments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'payments'
    }],
    materials: [{
        materialName: String,
        amount: Number,
        price: Number
    }],
    totalMaterialCost: {
        type: Number,
        default: 0
    },
    labourCost: {
        type: Number,
        default: 0
    },
    paidAmount: {
        type: Number,
        default: 0
    },
    paymentStatus: {
        type: String,
        enum: ["No pagado", "Parcialmente pagado", "Pagado completamente"],
        default: "No pagado"
    }
})

export const budgetModel = mongoose.model(budgetCollection, budgetSchema);