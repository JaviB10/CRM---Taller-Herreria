import Router from "../router.js";
import { passportStrategyEnum } from "../../config/enums.js";
import { createUser, deleteUser, getUser, getUserByEmail, getUserById, updateUser } from "../../controllers/users.controllers.js";

export default class UserRouter extends Router {
    init() {
        this.get("/", ["ADMIN"], passportStrategyEnum.JWT, getUser);
        this.get("/:uid", ["ADMIN"], passportStrategyEnum.JWT, getUserById);
        this.post("/email", ["ADMIN"], passportStrategyEnum.JWT, getUserByEmail);
        this.post("/", ["ADMIN"], passportStrategyEnum.JWT, createUser);
        this.put("/:uid", ["ADMIN"], passportStrategyEnum.JWT, updateUser);
        this.delete("/:uid", ["ADMIN"], passportStrategyEnum.JWT, deleteUser);
    }
}