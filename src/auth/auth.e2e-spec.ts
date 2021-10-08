import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import { AppModule } from '../app.module'

describe('AuthController', () => {
	let app
	const user = {
		first_name: 'test user',
		last_name: 'test user',
		email: 'test.user@gmail.com',
		password: 'testuser123'
	}
	let accessToken = null
	let createdUserId = null
	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule]
		}).compile()

		app = moduleFixture.createNestApplication()
		await app.init()
	})

	describe('Login', () => {
		it('success registration', () => {
			return request(app.getHttpServer())
				.post('/auth/registration')
				.send({
					first_name: user.first_name,
					last_name: user.last_name,
					email: user.email,
					password: user.password
				})
				.set('Accept', 'application/json')
				.expect('Content-Type', 'application/json; charset=utf-8')
				.expect(201)
				.then(response => {
					createdUserId = response.body.id
				})
		})
		it('forbidden registration', () => {
			return request(app.getHttpServer())
				.post('/auth/registration')
				.send({
					first_name: user.first_name,
					last_name: user.last_name,
					email: user.email,
					password: user.password
				})
				.set('Accept', 'application/json')
				.expect('Content-Type', 'application/json; charset=utf-8')
				.expect(403)
		})
		it('wrong registration', () => {
			return request(app.getHttpServer())
				.post('/auth/registration')
				.set('Accept', 'application/json')
				.expect('Content-Type', 'application/json; charset=utf-8')
				.expect(400)
		})
		it('success login', () => {
			return request(app.getHttpServer())
				.post('/auth/login')
				.send({ email: user.email, password: user.password })
				.set('Accept', 'application/json')
				.expect('Content-Type', 'application/json; charset=utf-8')
				.expect(201)
				.then(response => {
					accessToken = response.body.access_token
				})
		})
		it('invalid login', () => {
			return request(app.getHttpServer())
				.post('/auth/login')
				.set('Accept', 'application/json')
				.expect('Content-Type', 'application/json; charset=utf-8')
				.expect(404)
		})
		it('wrong login', () => {
			return request(app.getHttpServer())
				.post('/auth/login')
				.send({ email: user.email, password: 'wrongpass' })
				.set('Accept', 'application/json')
				.expect('Content-Type', 'application/json; charset=utf-8')
				.expect(400)
		})
		it('success delete user', () => {
			return request(app.getHttpServer())
				.delete(`/users/${createdUserId}`)
				.set('Authorization', `Bearer ${accessToken}`)
				.set('Accept', 'application/json')
				.expect('Content-Type', 'application/json; charset=utf-8')
				.expect(200)
		})
	})
})
