import { createClientService, deleteClientService, getClientByIdService, getClientByPhoneService, getClientsService, updateClientService } from "../services/clients.services.js";
import { CantDeleteEntity, EntityAlreadyExists, EntityContactAlreadyExists, EntityNotFound, IncompleteValues } from "../utils/custom-exceptions.js";

const getClient = async (req, res) => {
    try {
        const clients = await getClientsService();
        res.sendSuccess(clients);
    } catch (error) {
        res.sendServerError(error.message);
    }
}

const getClientById = async (req, res) => {
    const { cid } = req.params; 
    try {
        const client = await getClientByIdService(cid);
        res.sendSuccess(client);
    } catch (error) {
        if (error instanceof EntityNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    }
}

const getClientByPhone = async (req, res) => {
    const { phone } = req.body;
    try {
        const client = await getClientByPhoneService(phone);
        res.sendSuccess(client);
    } catch (error) {
        if (error instanceof EntityNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    }
}

const createClient = async (req, res) => {
    const client = req.body
    try {
        const newClient = await createClientService(client);
        res.sendCreated(newClient);
    } catch (error) {
        if (error instanceof EntityAlreadyExists) return res.sendClientError(error.message);
        if (error instanceof IncompleteValues) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    }
}

const updateClient = async (req, res) => {
    const { cid } = req.params;
    const client = req.body;
    try {
        const clientUpdate = await updateClientService(cid, client);
        res.sendSuccess(clientUpdate);
    } catch (error) {
        if (error instanceof EntityNotFound) return res.sendClientError(error.message);
        if (error instanceof EntityContactAlreadyExists) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    }
}

const deleteClient = async (req, res) => {
    const { cid } = req.params;
    try {
        await deleteClientService(cid);
        res.sendSuccess({ message: 'Client deleted seccessfully' });
    } catch (error) {
        if (error instanceof EntityNotFound) return res.sendClientError(error.message);
        if (error instanceof CantDeleteEntity) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    }
}

export {
    getClient,
    getClientById,
    getClientByPhone,
    createClient,
    updateClient,
    deleteClient
}