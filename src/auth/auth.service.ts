import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import {
	Injectable,
	BadRequestException,
	ForbiddenException
} from '@nestjs/common'
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
		@InjectRepository(User)
		private usersRepository: Repository<User>
	) {}

	async validateUser(email: string, password: string): Promise<any> {
		const user = await this.usersService.findOneByEmail(email)

		const isMatch = await bcrypt.compare(password, user.password)
		if (user && isMatch) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { password, ...result } = user
			return result
		}
		return null
	}

	async login(user: any) {
		const findedUser = await this.validateUser(user.email, user.password)

		if (findedUser) {
			return {
				access_token: this.jwtService.sign({
					email: findedUser.email,
					sub: findedUser.id
				})
			}
		} else {
			throw new BadRequestException()
		}
	}

	async registrate(_createUserDto: CreateUserDto) {
		const email = _createUserDto.email
		const existUser = await this.usersRepository
			.createQueryBuilder('user')
			.where('user.email = :email', { email })
			.getOne()

		if (!existUser) {
			const password = await bcrypt.hash(_createUserDto.password, 10)
			const newUser = await this.usersRepository
				.createQueryBuilder()
				.insert()
				.into(User)
				.values({ ..._createUserDto, password })
				.execute()
			if (newUser.identifiers?.[0]?.id) {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const { password, ...user } = _createUserDto
				return { ...user, ...newUser.raw?.[0] }
			} else {
				throw new BadRequestException()
			}
		} else {
			throw new ForbiddenException()
		}
	}
}
