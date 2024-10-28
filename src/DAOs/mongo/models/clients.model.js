import mongoose from "mongoose";

const clientCollection = "clients";

const clientSchema = new mongoose.Schema({

    name: String,
    lastName: String,
    address: String,
    phone: { 
        type: String, 
        unique: true 
    },
    jobs: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'jobs' 
    }],

})

export const clientMongo = mongoose.model(clientCollection, clientSchema);