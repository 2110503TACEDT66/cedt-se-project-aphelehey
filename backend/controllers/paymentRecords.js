const PaymentRecord = require("../models/Order")

exports.getPaymentRecords = async (req, res, next) => {
    let query;
    if (req.user.role !== "admin") {
        query = PaymentRecord.find({ user: req.user.id }).sort({ createdAt: -1 })
    }
    else {
        query = PaymentRecord.find({}).sort({ createdAt: -1 })
    }
    try {
        const paymentRecords = await query;
        res.status(200).json(
            paymentRecords
        )
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Cannot find paymentRecord'
        })
    }
}

// backend transaction ฝากเอาไปใส่ หลัง transaction complete
// update payment status from false to true
// exports.updatePaymentStatus = async (req, res, next) => {
//     try {
//         let paymentRecord = await PaymentRecord.findById(req.body.order) //In schema order is order_id
//         if (!paymentRecord) {
//             res.status(404).json({ succcess: false, message: `No paymentRecord with this order id ${req.body.order}` })
//         }
//         paymentRecord = await PaymentRecord.findByIdAndUpdate(req.body.order, { payment: true }, {
//             runValidators: true
//         })
//         res.status(200).json({ sucess: true })
//     }
//     catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Cannot update paymentStatus'
//         })
//     }
// }