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
const userRoutes = require('../routes/userRouter');
app.use('/api/auth', auth);
app.use('/api/users', userRoutes);

describe('POST /api/auth/register', () => {
  test('should register new user', async () => {
    const response = await request(app).post('/api/auth/register').send({
      username: 'jester',
      firstname: 'jester',
      lastname: 'clown',
      email: 'jester@gmail.com',
      password: 'jester',
    });

    expect(response.statusCode).toBe(200);
    expect(response.body._id).toBeDefined();
    expect(response.body.username).toMatch('jester');
  });
});

describe('POST /api/auth/login', () => {
  afterAll(async () => {
    await mongoose.connect(process.env.TEST_MONGO_URI);
    const collections = await mongoose.connection.db.collections();
    for (const collection of collections) {
      await collection.deleteMany({});
    }
  });

  test('should login the user', async () => {
    const response = await request(app).post('/api/auth/login').send({
      username: 'jester',
      password: 'jester',
    });

    expect(response.statusCode).toBe(200);
    expect(response.body._id).toBeDefined();
  });
});
