import { InjectModel } from '@nestjs/sequelize'
import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { User } from '../users/entities/user.entity'

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
		@InjectModel(User)
		private userModel: typeof User
	) {}

	async validateUser(email: string, password: string): Promise<any> {
		const user = await this.usersService.findOneByEmail(email)
		const isMatch = await bcrypt.compare(password, user.password)
		if (user && isMatch) {
			const { password, ...result } = user
			return result
		}
		return null
	}

	async login(user: any) {
		const payload = { email: user.email, sub: user.userId }
		return {
			access_token: this.jwtService.sign(payload)
		}
	}

	async registrate(_createUserDto: CreateUserDto) {
		const password = await bcrypt.hash(_createUserDto.password, 10)
		return this.userModel.create({ ..._createUserDto, password })
	}
}
