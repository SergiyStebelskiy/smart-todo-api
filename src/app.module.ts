import { Module, ValidationPipe } from '@nestjs/common'
import { APP_PIPE } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TasksModule } from './tasks/tasks.module'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { Task } from './tasks/entities/task.entity'
import { User } from './users/entities/user.entity'
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useFactory: async (): Promise<any> => {
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
				return {
					type: 'postgres',
					host: process.env.HOST,
					port: process.env.PORT,
					username: process.env.USERNAME,
					password: process.env.PASSWORD,
					database: process.env.DATABASE,
					entities: ['dist/**/*.entity{.ts,.js}'],
					migrationsTableName: 'migrations',
					migrations: ['dist/migrations/*.js'],
					cli: {
						migrationsDir: 'migrations'
					}
				}
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
