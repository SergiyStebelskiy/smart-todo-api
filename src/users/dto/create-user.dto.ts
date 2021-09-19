import { IsNotEmpty, IsString, IsEmail } from 'class-validator'

export class CreateUserDto {
	@IsString()
	@IsNotEmpty()
	first_name: string

	@IsString()
	@IsNotEmpty()
	last_name: string

	@IsEmail()
	@IsNotEmpty()
	email: string

	@IsString()
	@IsNotEmpty()
	password: string
}
