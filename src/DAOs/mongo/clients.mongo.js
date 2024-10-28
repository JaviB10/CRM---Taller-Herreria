import { clientMongo } from "./models/clients.model.js";
import { logger } from "../../utils/loggers.js";

export default class Clients {
    constructor() {
        logger.info("Working with Clients in the DB");
    }

    getAll = async () => {
        return await clientMongo.find().lean();
    }

    getClientById = async (cid) => {
        return await clientMongo.findOne({ _id: cid }).populate({
        path: 'jobs',
        populate: {
            path: 'budget',
            populate: {
                path: 'payments'
            }
        }
    }).lean();
    }

    getClientByPhone = async (phone) => {
        return await clientMongo.findOne({phone:phone}).lean();
    }
    
    save = async (client) => {
        return await clientMongo.create(client);
    }

    update = async (cid, client) => {
        return await clientMongo.updateOne({_id:cid}, client);
    }

    delete = async (cid) => {
        return await clientMongo.deleteOne({_id:cid});
    }
}