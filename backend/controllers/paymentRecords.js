const { query } = require("express");
const PaymentRecord = require("../models/Order")

exports.getPaymentRecords = async (req, res, next) => {
    let query;
    if (req.user.role !== "admin") {
        query = PaymentRecord.find({ user: req.user.id, payment: true }).sort({ createdAt: -1 }).populate({
            path: "restaurant",
            select: "name"
        });
    }
    else {
        query = PaymentRecord.find({ payment: true }).sort({ createdAt: -1 }).populate({
            path: "restaurant",
            select: "name"
        });
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
exports.updatePaymentStatus = async (req, res, next) => {
    try {
        let paymentRecord = await PaymentRecord.findById(req.body.order) //In schema order is order_id
        if (!paymentRecord) {
            res.status(404).json({ succcess: false, message: `No paymentRecord with this order id ${req.body.order}` })
        }
        paymentRecord = await PaymentRecord.findByIdAndUpdate(req.body.order, { payment: true }, {
            runValidators: true
        })
        res.status(200).json({ sucess: true })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Cannot update paymentStatus'
        })
    }
}


exports.getSalesData = async (req, res, next) => {

    let query;

    const reqQuery={...req.query};

    const removeFields=['select','sort','page','limit'];

    console.log(reqQuery);
    
    if(req.params.restaurantId){
        if(reqQuery.year){
            if(reqQuery.quater){
                console.log(reqQuery.quater);
                
                const startYear = reqQuery.year;
                const startMonth = (reqQuery.quater-1)*3;
                const startDate = new Date(startYear, startMonth, 1); // January 1st of the specified year
    
                const endMonth = (reqQuery.quater)*3;
                const endDate = new Date(startYear, endMonth, 1); 
    
                console.log(startDate);
                console.log(endDate)
                query = PaymentRecord.find({ restaurant: req.params.restaurantId ,createdAt:{ $gte: startDate, $lt: endDate }}).sort({ createdAt: -1 }).populate({
                    path: "restaurant",
                    select: "name"
                });
            }
            else if(reqQuery.month){
                console.log(reqQuery.month);
                
                const startYear = reqQuery.year;
                const startMonth = reqQuery.month-1;
                const startDate = new Date(startYear, startMonth, 1); // January 1st of the specified year
    
                const endMonth = startMonth+1;
                const endDate = new Date(startYear, endMonth, 1); 
    
                console.log(startDate);
                console.log(endDate);
                query = PaymentRecord.find({ restaurant: req.params.restaurantId ,createdAt:{ $gte: startDate, $lt: endDate }}).sort({ createdAt: -1 }).populate({
                    path: "restaurant",
                    select: "name"
                });
            }
            else{
                console.log(reqQuery.year);
                const startYear = reqQuery.year;
                const startDate = new Date(startYear, 0, 1); // January 1st of the specified year
    
                const endYear = startDate.getFullYear() + 1; // Extract the year part and add 1
                const endDate = new Date(endYear, 0, 1); 
    
                console.log(startDate);
                console.log(endDate)
                query = PaymentRecord.find({ restaurant: req.params.restaurantId ,createdAt:{ $gte: startDate, $lt: endDate }}).sort({ createdAt: -1 }).populate({
                    path: "restaurant",
                    select: "name"
                });
            }
        }
        else{
            console.log(req.params.restaurantId);

            query = PaymentRecord.find({ restaurant: req.params.restaurantId }).sort({ createdAt: -1 }).populate({
                path: "restaurant",
                select: "name"
            });
        }
    }
    else{
        return res.status(400).json({
            success: false,
            message: "Don't have restaurant",
          });
    }

    try {
        const paymentRecords = await query;
    
        let totalSales = 0;
        paymentRecords.map((paymentRecord)=>{
            totalSales += paymentRecord.price
        })


        res.status(200).json({
          success: true,
          count: paymentRecords.length,
          sales: totalSales,
          data: paymentRecords,
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: "Cannot find SalesData",
        });
      }
    
  }