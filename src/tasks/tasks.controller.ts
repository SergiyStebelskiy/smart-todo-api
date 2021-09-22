import {
	Controller,
	Get,
	Post,
	Body,
	Put,
	Param,
	Delete,
	UseGuards
} from '@nestjs/common'
import { TasksService } from './tasks.service'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('tasks')
export class TasksController {
	constructor(private readonly tasksService: TasksService) {}
	@UseGuards(JwtAuthGuard)
	@Post()
	create(@Body() createTaskDto: CreateTaskDto) {
		return this.tasksService.create(createTaskDto)
	}

	@UseGuards(JwtAuthGuard)
	@Get()
	findAll() {
		return this.tasksService.findAll()
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.tasksService.findOne(+id)
	}

	@UseGuards(JwtAuthGuard)
	@Put(':id')
	update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
		return this.tasksService.update(+id, updateTaskDto)
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	remove(@Param('id') id: number) {
		return this.tasksService.delete(+id)
	}
}
