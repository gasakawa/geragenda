import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveFkAuthorsFromUsers1702911244175
  implements MigrationInterface
{
  name = 'RemoveFkAuthorsFromUsers1702911244175';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "config"."users" DROP CONSTRAINT "FK_1bbd34899b8e74ef2a7f3212806"`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."users" DROP CONSTRAINT "FK_4241f21b9bb35e82a6217af1aad"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "config"."users" ADD CONSTRAINT "FK_4241f21b9bb35e82a6217af1aad" FOREIGN KEY ("deleted_by_id") REFERENCES "config"."users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "config"."users" ADD CONSTRAINT "FK_1bbd34899b8e74ef2a7f3212806" FOREIGN KEY ("created_by_id") REFERENCES "config"."users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
  }
}
