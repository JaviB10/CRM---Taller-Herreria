import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema({

    name: String,
    lastName: String,
    phone: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    role: {
        type: String,
        enum: ['ADMIN', 'USER'],
        required: true,
        default: 'USER'
    }

})

export const userModel = mongoose.model(userCollection, userSchema);