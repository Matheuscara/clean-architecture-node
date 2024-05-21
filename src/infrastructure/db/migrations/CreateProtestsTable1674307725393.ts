import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProtestsTable1674307725393 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'protests',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'amount',
                        type: 'int',
                        isNullable: false
                    },
                    {
                        name: 'registrationDate',
                        type: 'date',
                        isNullable: true
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        length: '100',
                        isNullable: false
                    },
                    {
                        name: 'userId',
                        type: 'varchar',
                        length: '100',
                        isNullable: false
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('protests');
    }

}
