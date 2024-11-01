import { loginService } from "../services/sessions.services.js";
import { getUserByEmailService } from "../services/users.services.js";
import { IncorrectLoginCredentials } from "../utils/custom-exceptions.js";
import { logger } from "../utils/loggers.js";

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await getUserByEmailService(email);
        
        const accessToken = await loginService(password, user);
        
        return res.cookie(
            'CookieToken', accessToken, { maxAge: 60 * 60 * 1000, httpOnly: true }
        ).send({
            status: "success",
            payload: {
                token: accessToken,
                email: user.email,
                role: user.role
            }
        })
    } catch (error) {
        if (error instanceof IncorrectLoginCredentials) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    }
}

const userLogout = (req, res) => {
    try {
        res.clearCookie("CookieToken");
        logger.info('Access token deleted successfully');
        return res.sendSuccess({ message: "Access token deleted successfully" })
    } catch (error) {
        res.sendServerError(error.message);
    }
}

export {
    login,
    userLogout
}