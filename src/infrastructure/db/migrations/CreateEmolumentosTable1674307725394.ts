import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateEmolumentosTable1674307725394 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'emoluments',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'value',
                        type: 'numeric',
                        isNullable: false
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        length: '255',
                        isNullable: false
                    },
                    {
                        name: 'protestId',
                        type: 'int',
                        isNullable: false
                    }
                ]
            })
        );

        await queryRunner.createForeignKey(
            'emoluments',
            new TableForeignKey({
                columnNames: ['protestId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'protests',
                onDelete: 'CASCADE'
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('emu');
    }

}
