import { MigrationInterface, QueryRunner } from 'typeorm';

export class CrudAuthorFunction1702909816939 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`    
        CREATE OR REPLACE FUNCTION app.crud_authors()
        RETURNS trigger
        LANGUAGE plpgsql
        STABLE COST 1
        AS $function$
            BEGIN
                IF (TG_OP = 'INSERT') THEN
                    NEW.deleted_by_id = NULL;
                ELSEIF (TG_OP = 'UPDATE') THEN
                    -- do not allow users to change the created author
                    IF (NEW.created_by_id <> OLD.created_by_id) THEN
                        NEW.created_by_id = OLD.created_by_id;
                    END IF;
                    -- do not allow users to change the deleted author
                    IF (OLD.deleted_by_id IS NOT NULL AND NEW.deleted_by_id IS NOT NULL AND NEW.deleted_by_id <> OLD.deleted_by_id) THEN
                        NEW.deleted_by_id = OLD.deleted_by_id;
                    END IF;
                END IF;
                RETURN NEW;
            END;
        $function$;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP FUNCTION app.crud_authors();
    `);
  }
}
