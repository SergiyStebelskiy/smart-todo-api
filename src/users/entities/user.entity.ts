import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn
} from 'typeorm'

@Entity('users')
export class User {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	first_name: string

	@Column()
	last_name: string

	@Column()
	email: string

	@Column({ default: '' })
	password: string

	@CreateDateColumn()
	created_at: Date

	@UpdateDateColumn()
	updated_at: Date
}
