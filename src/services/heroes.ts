import * as repo from '../repositories/heroes'
import { IHeroRequest } from '../interfaces/hero';
import { Hero } from '../entities/hero';
import * as joi from "joi"

export const getAll = async () => {
    return repo.getAll();
}

export const addHero = async (heroRequest: IHeroRequest) => {
    await joi.validate(heroRequest, {
        name: joi.string().required()
    });

    let hero = new Hero();
    hero.name = heroRequest.name;
    return repo.save(hero);
}

export const updateHero = async (hero: Hero) => {
    await joi.validate(hero, {
        id: joi.number().required(),
        name: joi.string().required()
    });

    return repo.update(hero);
}

export const removeHero = async (id: number) => {
    await joi.validate({id}, {
        id: joi.number().required()
    })

    return repo.remove(id);
}