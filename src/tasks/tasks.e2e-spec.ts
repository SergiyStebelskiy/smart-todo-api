import { AppModule } from './../app.module'
import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'

describe('TasksController', () => {
	let app
	const user = {
		first_name: 'test user',
		last_name: 'test user',
		email: 'test.user@gmail.com',
		password: 'testuser123'
	}
	const task = {
		name: 'test task',
		description: 'test description',
		checked: false,
		priority: 'hight'
	}
	let accessToken = null
	let createdUserId = null
	let createdTaskId = null
	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule]
		}).compile()

		app = moduleFixture.createNestApplication()
		await app.init()
	})

	describe('tasks', () => {
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
		it('invalid create task', () => {
			return request(app.getHttpServer())
				.post(`/tasks`)
				.set('Authorization', `Bearer ${accessToken}`)
				.set('Accept', 'application/json')
				.expect('Content-Type', 'application/json; charset=utf-8')
				.expect(400)
		})
		it('success create task', () => {
			return request(app.getHttpServer())
				.post(`/tasks`)
				.send({ ...task })
				.set('Authorization', `Bearer ${accessToken}`)
				.set('Accept', 'application/json')
				.expect('Content-Type', 'application/json; charset=utf-8')
				.expect(201)
				.then(response => {
					createdTaskId = response.body.id
				})
		})
		it('success find a task by id', () => {
			return request(app.getHttpServer())
				.get(`/tasks/${createdTaskId}`)
				.set('Authorization', `Bearer ${accessToken}`)
				.set('Accept', 'application/json')
				.expect('Content-Type', 'application/json; charset=utf-8')
				.expect(200)
		})
		it('wrong find a task by id', () => {
			return request(app.getHttpServer())
				.get(`/tasks/0`)
				.set('Authorization', `Bearer ${accessToken}`)
				.set('Accept', 'application/json')
				.expect('Content-Type', 'application/json; charset=utf-8')
				.expect(404)
		})
		it('no auth find a task by id', () => {
			return request(app.getHttpServer())
				.get(`/tasks/${createdTaskId}`)
				.set('Accept', 'application/json')
				.expect('Content-Type', 'application/json; charset=utf-8')
				.expect(401)
		})
		it('success edit a task', () => {
			return request(app.getHttpServer())
				.put(`/tasks/${createdTaskId}`)
				.send({ ...task })
				.set('Authorization', `Bearer ${accessToken}`)
				.set('Accept', 'application/json')
				.expect('Content-Type', 'application/json; charset=utf-8')
				.expect(200)
		})
		it('no auth delete task', () => {
			return request(app.getHttpServer())
				.delete(`/users/${createdUserId}`)
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
