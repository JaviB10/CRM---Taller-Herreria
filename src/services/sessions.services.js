import { IncorrectLoginCredentials, IncorrectToken } from "../utils/custom-exceptions.js";
import { generateToken, isValidPassword, validateToken } from "../utils/utils.js";

const loginService = async (password, user) => {
    const comparePassword = isValidPassword(user, password);

    if (!comparePassword) throw new IncorrectLoginCredentials("Incorrect credentials");
    
    const accessToken = generateToken(user);
    return accessToken;
}

const verificarTokenService = async (token) => {
    const validate = validateToken(token);

    if (!validate) throw new IncorrectToken("Access token invalidate");

    const { user } = validate;
    return user;
}

export {
    loginService,
    verificarTokenService
}