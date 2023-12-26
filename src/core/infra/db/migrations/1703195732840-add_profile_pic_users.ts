import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProfilePicUsers1703195732840 implements MigrationInterface {
  name = 'AddProfilePicUsers1703195732840';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "config"."users" ADD "profile_pic_url" text`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "config"."users" DROP COLUMN "profile_pic_url"`,
    );
  }
}
