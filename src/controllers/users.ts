import * as service from '../services/users'
import { Context } from 'koa';
import { User } from '../entities/user';
import { IUserRequest } from '../interfaces/user';

export const save = async (context: Context, next: () => void) => {
    const payload: User = context.request.body;
    context.state.data = await service.addUser(payload);
    await next();
};

export const authenticate = async (context: Context, next: () => void) => {
    const payload: IUserRequest = context.request.body;
    context.state.data = await service.authenticateUser(payload);
    await next();
};