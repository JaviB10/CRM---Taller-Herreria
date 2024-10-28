import { USERSDAO } from "../DAOs/factory.js"

export default class UsersRepository {
    constructor() {
        this.dao = USERSDAO;
    }

    getUsersRepository = async () => {
        const users = await this.dao.getAll();
        return users;
    }

    getUserByIdRepository = async (uid) => {
        const user = await this.dao.getUserById(uid);
        return user;
    }

    getUserByEmailRepository = async (email) => {
        const user = await this.dao.getUserByEmail(email);
        return user;
    }

    saveUserRepository = async (user) => {
        const res = await this.dao.save(user);
        return res;
    }

    updateUserRepository = async (uid, user) => {
        const res = await this.dao.update(uid, user);
        return res;
    }

    deleteUserRepository = async (uid) => {
        const res = await this.dao.delete(uid);
        return res;
    }
}