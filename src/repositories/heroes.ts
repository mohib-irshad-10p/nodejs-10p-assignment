import { getRepository } from "typeorm";
import { Hero } from "../entities/hero";

export const getAll = async () => {
    return getRepository(Hero).find({
        where: {
            isActive: true
        }
    });
}

export const save = async (hero: Hero) => {
    return getRepository(Hero).save(hero);
}

export const update = async (hero: Hero) => {
    return getRepository(Hero).update({
        id: hero.id
    }, hero);
}

export const remove = async (id: number) => {
    return getRepository(Hero).delete(id);
}