import * as jwt from "jsonwebtoken";
import * as Boom from 'boom';
import * as compose from 'koa-compose';
import { Context } from "koa";
import * as joi from "joi";
import * as userRepo from "../repositories/users";
import { IUserRequest } from "../interfaces/user";

const handler = async (context: Context, next: () => void) => {
    if(context.path.includes("/users/")){
        await next();
        return;
    }

    const token: string = context.request.headers['authorization'];
    if(token == undefined || token == null){
        throw Boom.notFound('Authorization token not provided');
    }

    const id: number = +(jwt.verify(token, process.env.TOKEN_SECRET_KEY!));
    if(id == NaN){
        throw Boom.notFound('Invalid token');
    }

    /* await joi.validate({email}, {
        email: joi.string().email().required()
    });

    const userRequest: IUserRequest = {
        email: email,
        password: ""
    } */
    context.state.uid = id;
    await next();
};

export default () => compose([handler]);