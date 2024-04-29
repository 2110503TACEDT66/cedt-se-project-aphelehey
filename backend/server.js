const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const { xss } = require('express-xss-sanitizer')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp');
const cors = require('cors')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')

dotenv.config({ path: './config/config.env' });


connectDB();

const restaurants = require('./routes/restaurants.js');
const auth = require('./routes/auth.js');
const reservations = require('./routes/reservations.js')
const menus = require('./routes/menus.js');
const paymentRecords = require('./routes/paymentRecords.js')
const transaction = require('./routes/transactions.js')
const userAddresses = require('./routes/userAddresses.js')
const orders = require('./routes/orders.js')

const limiter = rateLimit({
    windowsMs: 10 * 60 * 1000,
    max: 100
})



const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
app.use(limiter);
app.use(hpp());
app.use(cors());
app.use('/api/v1/restaurants', restaurants);
app.use('/api/v1/auth', auth);
app.use('/api/v1/reservations', reservations);
app.use('/api/v1/menus', menus);
app.use('/api/v1/paymentRecords', paymentRecords);
app.use('/api/v1/transactions',transaction);
app.use('/api/v1/userAddresses', userAddresses);
app.use('/api/v1/orders',orders );



const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log('Server running in ', process.env.NODE_ENV, ' mode on port ', 'http://localhost:' + PORT));

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);

    server.close(() => process.exit(1));
});

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Restaurant API',
            version: '1.0.0',
            description: 'A restaurant API for the Software Engineering project'
        },
        servers: [
            {
                url: 'http://localhost:5000/api/v1'
            }
        ]
    },
    apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))