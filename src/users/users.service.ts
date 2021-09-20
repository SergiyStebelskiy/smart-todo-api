import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User)
		private userModel: typeof User
	) {}

	async findAll(): Promise<User[]> {
		return this.userModel.findAll()
	}

	async findOneById(id: number) {
		const user = await this.userModel.findOne({
			where: {
				id
			}
		})
		if (user) return user
		throw new NotFoundException()
	}

	async findOneByEmail(email: string) {
		const user = await this.userModel.findOne({
			where: {
				email
			}
		})
		if (user) return user
		throw new NotFoundException()
	}

	async delete(id: number) {
		const user = await this.findOneById(id)
		if (user instanceof NotFoundException) return user
		return await user.destroy()
	}
}
