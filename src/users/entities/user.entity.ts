import {
	Column,
	Model,
	Table,
	DataType,
	AutoIncrement,
	PrimaryKey,
	IsEmail,
	AllowNull,
	CreatedAt,
	UpdatedAt,
	DeletedAt
} from 'sequelize-typescript'

@Table
export class User extends Model {
	@AutoIncrement
	@PrimaryKey
	@AllowNull(false)
	@Column(DataType.UUIDV4)
	id: string

	@AllowNull(false)
	@Column
	first_name: string

	@AllowNull(false)
	@Column
	last_name: string

	@AllowNull(false)
	@IsEmail
	@Column
	email: string

	@AllowNull(false)
	@Column
	password: string

	@CreatedAt
	@Column
	created_at: Date

	@UpdatedAt
	@Column
	updated_at: Date

	@DeletedAt
	@Column
	deleted_at: Date
}
