import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common'
import { LocalAuthGuard } from './local-auth.guard'
import { AuthService } from './auth.service'
import { CreateUserDto } from '../users/dto/create-user.dto'

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('login')
	async login(@Request() req) {
		return this.authService.login(req.body)
	}

	@Post('registration')
	async registrate(@Body() createUserDto: CreateUserDto) {
		return this.authService.registrate(createUserDto)
	}
}
