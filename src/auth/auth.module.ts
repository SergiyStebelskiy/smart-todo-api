import { UsersService } from './../users/users.service'
import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UsersModule } from '../users/users.module'
import { PassportModule } from '@nestjs/passport'
import { LocalStrategy } from './strategies/local.strategy'
import { JwtStrategy } from './strategies/jwt.strategy'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './constants'
import { UsersController } from 'src/users/users.controller'
import { User } from '../users/entities/user.entity'
import { SequelizeModule } from '@nestjs/sequelize'

@Module({
	imports: [
		UsersModule,
		PassportModule,
		JwtModule.register({
			secret: jwtConstants.secret,
			signOptions: { expiresIn: '60s' }
		}),
		SequelizeModule.forFeature([User])
	],
	providers: [AuthService, UsersService, LocalStrategy, JwtStrategy],
	controllers: [AuthController, UsersController],
	exports: [AuthService]
})
export class AuthModule {}
