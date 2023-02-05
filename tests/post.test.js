const mongoose = require('mongoose');
const request = require('supertest');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

/* Connecting to the database before each test. */
beforeEach(async () => {
  mongoose.set('strictQuery', true);
  await mongoose.connect(process.env.TEST_MONGO_URI);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

//ROUTES
const auth = require('../routes/auth');
const postRoutes = require('../routes/postRoutes');
app.use('/api/auth', auth);
app.use('/api/posts', postRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

describe('GET /api/activities', () => {
  afterAll(async () => {
    await mongoose.connect(process.env.TEST_MONGO_URI);
    const collections = await mongoose.connection.db.collections();
    for (const collection of collections) {
      await collection.deleteMany({});
    }
    await mongoose.connection.close();
  });
  
  test('should get all the posts', async () => {
    const user = await request(app).post('/api/auth/register').send({
      username: 'jester',
      firstname: 'jester',
      lastname: 'clown',
      email: 'jester@gmail.com',
      password: 'jester',
    });

    const post = await request(app)
      .post('/api/posts')
      .send({
        description: 'description',
        pictureUrl: 'pictureUrl',
      })
      .set({
        Authorization: 'Bearer ' + user.body.token,
        'Content-Type': 'application/json',
      });

    const response = await request(app)
      .get('/api/posts')
      .set({
        Authorization: 'Bearer ' + user.body.token,
        'Content-Type': 'application/json',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]._id).toBeDefined();
  });
});
