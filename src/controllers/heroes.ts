import * as service from '../services/heroes'
import { Context } from 'koa';
import { IHeroRequest } from '../interfaces/hero';
import { Hero } from '../entities/hero';

export const getAll = async (context: Context, next: () => void) => {
    const userid = context.state.uid;
    context.state.data = await service.getAll();
    await next();
};


export const save = async (context: Context, next: () => void) => {
    const payload: IHeroRequest = context.request.body;
    context.state.data = await service.addHero(payload);
    await next();
};

export const update = async (context: Context, next: () => void) => {
    const hero: Hero = context.request.body;
    hero.id = context.params.id;
    context.state.data = await service.updateHero(hero);
    await next();
};

export const remove = async (context: Context, next: () => void) => {
    const id: number = context.params.id;
    context.state.data = await service.removeHero(id);
    await next();
};