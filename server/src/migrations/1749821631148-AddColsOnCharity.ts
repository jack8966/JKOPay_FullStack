import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddImageUrlColOnCharity1749821631148 implements MigrationInterface {
  name = 'AddImageUrlColOnCharity1749821631148';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'charity',
      new TableColumn({
        name: 'image_url',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('charity', 'image_url');
  }
}
