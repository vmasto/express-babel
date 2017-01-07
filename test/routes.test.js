import request from 'supertest';
import app from '../src/app.js';

describe('GET /', () => {
  it('should render properly', async () => {
    await request(app).get('/').expect(200);
  });
});

describe('GET /list', () => {
  it('should render properly with valid parameters', async () => {
    await request(app)
      .get('/list')
      .query({ title: 'List title' })
      .expect(200);
  });

  it('should error without a valid parameter', async () => {
    await request(app).get('/list').expect(500);
  });
});

describe('GET /404', () => {
  it('should return 404 for non-existent URLs', async () => {
    await request(app).get('/404').expect(404);
    await request(app).get('/notfound').expect(404);
  });
});
