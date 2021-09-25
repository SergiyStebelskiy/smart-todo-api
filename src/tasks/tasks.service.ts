import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { Task } from './entities/task.entity'

@Injectable()
export class TasksService {
	constructor(
		@InjectModel(Task)
		private taskModel: typeof Task
	) {}
	create(_createTaskDto: CreateTaskDto, owner_id: string) {
		return this.taskModel.create({ ..._createTaskDto, owner_id })
	}

	async findAll(userId: number): Promise<Task[]> {
		return this.taskModel.findAll({
			where: {
				owner_id: userId
			}
		})
	}

	async findOne(id: number, userId: number) {
		const task = await this.taskModel.findOne({
			where: {
				id,
				owner_id: userId
			}
		})
		if (task) return task
		throw new NotFoundException()
	}

	async update(id: number, updateTaskDto: UpdateTaskDto, userId: number) {
		await this.taskModel.update(updateTaskDto, {
			where: { id, owner_id: userId }
		})
		const task = await this.findOne(id, userId)
		return task
	}

	async delete(id: number, userId: number) {
		const task = await this.findOne(id, userId)
		if (task instanceof NotFoundException) return task
		return await task.destroy()
	}
}
