import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCitextExtansion1704033833053 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "citext"; ');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP EXTENSION IF NOT EXISTS "citext"; ');
    }
}
