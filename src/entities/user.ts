import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('users')
export class User {
    
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        type: 'character varying'
    })
    public name: string;

    @Column({
        type: 'character varying'
    })
    public email: string;
    
    @Column({
        type: 'character varying'
    })
    public password: string;
    
    @Column({
        type: 'character varying'
    })
    public salt: string;

    @Column({
        type: 'boolean'
    })
    public isActive: boolean;
}