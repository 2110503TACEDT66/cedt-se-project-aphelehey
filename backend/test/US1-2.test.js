const request = require('supertest');
const { app,server } = require('../server'); // Assuming your app is exported from app.js
const mongoose = require('mongoose')

  // Test fetching all restaurants
  describe('GET /api/v1/paymentRecords', () => {
    let token;
    let _id;
    it('User login', async () => {

        const user = {
            email: "test22@gmail.com",
            password: "123456"
          };

        const response = await request(app)
        .post('/api/v1/auth/login')
        .send(user);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);

        token = response.body.token;
        _id = response.body._id;
        console.log(token);
    });
  

      it('User should see their payment records', async() => {
        const response = await request(app)
        .get('/api/v1/paymentRecords')
        .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        const paymentRecords = response.body;

        expect(Array.isArray(paymentRecords)).toBe(true);

        // Optional: Verify specific fields or structure of each payment record
        paymentRecords.forEach(record => {
            expect(record).toHaveProperty('_id');
            expect(record.user).toBe(_id);
            expect(record).toHaveProperty('user');
            expect(record).toHaveProperty('food');
            expect(record).toHaveProperty('price');
            expect(record).toHaveProperty('payment');
            expect(record).toHaveProperty('location');
            expect(record).toHaveProperty('restaurant');
            expect(record).toHaveProperty('createdAt');
            expect(record).toHaveProperty('__v');
            });
      });


      it('Admin login', async () => {

        const user = {
            email: "mekadd@gmail.com",
            password: "123456"
          };

        const response = await request(app)
        .post('/api/v1/auth/login')
        .send(user);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);

        token = response.body.token;
        _id = response.body._id;
        console.log(token);
    });
  

      it('Admin should see all payment records', async() => {
        const response = await request(app)
        .get('/api/v1/paymentRecords')
        .set('Authorization', `Bearer ${token}`);;
        expect(response.status).toBe(200);

        const paymentRecords = response.body;

        expect(Array.isArray(paymentRecords)).toBe(true);

        expect(paymentRecords.length).toBeGreaterThan(0);

        paymentRecords.forEach(record => {
            expect(record).toHaveProperty('_id');
            expect(record).toHaveProperty('user');
            expect(record).toHaveProperty('food');
            expect(record).toHaveProperty('price');
            expect(record).toHaveProperty('payment');
            expect(record).toHaveProperty('location');
            expect(record).toHaveProperty('restaurant');
            expect(record).toHaveProperty('createdAt');
            expect(record).toHaveProperty('__v');
            });
  });

});
