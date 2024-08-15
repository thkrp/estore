import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDeleteAtColumn1705834228845 implements MigrationInterface {
    name = 'AddDeleteAtColumn1705834228845';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_user" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD "deleted_at" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "app_user" DROP COLUMN "deleted_at"`);
    }
}
