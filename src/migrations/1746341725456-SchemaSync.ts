import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaSync1746341725456 implements MigrationInterface {
    name = 'SchemaSync1746341725456'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffe" ADD "color" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffe" DROP COLUMN "color"`);
    }

}
