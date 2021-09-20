import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TasksModule } from './tasks/tasks.module'
import { Task } from './tasks/entities/task.entity'
import { User } from './users/entities/user.entity'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [
		SequelizeModule.forRoot({
			dialect: 'postgres',
			host: 'localhost',
			port: 5432,
			username: 'admin',
			password: 'admin',
			database: 'smart_todo',
			models: [Task, User],
			define: {
				timestamps: false
			}
		}),
		TasksModule,
		UsersModule,
		AuthModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
