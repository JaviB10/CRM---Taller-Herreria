import mongoose from "mongoose";

const paymentCollection = "payments";

const paymentSchema = new mongoose.Schema({

    budget: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'budgets'
    },
    amount: {
        type: Number,
        required: true
    },
    paymentDate: {
        type: Date,
        default: Date.now
    },
    paymentMethod: {
        type: String,
        enum: ["Efectivo", "Transferencia", "Tarjeta", "Otro"],
        required: true
    },
    notes: String
})

export const paymentModel = mongoose.model(paymentCollection, paymentSchema);