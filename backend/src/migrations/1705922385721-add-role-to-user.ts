import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRoleToUser1705922385721 implements MigrationInterface {
    name = 'AddRoleToUser1705922385721';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."app_user_role_enum" AS ENUM('CLIENT', 'ADMIN')`);
        await queryRunner.query(
            `ALTER TABLE "app_user" ADD "role" "public"."app_user_role_enum" NOT NULL DEFAULT 'CLIENT'`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_user" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."app_user_role_enum"`);
    }
}
