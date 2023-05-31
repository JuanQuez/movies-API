request = require('supertest');
const app = require('../app');
require('../models');


let actorId;

test('POST / actors', async () => {
    const actor = {
        first_name: 'Leonardo',
        last_name: 'Dicaprio',
        nationality: 'United States',
        image: 'image/leonard/dicaprio.jpg',
        birthday: '1990-11-12'
    };
    const res = await request(app)
        .post('/actors')
        .send(actor);
    actorId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('GET / actors', async () => {
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('PUT / actors/:id', async () => {
    const actorUpdate = {
        first_name: 'Leonidas'
    }
    const res = await request(app)
        .put(`/actors/${actorId}`)
        .send(actorUpdate);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(actorUpdate.name);
});

test('DELETE / actors/:id', async () => {
    const res = await request(app).delete(`/actors/${actorId}`);
    expect(res.status).toBe(204);
});