import UsersRepository from "../repositories/users.repository.js";
import { createHash } from "../utils/utils.js";
import { CantDeleteEntity, EntityAlreadyExists, EntityContactAlreadyExists, EntityNotFound } from "../utils/custom-exceptions.js";

const userRepository = new UsersRepository();

const getUsersService = async () => {
    return await userRepository.getUsersRepository();
}

const getUserByIdService = async (uid) => {
    const user = await userRepository.getUserByIdRepository(uid);
    if (!user) throw new EntityNotFound("User not found");
    return user;
}

const getUserByEmailService = async (email) => {
    const user = await userRepository.getUserByEmailRepository(email);
    if (!user) {
        throw new EntityNotFound("User not found");
    }
    return user;
}

const createUserService = async (user) => {    
    const existingUser = await userRepository.getUserByEmailRepository(user.email);
    
    if (existingUser) throw new EntityAlreadyExists("User already exists");
    
    if (!user.name || !user.last_name || !user.phone || !user.email || !user.password) throw new IncompleteValues("The user has not provided all the required values");

    user.password = createHash(user.password);

    if (!user.role) {
        user.role = 'USER';
    }
   
    return await userRepository.saveUserRepository(user);
}

const updateUserService = async (uid, user) => {
    const existingUser  = await userRepository.getUserByIdRepository(uid);
   
    if (!existingUser ) throw new EntityNotFound("User not found");
    if (existingUser.phone === user.phone) throw new EntityContactAlreadyExists("The phone number has already been taken");
    if (existingUser.email === user.email) throw new EntityContactAlreadyExists("The email has already been taken");
    
    const updatedUser = { ...existingUser, ...user };
    
    return await userRepository.updateUserRepository(uid, updatedUser);
}

const deleteUserService = async (uid) => {
    const user = await userRepository.getUserByIdRepository(uid);

    if (!user) throw new EntityNotFound("User not found");
    if (user.role === 'ADMIN') throw new CantDeleteEntity("Admin users cannot be deleted");

    return await userRepository.deleteUserRepository(uid);
}

export {
    getUsersService,
    getUserByIdService,
    getUserByEmailService,
    createUserService,
    updateUserService,
    deleteUserService
}