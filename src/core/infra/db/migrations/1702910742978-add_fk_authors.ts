import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFkAuthors1702910742978 implements MigrationInterface {
  name = 'AddFkAuthors1702910742978';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "config"."roles" ADD "created_by_id" bigint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."roles" ADD "deleted_by_id" bigint`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."users" ADD "created_by_id" bigint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."users" ADD "deleted_by_id" bigint`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."tenants" ADD "created_by_id" bigint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."tenants" ADD "deleted_by_id" bigint`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."addresses" ADD "created_by_id" bigint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."addresses" ADD "deleted_by_id" bigint`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."tenant_services" ADD "created_by_id" bigint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."tenant_services" ADD "deleted_by_id" bigint`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."categories" ADD "created_by_id" bigint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."categories" ADD "deleted_by_id" bigint`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."plans" ADD "created_by_id" bigint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."plans" ADD "deleted_by_id" bigint`,
    );
    await queryRunner.query(
      `ALTER TABLE "app"."schedule_services" ADD "created_by_id" bigint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "app"."schedule_services" ADD "deleted_by_id" bigint`,
    );
    await queryRunner.query(
      `ALTER TABLE "app"."schedules" ADD "created_by_id" bigint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "app"."schedules" ADD "deleted_by_id" bigint`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."roles" ADD CONSTRAINT "FK_4a4bff0f02e88cbdf770241ca8f" FOREIGN KEY ("created_by_id") REFERENCES "config"."users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."roles" ADD CONSTRAINT "FK_7aab1939c84759090de748731a9" FOREIGN KEY ("deleted_by_id") REFERENCES "config"."users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."users" ADD CONSTRAINT "FK_1bbd34899b8e74ef2a7f3212806" FOREIGN KEY ("created_by_id") REFERENCES "config"."users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."users" ADD CONSTRAINT "FK_4241f21b9bb35e82a6217af1aad" FOREIGN KEY ("deleted_by_id") REFERENCES "config"."users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."tenants" ADD CONSTRAINT "FK_3837ba993bd12d7398efc34cd95" FOREIGN KEY ("created_by_id") REFERENCES "config"."users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."tenants" ADD CONSTRAINT "FK_a79673b45b0d70d80759c7bd017" FOREIGN KEY ("deleted_by_id") REFERENCES "config"."users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."addresses" ADD CONSTRAINT "FK_73af1faf278b68eb9208f5d74cf" FOREIGN KEY ("created_by_id") REFERENCES "config"."users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."addresses" ADD CONSTRAINT "FK_813aa341716165d8eabf511ab17" FOREIGN KEY ("deleted_by_id") REFERENCES "config"."users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."tenant_services" ADD CONSTRAINT "FK_f63de893f41bc04b9070d1339a6" FOREIGN KEY ("created_by_id") REFERENCES "config"."users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."tenant_services" ADD CONSTRAINT "FK_2cbf9a30d435ba14b4fd74f3551" FOREIGN KEY ("deleted_by_id") REFERENCES "config"."users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."categories" ADD CONSTRAINT "FK_acec5b500772f0e638240f70874" FOREIGN KEY ("created_by_id") REFERENCES "config"."users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."categories" ADD CONSTRAINT "FK_c72b9144263204d24317eee497a" FOREIGN KEY ("deleted_by_id") REFERENCES "config"."users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."plans" ADD CONSTRAINT "FK_fec31105252dbfca71d5ba6e1e9" FOREIGN KEY ("created_by_id") REFERENCES "config"."users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."plans" ADD CONSTRAINT "FK_b36980fc3d7b1312569a7623eca" FOREIGN KEY ("deleted_by_id") REFERENCES "config"."users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "app"."schedule_services" ADD CONSTRAINT "FK_ba8522aa722f6dde9c214ec9af7" FOREIGN KEY ("created_by_id") REFERENCES "config"."users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "app"."schedule_services" ADD CONSTRAINT "FK_44b8c2ce74c389174711b41bc10" FOREIGN KEY ("deleted_by_id") REFERENCES "config"."users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "app"."schedules" ADD CONSTRAINT "FK_6647267c771f30b59439a4dd763" FOREIGN KEY ("created_by_id") REFERENCES "config"."users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "app"."schedules" ADD CONSTRAINT "FK_935aaa997bd89f7b64c6613e1ad" FOREIGN KEY ("deleted_by_id") REFERENCES "config"."users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "app"."schedules" DROP CONSTRAINT "FK_935aaa997bd89f7b64c6613e1ad"`,
    );
    await queryRunner.query(
      `ALTER TABLE "app"."schedules" DROP CONSTRAINT "FK_6647267c771f30b59439a4dd763"`,
    );
    await queryRunner.query(
      `ALTER TABLE "app"."schedule_services" DROP CONSTRAINT "FK_44b8c2ce74c389174711b41bc10"`,
    );
    await queryRunner.query(
      `ALTER TABLE "app"."schedule_services" DROP CONSTRAINT "FK_ba8522aa722f6dde9c214ec9af7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."plans" DROP CONSTRAINT "FK_b36980fc3d7b1312569a7623eca"`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."plans" DROP CONSTRAINT "FK_fec31105252dbfca71d5ba6e1e9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."categories" DROP CONSTRAINT "FK_c72b9144263204d24317eee497a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."categories" DROP CONSTRAINT "FK_acec5b500772f0e638240f70874"`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."tenant_services" DROP CONSTRAINT "FK_2cbf9a30d435ba14b4fd74f3551"`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."tenant_services" DROP CONSTRAINT "FK_f63de893f41bc04b9070d1339a6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."addresses" DROP CONSTRAINT "FK_813aa341716165d8eabf511ab17"`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."addresses" DROP CONSTRAINT "FK_73af1faf278b68eb9208f5d74cf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."tenants" DROP CONSTRAINT "FK_a79673b45b0d70d80759c7bd017"`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."tenants" DROP CONSTRAINT "FK_3837ba993bd12d7398efc34cd95"`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."users" DROP CONSTRAINT "FK_4241f21b9bb35e82a6217af1aad"`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."users" DROP CONSTRAINT "FK_1bbd34899b8e74ef2a7f3212806"`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."roles" DROP CONSTRAINT "FK_7aab1939c84759090de748731a9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."roles" DROP CONSTRAINT "FK_4a4bff0f02e88cbdf770241ca8f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "app"."schedules" DROP COLUMN "deleted_by_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "app"."schedules" DROP COLUMN "created_by_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "app"."schedule_services" DROP COLUMN "deleted_by_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "app"."schedule_services" DROP COLUMN "created_by_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."plans" DROP COLUMN "deleted_by_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."plans" DROP COLUMN "created_by_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."categories" DROP COLUMN "deleted_by_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."categories" DROP COLUMN "created_by_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."tenant_services" DROP COLUMN "deleted_by_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."tenant_services" DROP COLUMN "created_by_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."addresses" DROP COLUMN "deleted_by_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."addresses" DROP COLUMN "created_by_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."tenants" DROP COLUMN "deleted_by_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."tenants" DROP COLUMN "created_by_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."users" DROP COLUMN "deleted_by_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."users" DROP COLUMN "created_by_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."roles" DROP COLUMN "deleted_by_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."roles" DROP COLUMN "created_by_id"`,
    );
  }
}
