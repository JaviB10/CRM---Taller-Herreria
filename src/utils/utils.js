import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PRIVATE_KEY } from "../config/contants.js";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const __mainDirname = path.join(__dirname, "..")

export default __mainDirname;

export const generateToken = (user) => {
    const payload = { id: user._id, email: user.email, role: user.role };
    return jwt.sign(payload, PRIVATE_KEY, { expiresIn: "1h" });
}

export const generateTokenPassword = (user) => {
    const { _id, email } = user; // Desestructura los campos que necesitas
    return jwt.sign({ id: _id, email }, PRIVATE_KEY, { expiresIn: "1h" });
}

export const validateToken = (token) => {
    try {
        const decoded = jwt.verify(token, PRIVATE_KEY);
        return { valid: true, decoded }; // Retorna un objeto que indica que es válido y el contenido decodificado
    } catch (error) {
        return { valid: false, message: error.message }; // Retorna que no es válido y el mensaje de error
    }
}

export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

export const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password);
}

export const formatDate = (date) => {
    if (!date) return 'N/A'
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(date).toLocaleDateString('es-ES', options);
}

export const formatCurrency = (amount) => {
    return amount.toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
};