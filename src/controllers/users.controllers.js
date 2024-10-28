import { createUserService, deleteUserService, getUserByEmailService, getUserByIdService, getUsersService, updateUserService } from "../services/users.services.js"
import { CantDeleteEntity, IncompleteValues, EntityAlreadyExists, EntityNotFound, EntityContactAlreadyExists } from "../utils/custom-exceptions.js";

const getUser = async (req, res) => {
    try {
        const users = await getUsersService();
        res.sendSuccess(users);
    } catch (error) {
        res.sendServerError(error.message);
    }
}

const getUserById = async (req, res) => {
    const { uid } = req.params; 
    try {
        const user = await getUserByIdService(uid);
        res.sendSuccess(user);
    } catch (error) {
        if (error instanceof EntityNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    }
}

const getUserByEmail = async (req, res) => {
    const { email } = req.body; 
    try {
        const user = await getUserByEmailService(email);
        res.sendSuccess(user);
    } catch (error) {
        if (error instanceof EntityNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    }
}

const createUser = async (req, res) => {
    const user = req.body
    try {
        const newUser = await createUserService(user);
        res.sendCreated(newUser);
    } catch (error) {
        if (error instanceof EntityAlreadyExists) return res.sendClientError(error.message);
        if (error instanceof IncompleteValues) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    }
}

const updateUser = async (req, res) => {
    const { uid } = req.params;
    const user = req.body;

    try {
        const userUpdate = await updateUserService(uid, user);
        res.sendSuccess(userUpdate);
    } catch (error) {
        if (error instanceof EntityNotFound) return res.sendClientError(error.message);
        if (error instanceof EntityContactAlreadyExists) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    }
}

const deleteUser = async (req, res) => {
    const { uid } = req.params;
    try {
        await deleteUserService(uid);
        res.sendSuccess({ message: "User deleted seccessfully" });
    } catch (error) {
        if (error instanceof EntityNotFound) return res.sendClientError(error.message);
        if (error instanceof CantDeleteEntity) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    }
}

export {
    getUser,
    getUserById,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser
}