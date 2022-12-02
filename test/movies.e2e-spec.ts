import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';

describe('MovieController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll((done) => {
    app.close();
    done();
  });

  it('should return a list of movies', () => {
    return request(app.getHttpServer())
      .get('/movies?take=10&skip=0')
      .expect(200)
      .then((response) => {
        expect(response.body.data).toBeInstanceOf(Array);
        expect(response.body.page_count).toBe(10);
        expect(response.body.count).toBe(60);
      });
  });
});
