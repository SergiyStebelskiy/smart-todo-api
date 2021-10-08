import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'

describe('AppController', () => {
	let app

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule]
		}).compile()

		app = moduleFixture.createNestApplication()
		await app.init()
	})

	it('/ (GET)', () => {
		return request(app.getHttpServer()).get('/').expect(404).expect({
			statusCode: 404,
			message: 'Cannot GET /',
			error: 'Not Found'
		})
	})
})
