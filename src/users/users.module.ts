import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { User } from './entities/user.entity'
import { SequelizeModule } from '@nestjs/sequelize'

@Module({
	imports: [SequelizeModule.forFeature([User])],
	providers: [UsersService],
	controllers: [UsersController],
	exports: [UsersService]
})
export class UsersModule {}
