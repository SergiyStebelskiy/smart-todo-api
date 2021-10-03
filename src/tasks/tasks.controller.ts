import {
	Controller,
	Get,
	Post,
	Body,
	Put,
	Param,
	Delete,
	UseGuards,
	Request
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
	create(@Body() createTaskDto: CreateTaskDto, @Request() req) {
		const userId = req.user.id
		return this.tasksService.create(createTaskDto, userId)
	}

	@UseGuards(JwtAuthGuard)
	@Get()
	findAll(@Request() req) {
		const userId = req.user?.id || 1
		return this.tasksService.findAll(userId)
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	findOne(@Param('id') id: string, @Request() req) {
		const userId = req.user?.id || 2
		return this.tasksService.findOne(+id, userId)
	}

	@UseGuards(JwtAuthGuard)
	@Put(':id')
	update(
		@Param('id') id: string,
		@Body() updateTaskDto: UpdateTaskDto,
		@Request() req
	) {
		const userId = req.user.id
		return this.tasksService.update(+id, updateTaskDto, userId)
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	remove(@Param('id') id: number, @Request() req) {
		const userId = req.user.id
		return this.tasksService.delete(+id, userId)
	}
}
