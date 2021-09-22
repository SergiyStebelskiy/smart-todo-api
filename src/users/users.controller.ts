import { Controller, Get, Param, Delete, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}
	@UseGuards(JwtAuthGuard)
	@Get()
	findAll() {
		return this.usersService.findAll()
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.usersService.findOneById(+id)
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	delete(@Param('id') id: string) {
		return this.usersService.delete(+id)
	}
}
