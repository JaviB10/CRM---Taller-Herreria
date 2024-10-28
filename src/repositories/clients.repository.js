import { CLIENTSDAO } from "../DAOs/factory.js";

export default class ClientsRepository {
    constructor() {
        this.dao = CLIENTSDAO;
    }

    getClientsRepository = async () => {
        const clients = await this.dao.getAll();
        return clients;
    }

    getClientByIdRepository = async (cid) => {
        const client = await this.dao.getClientById(cid);
        return client;
    }

    getClientByPhoneRepository = async (phone) => {
        const client = await this.dao.getClientByPhone(phone);
        return client;
    }

    saveClientRepository = async (client) => {
        const res = await this.dao.save(client);
        return res;
    }

    updateClientRepository = async (cid, client) => {
        const res = await this.dao.update(cid, client);
        return res;
    }

    deleteClientRepository = async (cid) => {
        const res = await this.dao.delete(cid);
        return res;
    }
}