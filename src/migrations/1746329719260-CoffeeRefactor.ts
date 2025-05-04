import { MigrationInterface, QueryRunner } from 'typeorm';

export class CoffeeRefactor1746329719260 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "coffe" RENAME COLUMN "name" TO "title"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "coffe" RENAME COLUMN "title" TO "name"`,
    );
  }
}
