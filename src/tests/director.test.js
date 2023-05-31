request = require('supertest');
const app = require('../app');
require('../models')



let directorId;

test('POST / directors', async () => {
    const director = {
        first_name: 'James',
        last_name: 'Cameron',
        nationality: 'Canadian',
        image: 'image/james/cameron.jpg',
        birthday: '1985-05-02'
    };
    const res = await request(app)
        .post('/directors')
        .send(director);
    directorId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('GET / directors', async () => {
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('PUT / directors/:id', async () => {
    const directorUpdate = {
        first_name: 'James albert'
    }
    const res = await request(app)
        .put(`/directors/${directorId}`)
        .send(directorUpdate);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(directorUpdate.name);
});

test('DELETE / directors/:id', async () => {
    const res = await request(app).delete(`/directors/${directorId}`);
    expect(res.status).toBe(204);
});