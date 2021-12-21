const Order = require('../models/orderModel');

// Get all orders by admin
exports.getAllOrdersByAdmin = async (req, res) => {
  try {
    const allOrders = await Order.find({})
      .populate('products.product')
      .sort([['createdAt', 'asc']]);

    res.json(allOrders);
  } catch (error) {
    console.log('getAllOrdersByAdmin ERROR ===>', error);
    res.status(400).json({
      errormessage: error.message,
    });
  }
};

exports.updateOrderStatus = async (req, res) => {
  const { orderId, orderStatus } = req.body;
  try {
    await Order.findByIdAndUpdate(orderId, { orderStatus }, { new: true });

    res.status(200).json({ orderStatusUpdated: true });
  } catch (error) {
    console.log('updateOrderStatus ERROR ===>', error);
    res.status(400).json({
      errormessage: error.message,
    });
  }
};
