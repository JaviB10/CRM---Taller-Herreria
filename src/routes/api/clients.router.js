import Router from "../router.js";
import { passportStrategyEnum } from "../../config/enums.js";
import { createClient, deleteClient, getClient, getClientById, getClientByPhone, updateClient } from "../../controllers/clients.controllers.js";

export default class ClientRouter extends Router {
    init() {
        this.get("/", ["ADMIN"], passportStrategyEnum.JWT, getClient);
        this.get("/:cid", ["ADMIN"], passportStrategyEnum.JWT, getClientById);
        this.post("/phone", ["ADMIN"], passportStrategyEnum.JWT, getClientByPhone);
        this.post("/", ["ADMIN"], passportStrategyEnum.JWT, createClient);
        this.put("/:cid", ["ADMIN"], passportStrategyEnum.JWT, updateClient);
        this.delete("/:cid", ["ADMIN"], passportStrategyEnum.JWT, deleteClient);
    }
}