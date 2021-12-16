const Product = require('../models/productModel');
const User = require('../models/userModel');
const Cart = require('../models/cartModel');
const Coupon = require('../models/couponModel');
const Order = require('../models/orderModel');

exports.createCart = async (req, res) => {
  const { cart } = req.body;

  // in Product model we don't have cartQuantity field (we only have quantity in stock field)
  // so make new array of products with all fields we need for Cart model
  let products = [];

  try {
    // we have access to current user in req.user by autchCheck middleware
    const user = await User.findOne({ email: req.user.email });

    //check if cart with logged in user exist already (user always have only one cart)
    const cartExistedByThisUser = await Cart.findOne({ orderedBy: user._id });
    if (cartExistedByThisUser) {
      // if cart exist – remove it
      cartExistedByThisUser.remove(); // cartExistedByThisUser have access to Cart model and we can use remove method
      console.log('///// removed old cart');
    }

    // build new products with required data for cartModel
    for await (let product of cart) {
      // This for loop behaves synchronously.
      // Next iteration will begin after execution of code inside this loop
      let newProductItem = {};
      newProductItem.product = product._id;
      newProductItem.quantity = product.cartQuantity;
      // we want to get price from DB for security reason – user can manualy change price in loacalStorage
      let { price } = await Product.findById(product._id).select('price');
      newProductItem.price = price;

      products.push(newProductItem);
    }

    // save new cart to DB
    const newCart = await Cart.create({
      products,
      totalPrice: products.reduce(
        (sum, product) => sum + product.quantity * product.price,
        0
      ),
      orderedBy: user._id,
    });

    console.log(
      '///// createCart controller newCart saved in DB ===>',
      newCart
    );

    res.json({ ok: true });
  } catch (error) {
    res.status(400).json({
      errormessage: error.message,
    });
  }
};

exports.getUserCart = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });

    const cart = await Cart.findOne({ orderedBy: user._id }).populate(
      'products.product'
    );

    // if user don't have cart
    if (!cart) return res.json({ cartIsEmpty: true });

    const { products, totalPrice, totalPriceAfterDiscount } = cart;

    res.json({ products, totalPrice, totalPriceAfterDiscount });
  } catch (error) {
    console.log('getUserCart ERROR ===>', error);
    res.status(400).json({
      errormessage: error.message,
    });
  }
};

exports.emptyUserCart = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });

    const cart = await Cart.findOneAndRemove({ orderedBy: user._id });

    res.json(cart);
  } catch (error) {
    res.status(400).json({
      errormessage: error.message,
    });
  }
};

// Save user address for shipping

exports.saveUserAddress = async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { email: req.user.email },
      { address: req.body.address }
    );

    res.json({ addressSaved: true });
  } catch (error) {
    res.status(400).json({
      errormessage: error.message,
    });
  }
};

// Get user address on Checkout page
exports.getUserAddress = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });

    console.log('getUserAddress address ===>', user.address);

    // if user don't have address
    if (user.address === undefined) {
      return res.json({ userAddressNotSet: true });
    }

    res.json({ address: user.address });
  } catch (error) {
    console.log('getUserAddress ERROR ===>', error);
    res.status(400).json({
      errormessage: error.message,
    });
  }
};

// Apply a coupon to the user cart
exports.applyCouponToUserCart = async (req, res) => {
  const applyedCoupon = req.body.coupon;
  console.log('applyCouponToUserCart applyedCoupon ===>', applyedCoupon);
  try {
    const coupon = await Coupon.findOne({ name: applyedCoupon });
    console.log('applyCouponToUserCart coupon ===>', coupon);
    // if no coupon or it expired
    if (!coupon) {
      return res.json({ invalidCoupon: true });
    }

    const user = await User.findOne({ email: req.user.email });
    const cart = await Cart.findOne({ orderedBy: user._id });

    console.log('applyCouponToUserCart user ===>', user);
    console.log('applyCouponToUserCart cart ===>', cart);

    if (new Date(coupon.expiry) < Date.now()) {
      return res.json({ couponExpired: true });
    }
    // discounted_price = original_price - (original_price * discount / 100)
    const discountedPrice =
      cart.totalPrice - (cart.totalPrice * coupon.discount) / 100;

    await Cart.findByIdAndUpdate(
      { _id: cart._id },
      { totalPriceAfterDiscount: discountedPrice.toFixed(2) },
      { new: true }
    );

    res.json({ discountAppliedSuccess: true });
  } catch (error) {
    console.log('applyCouponToUserCart ERROR ===>', error);
    res.status(400).json({
      errormessage: error.message,
    });
  }
};

// User order
exports.createOrder = async (req, res) => {
  try {
    const { paymentIntent } = req.body.stripeResponse;

    const user = await User.findOne({ email: req.user.email });

    const cart = await Cart.findOne({ orderedBy: user._id });

    // decrement quantity, increment sold with Model.bulkWrite(). Helpful links below
    // https://docs.mongodb.com/manual/reference/method/db.collection.bulkWrite/
    // https://stackoverflow.com/questions/39988848/trying-to-do-a-bulk-upsert-with-mongoose-whats-the-cleanest-way-to-do-this
    const bulkOperations = cart.products.map((item) => ({
      updateOne: {
        filter: { _id: item.product._id },
        update: {
          $inc: {
            quantity: -item.quantity,
            sold: +item.quantity,
          },
        },
      },
    }));

    await Product.bulkWrite(bulkOperations);

    // save new order to DB
    await Order.create({
      products: cart.products.map((item) => ({
        product: item.product,
        quantity: item.quantity,
      })),
      paymentIntent,
      orderedBy: user._id,
    });

    res.json({ orderCreated: true });
  } catch (error) {
    res.status(400).json({
      errormessage: error.message,
    });
  }
};

// Get all orders by user
exports.getAllOrdersByUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });

    const userOrders = await Order.find({ orderdBy: user._id }).populate(
      'products.product'
    );

    res.json(userOrders);
  } catch (error) {
    console.log('getAllOrdersByUser ERROR ===>', error);
    res.status(400).json({
      errormessage: error.message,
    });
  }
};
