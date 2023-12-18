import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCreatedAndDeletedBy1702910085652 implements MigrationInterface {
  name = 'AddCreatedAndDeletedBy1702910085652';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "config"."addresses" ADD "created_by" bigint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."addresses" ADD "deleted_by" bigint`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."tenants" ADD "created_by" bigint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."tenants" ADD "deleted_by" bigint`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."tenant_services" ADD "created_by" bigint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."tenant_services" ADD "deleted_by" bigint`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."categories" ADD "created_by" bigint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."categories" ADD "deleted_by" bigint`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."plans" ADD "created_by" bigint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."plans" ADD "deleted_by" bigint`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."roles" ADD "created_by" bigint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."roles" ADD "deleted_by" bigint`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."users" ADD "created_by" bigint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."users" ADD "deleted_by" bigint`,
    );
    await queryRunner.query(
      `ALTER TABLE "app"."schedule_services" ADD "created_by" bigint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "app"."schedule_services" ADD "deleted_by" bigint`,
    );
    await queryRunner.query(
      `ALTER TABLE "app"."schedules" ADD "created_by" bigint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "app"."schedules" ADD "deleted_by" bigint`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "app"."schedules" DROP COLUMN "deleted_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "app"."schedules" DROP COLUMN "created_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "app"."schedule_services" DROP COLUMN "deleted_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "app"."schedule_services" DROP COLUMN "created_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."users" DROP COLUMN "deleted_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."users" DROP COLUMN "created_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."roles" DROP COLUMN "deleted_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."roles" DROP COLUMN "created_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."plans" DROP COLUMN "deleted_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."plans" DROP COLUMN "created_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."categories" DROP COLUMN "deleted_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."categories" DROP COLUMN "created_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."tenant_services" DROP COLUMN "deleted_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."tenant_services" DROP COLUMN "created_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."tenants" DROP COLUMN "deleted_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."tenants" DROP COLUMN "created_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."addresses" DROP COLUMN "deleted_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."addresses" DROP COLUMN "created_by"`,
    );
  }
}
