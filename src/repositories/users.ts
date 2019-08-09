import { getRepository } from "typeorm";
import { User } from "../entities/user";
import { IUserRequest } from "../interfaces/user";

export const save = async (user: User) => {
    await getRepository(User).save(user);
    return {
        success: true
    };
}

export const find = async (userRequest: IUserRequest) => {
    return getRepository(User).findOne({
        where: {
            isActive: true,
            email: userRequest.email
        }
    });
}

export const findById = async (id: number) => {
    return getRepository(User).findOne({
        where: {
            isActive: true,
            id: id
        }
    });
}