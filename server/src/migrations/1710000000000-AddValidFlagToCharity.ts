import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddValidFlagToCharity1710000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE charity
      ADD COLUMN valid_flag BOOLEAN NOT NULL DEFAULT TRUE
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE charity
      DROP COLUMN valid_flag
    `);
  }
}
