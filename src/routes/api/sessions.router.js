import { passportStrategyEnum } from "../../config/enums.js";
import { login, userLogout } from "../../controllers/sessions.controllers.js";
import Router from "../router.js"

export default class SessionsRouter extends Router {
    init() {
        this.post("/login", ["PUBLIC"], passportStrategyEnum.NOTHING, login);
        this.post("/logout", ["ADMIN"], passportStrategyEnum.JWT, userLogout);
    }
}