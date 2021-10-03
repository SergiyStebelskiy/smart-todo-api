import {
	Injectable,
	NotFoundException,
	BadRequestException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { Task } from './entities/task.entity'

@Injectable()
export class TasksService {
	constructor(
		@InjectRepository(Task)
		private tasksRepository: Repository<Task>
	) {}
	async create(_createTaskDto: CreateTaskDto, owner_id: string) {
		const newTask = await this.tasksRepository
			.createQueryBuilder()
			.insert()
			.into(Task)
			.values({ ..._createTaskDto, owner_id })
			.execute()

		if (newTask.identifiers?.[0]?.id) {
			return { ..._createTaskDto, ...newTask.raw?.[0], owner_id }
		} else {
			throw new BadRequestException()
		}
	}

	async findAll(userId: number): Promise<Task[]> {
		return await this.tasksRepository
			.createQueryBuilder('task')
			.where('task.owner_id = :id', { id: userId })
			.getMany()
	}

	async findOne(id: number, userId: number) {
		const task = await this.tasksRepository
			.createQueryBuilder('task')
			.where('task.owner_id = :owner_id', { owner_id: userId })
			.where('task.id = :id', { id })
			.getOne()
		if (task) return task
		throw new NotFoundException()
	}

	async update(id: number, updateTaskDto: UpdateTaskDto, userId: number) {
		const result = await this.tasksRepository
			.createQueryBuilder()
			.update(Task)
			.set(updateTaskDto)
			.where('task.owner_id = :owner_id', { owner_id: userId })
			.where('id = :id', { id })
			.execute()
		if (result.affected) {
			return this.findOne(id, userId)
		} else {
			throw new NotFoundException()
		}
	}

	async delete(id: number, userId: number) {
		const task = await this.findOne(id, userId)
		if (task instanceof NotFoundException) return task
		const result = await this.tasksRepository
			.createQueryBuilder('task')
			.delete()
			.from(Task)
			.where('id = :id', { id })
			.execute()
		if (result?.affected) {
			return { message: 'task successfully deleted' }
		}
	}
}
