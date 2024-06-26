const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Transaction = require('../models/Transaction');
const {v4:uuidv4} = require('uuid')
exports.checkout = async (req, res, next) => {
  console.log(req.body)
    const {user, products,orderID} = req.body

    const lineItems = products.map(product => ({
      price_data: {
          currency: 'thb',
          product_data: {
                    name: product.name,
                },
                unit_amount: product.price * 100,
            },
            quantity: product.quantity,
  }));

   const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        // URL to success page
        success_url: `${process.env.FRONTEND_URL}/payment/successful?orderID=${orderID}`,
        // URL to fail page
        cancel_url: `${process.env.FRONTEND_URL}/payment/fail`,
    });

      const orderData = {
        fullname: user.name,
        address: user.address,
        order_id:orderID,
        id:session.id
      }

      const transaction = await Transaction.create(orderData)
    
      res.json({
        products,
        orderID,
        transaction,
        url : session.url
      })
    console.log(session)
}