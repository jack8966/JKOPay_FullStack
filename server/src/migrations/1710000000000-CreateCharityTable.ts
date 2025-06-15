import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCharityTable1710000000000 implements MigrationInterface {
  name = 'CreateCharityTable1710000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "charity" (
                "id" SERIAL NOT NULL,
                "name" character varying(100) NOT NULL,
                "description" character varying(1000) NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_charity_name" UNIQUE ("name"),
                CONSTRAINT "PK_charity" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "charity"`);
  }
}
