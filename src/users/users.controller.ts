import { Controller, Get, Param, Delete } from '@nestjs/common'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}
	@Get()
	findAll() {
		return this.usersService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.usersService.findOneById(+id)
	}

	@Delete(':id')
	delete(@Param('id') id: string) {
		return this.usersService.delete(+id)
	}
}
