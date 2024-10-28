import mongoose from "mongoose";

const jobCollection = "jobs";

const jobSchema = new mongoose.Schema({

    details: String,
    createAt: { 
        type: Date, 
        default: Date.now 
    },
    isFinished: { 
        type: Boolean, 
        default: false 
    },
    finishAt: {
        type: Date,
        default: null
    },
    budgetAccepted: { 
        type: Boolean, 
        default: false 
    },
    acceptedAt: {
        type: Date,
        default: null
    },
    client: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'clients' 
    },
    budget: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'budgets' 
    },
})

jobSchema.pre('findOneAndUpdate', function(next) {
    const update = this.getUpdate();  // Obtén los valores actualizados

    // Verifica si `isFinished` está en la actualización y actúa en consecuencia
    if (update.isFinished === true) {
        update.finishAt = new Date();  // Establece la fecha actual como `finishAt`
    } else if (update.isFinished === false) {
        update.finishAt = null;  // Establece `finishAt` como null si `isFinished` es `false`
    }

    // Verifica si `budgetAccepted` está en la actualización y actúa en consecuencia
    if (update.budgetAccepted === true) {
        update.acceptedAt = new Date();  // Establece la fecha actual como `acceptedAt`
    } else if (update.budgetAccepted === false) {
        update.acceptedAt = null;  // Establece `acceptedAt` como null si `budgetAccepted` es `false`
    }

    next();
});

export const jobModel = mongoose.model(jobCollection, jobSchema);