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
	create(_createTaskDto: CreateTaskDto) {
		return this.taskModel.create(_createTaskDto)
	}

	async findAll(): Promise<Task[]> {
		return this.taskModel.findAll()
	}

	async findOne(id: number) {
		const task = await this.taskModel.findOne({
			where: {
				id
			}
		})
		if (task) return task
		throw new NotFoundException()
	}

	async update(id: number, updateTaskDto: UpdateTaskDto) {
		await this.taskModel.update(updateTaskDto, { where: { id } })
		const task = await this.findOne(id)
		return task
	}

	async delete(id: number) {
		const task = await this.findOne(id)
		if (task instanceof NotFoundException) return task
		return await task.destroy()
	}
}
