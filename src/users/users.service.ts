import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private usersRepository: Repository<User>
	) {}

	async findAll(): Promise<User[]> {
		return await this.usersRepository.createQueryBuilder('user').getMany()
	}

	async findOneById(id: number) {
		const user = await this.usersRepository
			.createQueryBuilder('user')
			.where('user.id = :id', { id })
			.getOne()
		if (user) return user
		throw new NotFoundException()
	}

	async findOneByEmail(email: string) {
		const user = await this.usersRepository
			.createQueryBuilder('user')
			.where('user.email = :email', { email })
			.getOne()
		if (user) return user
		throw new NotFoundException()
	}

	async delete(id: number) {
		const user = await this.findOneById(id)
		if (user instanceof NotFoundException) return user
		const result = await this.usersRepository
			.createQueryBuilder('user')
			.delete()
			.from(User)
			.where('id = :id', { id })
			.execute()
		if (result?.affected) {
			return { message: 'user successfully deleted' }
		}
	}
}
