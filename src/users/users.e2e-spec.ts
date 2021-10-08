import { AppModule } from './../app.module'
import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'

describe('UsersController', () => {
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

	describe('Users', () => {
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
		it('success find a user by id', () => {
			return request(app.getHttpServer())
				.get(`/users/${createdUserId}`)
				.set('Authorization', `Bearer ${accessToken}`)
				.set('Accept', 'application/json')
				.expect('Content-Type', 'application/json; charset=utf-8')
				.expect(200)
		})
		it('wrong find a user by id', () => {
			return request(app.getHttpServer())
				.get(`/users/0`)
				.set('Authorization', `Bearer ${accessToken}`)
				.set('Accept', 'application/json')
				.expect('Content-Type', 'application/json; charset=utf-8')
				.expect(404)
		})
		it('no auth find a user by id', () => {
			return request(app.getHttpServer())
				.get(`/users/${createdUserId}`)
				.set('Accept', 'application/json')
				.expect('Content-Type', 'application/json; charset=utf-8')
				.expect(401)
		})
		it('no auth delete user', () => {
			return request(app.getHttpServer())
				.delete(`/users/0`)
				.set('Accept', 'application/json')
				.expect('Content-Type', 'application/json; charset=utf-8')
				.expect(401)
		})
		it('wrong delete user', () => {
			return request(app.getHttpServer())
				.delete(`/users/0`)
				.set('Authorization', `Bearer ${accessToken}`)
				.set('Accept', 'application/json')
				.expect('Content-Type', 'application/json; charset=utf-8')
				.expect(404)
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
