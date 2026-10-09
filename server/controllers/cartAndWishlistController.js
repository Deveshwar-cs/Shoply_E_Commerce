import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import Cart from '../models/cartModel.js';
import Coupon from '../models/couponModel.js';
import Order from '../models/orderModel.js';
import uniqid from 'uniqid';

export const createCart = async (req, res) => {
  const { cart } = req.body;

  let products = [];

  try {
    const user = await User.findOne({
      email: req.user.email,
    });

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const cartExistedByThisUser = await Cart.findOne({
      orderedBy: user._id,
    });

    if (cartExistedByThisUser) {
      await cartExistedByThisUser.deleteOne();
    }

    for (const product of cart.items) {
      const newProductItem = {};

      newProductItem.product = product._id;
      newProductItem.quantity = product.cartQuantity;

      const productFromDB = await Product.findById(product._id).select('price');

      if (!productFromDB) {
        return res.status(404).json({
          message: `Product ${product._id} not found`,
        });
      }

      newProductItem.price = productFromDB.price;

      products.push(newProductItem);
    }
    const newCart = await Cart.create({
      products,

      totalPrice: products.reduce(
        (sum, product) => sum + product.quantity * product.price,
        0,
      ),

      orderedBy: user._id,
    });

    await User.updateOne(
      { email: req.user.email },
      { $set: { cart: products } },
    );

    return res.json({
      ok: true,
    });
  } catch (error) {
    console.error('CREATE CART ERROR:', error);

    return res.status(400).json({
      errormessage: error.message,
    });
  }
};

export const getUserCart = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });

    const cart = await Cart.findOne({ orderedBy: user._id }).populate(
      'products.product',
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

export const removeProductCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const user = await User.findOne({
      email: req.user.email,
    });

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const cart = await Cart.findOne({
      orderedBy: user._id,
    });

    if (!cart) {
      return res.status(404).json({
        message: 'Cart not found!',
      });
    }
    cart.products = cart.products.filter(
      (item) => item.product.toString() !== productId,
    );

    // If no products are left, delete the entire cart
    if (cart.products.length === 0) {
      await cart.deleteOne();

      user.cart = [];

      await user.save();

      return res.status(200).json({
        ok: true,
        message: 'Cart is now empty',
      });
    }

    cart.totalPrice = cart.products.reduce((sum, item) => {
      return sum + item.quantity * item.price;
    }, 0);

    await cart.save();

    const newCart = await Cart.findOne({ orderedBy: user._id });
    user.cart = newCart.products.map((item) => ({
      product: item.product,
      quantity: item.quantity,
      price: item.price,
    }));

    await user.save();
    return res.status(200).json({
      ok: true,
      cart,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProductCartQuantity = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const user = await User.findOne({ email: req.user.email });
    // console.log(user);
    if (!user) {
      res.status(404).message({ message: 'User not found!' });
    }

    const cart = await Cart.findOne({ orderedBy: user._id });

    if (!cart) {
      res.status(400).json({ message: 'Cart not found!' });
    }

    const cartProduct = cart.products.find(
      (item) => item.product.toString() === productId,
    );
    if (!cartProduct) {
      return res.status(404).json({ message: 'Cart product not found!!' });
    }

    cartProduct.quantity = quantity;

    cart.totalPrice = cart.products.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    await cart.save();

    const newCart = await Cart.findOne({ orderedBy: user._id });
    user.cart = newCart.products.map((item) => ({
      product: item.product,
      quantity: item.quantity,
      price: item.price,
    }));

    await user.save();

    return res.status(200).json({
      ok: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const emptyUserCart = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    const cart = await Cart.findOneAndDelete({ orderedBy: user._id });

    user.cart = [];

    await user.save();
    res.json(cart);
  } catch (error) {
    res.status(400).json({
      errormessage: error.message,
    });
  }
};

// Save user address for shipping
export const saveUserAddress = async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { email: req.user.email },
      { address: req.body.address },
    );

    res.json({ addressSaved: true });
  } catch (error) {
    res.status(400).json({
      errormessage: error.message,
    });
  }
};

