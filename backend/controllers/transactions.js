const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Transaction = require('../models/Transaction');
const {v4:uuidv4} = require('uuid')
exports.checkout = async (req, res, next) => {
    const {user, product} = req.body
    const orderId = uuidv4()
    const session = await stripe.checkout.sessions.create({
        payment_method_types:['card'],
        line_items: [
          {
            price_data:{
                currency:'thb',
                product_data:{
                    name: product.name,
                },
                unit_amount: product.price * 100,
            },
            quantity: product.quantity,
          },
        ],
        mode: 'payment',
        //url to success page
        success_url: `${process.env.FRONTEND_URL}/payment/successful`,
        //url to fail page
        cancel_url: `${process.env.FRONTEND_URL}/payment/fail`,
      });
    
      const orderData = {
        fullname: user.name,
        address: user.address,
        order_id:orderId,
        session_id:session.id,
        status:session.status
      }

      const transaction = await Transaction.create(orderData)
    
      res.json({
        product,
        orderId,
        transaction
      })
    console.log(session)
}
