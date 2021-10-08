import { Module, ValidationPipe } from '@nestjs/common'
import { APP_PIPE } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TasksModule } from './tasks/tasks.module'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { Task } from './tasks/entities/task.entity'
import { User } from './users/entities/user.entity'

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useFactory: async () => {
				if (process.env.APP_ENV === 'test') {
					return {
						type: 'postgres',
						host: 'localhost',
						port: 5432,
						username: 'admin',
						password: 'admin',
						database: 'smart-todo-tests',
						entities: [Task, User],
						synchronize: true,
						keepConnectionAlive: true
					}
				}
				return {}
			}
		}),
		TasksModule,
		UsersModule,
		AuthModule
	],
	providers: [
		{
			provide: APP_PIPE,
			useClass: ValidationPipe
		}
	]
})
export class AppModule {}
