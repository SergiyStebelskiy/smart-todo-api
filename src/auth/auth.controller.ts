import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common'
import { LocalAuthGuard } from './local-auth.guard'
import { AuthService } from './auth.service'
import { CreateUserDto } from 'src/users/dto/create-user.dto'

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@UseGuards(LocalAuthGuard)
	@Post('login')
	async login(@Request() req) {
		return this.authService.login(req.user)
	}

	@UseGuards(LocalAuthGuard)
	@Post('registration')
	async registrate(@Body() createUserDto: CreateUserDto) {
		return this.authService.registrate(createUserDto)
	}
}
