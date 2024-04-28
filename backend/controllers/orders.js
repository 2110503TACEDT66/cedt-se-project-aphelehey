const Order = require("../models/Order");
const Restaurant = require("../models/Restaurant");

exports.getOrders = async (req, res, next) => {
  let query;
  if (req.user.role !== "admin") {
    query = Order.find({ user: req.user.id }).populate({
      path: "restaurant",
      select: "name province tel",
    });
  } else {
    if (req.params.restaurantId) {
      console.log(req.params.restaurantId);
      query = Order.find({
        restaurant: req.params.restaurantId,
      }).populate({
        path: "restaurant",
        select: "name province tel",
      });
    } else {
      query = Order.find().populate({
        path: "restaurant",
        select: "name province tel",
      });
    }
  }

  try {
    const orders = await query;

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Cannot find Order",
    });
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate({
      path: "restaurant",
      select: "name description tel",
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: `No order with the id of ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Cannot find Order" });
  }
};

exports.addOrder = async (req, res, next) => {
  try {
    req.body.restaurant = req.params.restaurantId;

    const restaurant = await Restaurant.findById(req.params.restaurantId);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: `No restaurant with the id of ${req.params.restaurantId}`,
      });
    }

    console.log(req.body);
    
    if( req.user.role !== "admin" || !req.body.user){
      req.body.user = req.user.id;
    }
    

    // const existedOrders = await Order.find({ user: req.user.id });

    // if (existedOrders.length >= 3 && req.user.role !== "admin") {
    //   return res.status(400).json({
    //     success: false,
    //     message: `The user with ID ${req.user.id} has already made 3 orders`,
    //   });
    // }

    const order = await Order.create(req.body);
    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Cannot create Order" });
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    let order = await Order.findById(req.params.id);

    if (!order) {
      res.status(404).json({
        success: false,
        message: `No order with the id of ${req.params.id}`,
      });
    }

    if (
      order.user.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to update this order`,
      });
    }

    order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Cannot update Order" });
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: `No order with the id of ${req.params.id}`,
      });
    }

    if (
      order.user.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to delete this Order`,
      });
    }

    await order.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Cannot delete Order" });
  }
};
