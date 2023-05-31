request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');
require('../models');

let movieId;

test('POST / movies', async () => {
    const movie = {
        name: "Titanic",
        image: "image/titanic.jpg",
        synopsis: "lorem dipsum",
        release_year: "1998-11-06"
    };
    const res = await request(app).post('/movies').send(movie);
    movieId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('GET / movies', async () => {
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].actors).toBeDefined();
});

test('PUT / movies/:id', async () => {
    const movieUpdate = {
        name: "Titanic 2"
    }
    const res = await request(app)
        .put(`/movies/${movieId}`)
        .send(movieUpdate);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(movieUpdate.name);
});


test('POST SET / movies/:id/genres', async () => {
    const genre = await Genre.create({ name: "Romantico" });
    const res = await request(app)
        .post(`/movies/${movieId}/genres`)
        .send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('POST SET / movies/:id/actors', async () => {
    const actor = await Actor.create({
        first_name: 'Leonardo',
        last_name: 'Dicaprio',
        nationality: 'United States',
        image: 'image/leonard/dicaprio.jpg',
        birthday: '1990-11-12'
    });
    const res = await request(app)
        .post(`/movies/${movieId}/actors`)
        .send([actor.id]);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('POST SET / movies/:id/directors', async () => {
    const director = await Director.create({
        first_name: 'James',
        last_name: 'Cameron',
        nationality: 'Canadian',
        image: 'image/james/cameron.jpg',
        birthday: '1985-05-02'
    });
    const res = await request(app)
        .post(`/movies/${movieId}/directors`)
        .send([director.id]);
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('DELETE / movies/:id', async () => {
    const res = await request(app).delete(`/movies/${movieId}`);
    expect(res.status).toBe(204);
});
