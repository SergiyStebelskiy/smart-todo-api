import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User)
		private userModel: typeof User
	) {}
	create(_createUserDto: CreateUserDto) {
		return this.userModel.create(_createUserDto)
	}

	async findAll(): Promise<User[]> {
		return this.userModel.findAll()
	}

	async findOne(id: number) {
		const user = await this.userModel.findOne({
			where: {
				id
			}
		})
		if (user) return user
		throw new NotFoundException()
	}
}
