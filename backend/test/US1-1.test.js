const request = require('supertest');
const { app,server } = require('../server'); // Assuming your app is exported from app.js

  // Test fetching all restaurants
  describe.only('POST /api/v1/transactions/checkout', () => {
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
  

    it('User should get the checkout url', async () => {

        const body = {
            user: {
                name: "John Doe",
                address: "123 Main St, City, Country"
            },
            products: [
                {
                    name: "Product 1",
                    price: 10,
                    quantity: 2
                },
                {
                    name: "Product 2",
                    price: 19,
                    quantity: 1
                }
            ],
            orderID: "65e44c37cb8aa54383faa2d2"
            }
          

        const response = await request(app)
        .post('/api/v1/transactions/checkout')
        .send(body)
        .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        
        responseBody = response.body;

        expect(responseBody).toHaveProperty('products');
        expect(responseBody.products).toBeInstanceOf(Array);
        expect(responseBody).toHaveProperty('orderID');
        expect(responseBody).toHaveProperty('transaction');
        expect(responseBody.transaction).toBeInstanceOf(Object);
        expect(responseBody).toHaveProperty('url');
        expect((responseBody.url).includes('https://checkout.stripe.com')).toBe(true)
    });

});
