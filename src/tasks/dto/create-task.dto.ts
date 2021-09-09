import { IsNotEmpty, IsString, IsBoolean } from 'class-validator'
import { OneOf } from 'decorators'

export class CreateTaskDto {
	@IsNotEmpty()
	@IsString()
	name: string

	@IsString()
	description: string

	@IsBoolean()
	checked: boolean

	@IsNotEmpty()
	@IsString()
	@OneOf(['low', 'normal', 'hight'])
	priority: string
}
