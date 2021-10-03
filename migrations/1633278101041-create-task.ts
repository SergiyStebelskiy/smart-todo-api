import { MigrationInterface, QueryRunner } from 'typeorm'

export class createTask1633278101041 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			'CREATE TABLE tasks(id SERIAL NOT NULL, name varchar NOT NULL, description varchar NOT NULL, checked boolean NOT NULL DEFAULT false, priority varchar NOT NULL, owner_id int NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"));'
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('tasks')
	}
}
