import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSubToUser1702923024727 implements MigrationInterface {
  name = 'AddSubToUser1702923024727';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "config"."users" ADD "is_confirmed" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(`ALTER TABLE "config"."users" ADD "sub" text`);
    await queryRunner.query(
      `ALTER TABLE "config"."users" ALTER COLUMN "is_active" SET DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "config"."users" ALTER COLUMN "is_active" SET DEFAULT true`,
    );
    await queryRunner.query(`ALTER TABLE "config"."users" DROP COLUMN "sub"`);
    await queryRunner.query(
      `ALTER TABLE "config"."users" DROP COLUMN "is_confirmed"`,
    );
  }
}
