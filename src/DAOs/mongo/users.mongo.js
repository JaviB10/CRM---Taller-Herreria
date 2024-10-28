import { userModel } from "./models/users.model.js";
import { logger } from "../../utils/loggers.js";

export default class Users {
    constructor() {
        logger.info("Working with Users in the DB");
    }

    getAll = async () => {
        return await userModel.find().lean();
    }

    getUserById = async (uid) => {
        return await userModel.findOne({_id:uid}).lean();
    }

    getUserByEmail = async (email) => {
        return await userModel.findOne({email}).lean();
    }

    save = async (user) => {
        return await userModel.create(user);
    }

    update = async (uid, user) => {
        return await userModel.findOneAndUpdate(
            { _id: uid },
            user,
            { new: true, runValidators: true } // new: true devuelve el documento actualizado, runValidators asegura que las validaciones se apliquen
        );
    }

    delete = async (uid) => {
        return await userModel.deleteOne({_id:uid});
    }
}