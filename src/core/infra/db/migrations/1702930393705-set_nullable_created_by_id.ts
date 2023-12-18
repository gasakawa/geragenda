import { MigrationInterface, QueryRunner } from 'typeorm';

export class SetNullableCreatedById1702930393705 implements MigrationInterface {
  name = 'SetNullableCreatedById1702930393705';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "config"."roles" DROP CONSTRAINT "FK_4a4bff0f02e88cbdf770241ca8f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."roles" ALTER COLUMN "created_by_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."users" ALTER COLUMN "created_by_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."tenants" DROP CONSTRAINT "FK_3837ba993bd12d7398efc34cd95"`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."tenants" ALTER COLUMN "created_by_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."addresses" DROP CONSTRAINT "FK_73af1faf278b68eb9208f5d74cf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."addresses" ALTER COLUMN "created_by_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."tenant_services" DROP CONSTRAINT "FK_f63de893f41bc04b9070d1339a6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."tenant_services" ALTER COLUMN "created_by_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."categories" DROP CONSTRAINT "FK_acec5b500772f0e638240f70874"`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."categories" ALTER COLUMN "created_by_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."plans" DROP CONSTRAINT "FK_fec31105252dbfca71d5ba6e1e9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."plans" ALTER COLUMN "created_by_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "app"."schedules" DROP CONSTRAINT "FK_6647267c771f30b59439a4dd763"`,
    );
    await queryRunner.query(
      `ALTER TABLE "app"."schedules" ALTER COLUMN "created_by_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "app"."schedule_services" DROP CONSTRAINT "FK_ba8522aa722f6dde9c214ec9af7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "app"."schedule_services" ALTER COLUMN "created_by_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."roles" ADD CONSTRAINT "FK_4a4bff0f02e88cbdf770241ca8f" FOREIGN KEY ("created_by_id") REFERENCES "config"."users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."tenants" ADD CONSTRAINT "FK_3837ba993bd12d7398efc34cd95" FOREIGN KEY ("created_by_id") REFERENCES "config"."users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."addresses" ADD CONSTRAINT "FK_73af1faf278b68eb9208f5d74cf" FOREIGN KEY ("created_by_id") REFERENCES "config"."users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."tenant_services" ADD CONSTRAINT "FK_f63de893f41bc04b9070d1339a6" FOREIGN KEY ("created_by_id") REFERENCES "config"."users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."categories" ADD CONSTRAINT "FK_acec5b500772f0e638240f70874" FOREIGN KEY ("created_by_id") REFERENCES "config"."users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."plans" ADD CONSTRAINT "FK_fec31105252dbfca71d5ba6e1e9" FOREIGN KEY ("created_by_id") REFERENCES "config"."users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "app"."schedules" ADD CONSTRAINT "FK_6647267c771f30b59439a4dd763" FOREIGN KEY ("created_by_id") REFERENCES "config"."users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "app"."schedule_services" ADD CONSTRAINT "FK_ba8522aa722f6dde9c214ec9af7" FOREIGN KEY ("created_by_id") REFERENCES "config"."users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "app"."schedule_services" DROP CONSTRAINT "FK_ba8522aa722f6dde9c214ec9af7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "app"."schedules" DROP CONSTRAINT "FK_6647267c771f30b59439a4dd763"`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."plans" DROP CONSTRAINT "FK_fec31105252dbfca71d5ba6e1e9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."categories" DROP CONSTRAINT "FK_acec5b500772f0e638240f70874"`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."tenant_services" DROP CONSTRAINT "FK_f63de893f41bc04b9070d1339a6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."addresses" DROP CONSTRAINT "FK_73af1faf278b68eb9208f5d74cf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."tenants" DROP CONSTRAINT "FK_3837ba993bd12d7398efc34cd95"`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."roles" DROP CONSTRAINT "FK_4a4bff0f02e88cbdf770241ca8f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "app"."schedule_services" ALTER COLUMN "created_by_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "app"."schedule_services" ADD CONSTRAINT "FK_ba8522aa722f6dde9c214ec9af7" FOREIGN KEY ("created_by_id") REFERENCES "config"."users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "app"."schedules" ALTER COLUMN "created_by_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "app"."schedules" ADD CONSTRAINT "FK_6647267c771f30b59439a4dd763" FOREIGN KEY ("created_by_id") REFERENCES "config"."users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."plans" ALTER COLUMN "created_by_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."plans" ADD CONSTRAINT "FK_fec31105252dbfca71d5ba6e1e9" FOREIGN KEY ("created_by_id") REFERENCES "config"."users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."categories" ALTER COLUMN "created_by_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."categories" ADD CONSTRAINT "FK_acec5b500772f0e638240f70874" FOREIGN KEY ("created_by_id") REFERENCES "config"."users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."tenant_services" ALTER COLUMN "created_by_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."tenant_services" ADD CONSTRAINT "FK_f63de893f41bc04b9070d1339a6" FOREIGN KEY ("created_by_id") REFERENCES "config"."users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."addresses" ALTER COLUMN "created_by_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."addresses" ADD CONSTRAINT "FK_73af1faf278b68eb9208f5d74cf" FOREIGN KEY ("created_by_id") REFERENCES "config"."users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."tenants" ALTER COLUMN "created_by_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."tenants" ADD CONSTRAINT "FK_3837ba993bd12d7398efc34cd95" FOREIGN KEY ("created_by_id") REFERENCES "config"."users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."users" ALTER COLUMN "created_by_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."roles" ALTER COLUMN "created_by_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."roles" ADD CONSTRAINT "FK_4a4bff0f02e88cbdf770241ca8f" FOREIGN KEY ("created_by_id") REFERENCES "config"."users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
  }
}
