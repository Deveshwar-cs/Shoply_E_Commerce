const Order = require('../models/orderModel');

// Get all orders by admin
exports.getAllOrdersByAdmin = async (req, res) => {
  try {
    const allOrders = await Order.find({})
      .populate('products.product')
      .sort([['createdAt', 'desc']]);

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
    const updatedOrderStatus = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus },
      { new: true }
    );
    res.status(200).json(updatedOrderStatus);
  } catch (error) {
    console.log('updateOrderStatus ERROR ===>', error);
    res.status(400).send('Update order status failed!');
  }
};
