
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../../app'); // apna express app
const User = require('../../../models/userModel'); // apna User model

// Mock data
let testUserId;

beforeAll(async () => {
    // connect to test db
    const db = 'mongodb://127.0.0.1:27017/jest_test_db';
    await mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    // create a test user
    const testUser = await User.create({
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'password123',
        roleId: 2
    });
    testUserId = testUser._id.toString();
});

afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
});

describe('User Controller', () => {

    test('GET /users - should get all users', async () => {
        const res = await request(app).get('/users');
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe('success');
        expect(res.body.data.length).toBeGreaterThan(0);
    });

    test('GET /users/:id - should get single user', async () => {
        const res = await request(app).get(`/users/${testUserId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe('success');
        expect(res.body.data.email).toBe('testuser@example.com');
    });

    test('PATCH /users/:id - should update username', async () => {
        // Mock logged in user
        const agent = request.agent(app);
        // We will assume req.user._id = testUserId
        const res = await agent
            .patch(`/users/${testUserId}`)
            .send({ username: 'Updated User' })
            .set('Authorization', 'Bearer fakeToken'); // agar JWT middleware hai toh mock karna padega

        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe('success');
        expect(res.body.data.to.name).toBe('Updated User');
    });

    test('DELETE /users/:id - should delete user', async () => {
        const res = await request(app).delete(`/users/${testUserId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe('success');
        expect(res.body.data).toBe('user Deleteds');
    });

});
