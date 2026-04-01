const request = require('supertest');
const app = require('../app');
const db = require('../database');

describe('Security Tests (SQLi, XSS, Auth, RBAC)', () => {
    let adminToken, userToken;

    beforeAll((done) => {
        // Clear tables for a fresh start
        db.serialize(() => {
            db.run(`DELETE FROM users`);
            db.run(`DELETE FROM messages`, done);
        });
    });

    afterAll((done) => {
        db.close(done);
    });

    it('Activity 1: Input Validation - Should block invalid email registration', async () => {
        const res = await request(app)
            .post('/auth/register')
            .send({ username: 'testuser', email: 'invalid-email', password: 'password123', role: 'user' });
        
        expect(res.statusCode).toBe(400);
        expect(res.body.errors[0].msg).toBe('Must be a valid email');
    });

    it('Activity 1 & 2: Should register a valid user and hash password securely', async () => {
        const res = await request(app)
            .post('/auth/register')
            .send({ username: 'reguser', email: 'reg@valid.com', password: 'supersecret', role: 'user' });
        
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('User registered successfully');

        // Check DB for hashed password (not plain text)
        db.get(`SELECT password_hash FROM users WHERE username = 'reguser'`, (err, row) => {
            expect(row.password_hash).not.toBe('supersecret');
            expect(row.password_hash.length).toBeGreaterThan(50); // Bcrypt hashes are 60 chars
        });
    });

    it('Activity 1 & 3: SQL Injection Prevention in Login', async () => {
        // Assume user tries to bypass login with: ' OR 1=1 --
        const res = await request(app)
            .post('/auth/login')
            .send({ username: "' OR 1=1 --", password: "any" });
        
        expect(res.statusCode).toBe(401); // Authorized access denied, sqli failed
        expect(res.body.error).toBe('Invalid credentials');
    });

    it('Activity 2: Authentication and RBAC Token Generation', async () => {
        // Register Admin
        await request(app)
            .post('/auth/register')
            .send({ username: 'admin1', email: 'admin1@valid.com', password: 'adminpassword', role: 'admin' });
        
        // Register User
        await request(app)
            .post('/auth/register')
            .send({ username: 'user1', email: 'user1@valid.com', password: 'userpassword', role: 'user' });

        // Login Admin
        const resAdmin = await request(app)
            .post('/auth/login')
            .send({ username: 'admin1', password: 'adminpassword' });
        adminToken = resAdmin.body.token;

        // Login User
        const resUser = await request(app)
            .post('/auth/login')
            .send({ username: 'user1', password: 'userpassword' });
        userToken = resUser.body.token;

        expect(adminToken).toBeDefined();
        expect(userToken).toBeDefined();
    });

    it('Activity 2: RBAC - Block normal user from admin panel', async () => {
        const res = await request(app)
            .get('/api/admin')
            .set('Authorization', `Bearer ${userToken}`);
        
        expect(res.statusCode).toBe(403);
        expect(res.body.error).toBe('Access denied: Requires admin role');
    });

    it('Activity 2: RBAC - Allow admin to access admin panel', async () => {
        const res = await request(app)
            .get('/api/admin')
            .set('Authorization', `Bearer ${adminToken}`);
        
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Welcome to the admin panel');
    });

    it('Activity 1 & 3: XSS Prevention - Should sanitize inputs', async () => {
        const maliciousPayload = "<script>alert('XSS')</script> Hello!";
        
        const res = await request(app)
            .post('/api/messages')
            .set('Authorization', `Bearer ${userToken}`)
            .send({ content: maliciousPayload });

        expect(res.statusCode).toBe(201);
        
        // Assert that the script tags were escaped/removed
        expect(res.body.content).not.toContain('<script>');
        expect(res.body.content).toContain('&lt;script&gt;'); // xss library escapes tags
    });
});
