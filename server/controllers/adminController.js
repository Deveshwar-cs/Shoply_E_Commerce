import Order from '../models/orderModel.js';
// Get all orders by admin
export const getAllOrdersByAdmin = async (req, res) => {
  try {
    const allOrders = await Order.find({})
      .populate('products.product')
      .populate('orderedBy')
      .sort({ createdAt: 1 });
    console.log(allOrders);
    res.json(allOrders);
  } catch (error) {
    console.log('getAllOrdersByAdmin ERROR ===>', error);
    res.status(500).json({
      errormessage: error.message,
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  const { orderId, orderStatus } = req.body;
  try {
    await Order.findByIdAndUpdate(orderId, { orderStatus }, { new: true });

    res.status(200).json({ orderStatusUpdated: true });
  } catch (error) {
    console.log('updateOrderStatus ERROR ===>', error);
    res.status(500).json({
      errormessage: error.message,
    });
  }
};
