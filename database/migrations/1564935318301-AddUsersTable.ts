import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class AddUsersTable1564935318301 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    isNullable: false
                },
                {
                    name: 'name',
                    type: 'character varying',
                    length: '255'
                },
                {
                    name: 'email',
                    type: 'character varying',
                    length: '255',
                    isUnique: true
                },
                {
                    name: 'password',
                    type: 'character varying',
                    length: '255'
                },
                {
                    name: 'salt',
                    type: 'character varying',
                    length: '255'
                },
                {
                    name: 'isActive',
                    type: 'boolean',
                    default: true
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        queryRunner.dropTable('users');
    }

}