// Get user address on Checkout page
export const getUserAddress = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });

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
export const applyCouponToUserCart = async (req, res) => {
  const applyedCoupon = req.body.coupon;
  try {
    const coupon = await Coupon.findOne({ name: applyedCoupon });
    // if no coupon or it expired
    if (!coupon) {
      return res.json({ invalidCoupon: true });
    }

    const user = await User.findOne({ email: req.user.email });
    const cart = await Cart.findOne({ orderedBy: user._id });

    if (new Date(coupon.expiry) < Date.now()) {
      return res.json({ couponExpired: true });
    }
    // discounted_price = original_price - (original_price * discount / 100)
    const discountedPrice =
      cart.totalPrice - (cart.totalPrice * coupon.discount) / 100;
    // 50 - (50 * 50)/ 100; = 50 - (2500 / 100) = 25
    await Cart.findByIdAndUpdate(
      { _id: cart._id },
      { totalPriceAfterDiscount: discountedPrice.toFixed(2) },
      { new: true },
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
export const createOrder = async (req, res) => {
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
    console.log('createOrder paymentIntent ====>', paymentIntent);
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

// User order with cash pyment
export const createOrderCashPayment = async (req, res) => {
  try {
    // if cashOnDelivery true, create order with status 'Cash On Delivery'
    const { cashOnDelivery } = req.body;

    if (!cashOnDelivery) return res.status(400).json({ orderCreated: false });

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
      // crate our custom paymentIntent
      paymentIntent: {
        id: uniqid(),
        amount: cart.totalPriceAfterDiscount
          ? cart.totalPriceAfterDiscount * 100
          : cart.totalPrice * 100,
        currency: 'usd',
        status: 'Cash On Delivery',
        created: Math.floor(Date.now() / 1000),
        payment_method_types: ['cash'],
      },
      orderedBy: user._id,
      orderStatus: 'Cash On Delivery',
    });

    res.json({ orderCreated: true });
  } catch (error) {
    res.status(400).json({
      errormessage: error.message,
    });
  }
};

// Get all orders by user
export const getAllOrdersByUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });

    const userOrders = await Order.find({ orderedBy: user._id })
      .populate('products.product')
      .sort([['createdAt', 'desc']]);

    res.json(userOrders);
  } catch (error) {
    console.log('getAllOrdersByUser ERROR ===>', error);
    res.status(400).json({
      errormessage: error.message,
    });
  }
};

// USER WHISHLIST

// Add to whishlist
export const addToWishlist = async (req, res) => {
  const { productId } = req.body;
  try {
    await User.findOneAndUpdate(
      { email: req.user.email },
      { $addToSet: { wishlist: productId } }, // https://docs.mongodb.com/manual/reference/operator/update/addToSet/
    );

    res.json({ productAddedToWishlist: true });
  } catch (error) {
    res.status(400).json({
      errormessage: error.message,
    });
  }
};

// Get user's whishlist
export const getWishlist = async (req, res) => {
  try {
    const wishlist = await User.findOne(
      { email: req.user.email },
      { whishlist: 1 },
    ).populate('wishlist');

    res.json(wishlist);
  } catch (error) {
    res.status(400).json({
      errormessage: error.message,
    });
  }
};

// Update user's wishlist (delete product from wishlist)
export const updateWishlist = async (req, res) => {
  const { productId } = req.body;
  try {
    await User.findOneAndUpdate(
      { email: req.user.email },
      { $pull: { wishlist: productId } }, // https://docs.mongodb.com/manual/reference/operator/update/pull/
    );

    res.json({ productDeletedFromWishlist: true });
  } catch (error) {
    res.status(400).json({
      errormessage: error.message,
    });
  }
};
