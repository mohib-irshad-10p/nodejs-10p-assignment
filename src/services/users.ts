import * as repo from '../repositories/users'
import { User } from '../entities/user';
import * as joi from "joi"
import * as crypto from "crypto"
import { IUserRequest } from '../interfaces/user';
import * as jwt from "jsonwebtoken";

export const addUser = async (user: User) => {
    await joi.validate(user, {
        id: joi.forbidden(),
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required(),
        salt: joi.forbidden(),
        isActive: joi.forbidden()
    });

    user.salt = crypto.randomBytes(16).toString('hex');
    user.password = crypto.pbkdf2Sync(user.password, user.salt, 1000, 64, `sha512`).toString(`hex`); 

    return repo.save(user);
}

export const authenticateUser = async (userRequest: IUserRequest) => {
    await joi.validate(userRequest, {
        email: joi.string().email().required(),
        password: joi.string().required()
    });

    const user = await repo.find(userRequest);
    
    if(user == undefined)
        return {success: false};

    const password = crypto.pbkdf2Sync(userRequest.password, user.salt, 1000, 64, `sha512`).toString(`hex`); 

    if(user.password != password)
        return {success: false};
    
    const secretKey = process.env.TOKEN_SECRET_KEY;
    
    if(secretKey == undefined)
        return {server: "failed"};

    const token = jwt.sign(user.id + "", secretKey);
    return {success: true,
            token: token};
}