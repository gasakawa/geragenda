import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTenantAvatarUrl1703693339740 implements MigrationInterface {
  name = 'AddTenantAvatarUrl1703693339740';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "config"."tenants" ADD "avatar_url" text`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "config"."tenants" DROP COLUMN "avatar_url"`,
    );
  }
}
