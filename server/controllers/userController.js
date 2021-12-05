const Product = require('../models/productModel');
const User = require('../models/userModel');
const Cart = require('../models/cartModel');

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
    console.log('cart ===>', cart);
    // if user don't have cart send null as response
    if (cart === null) {
      return res.json(null);
    }
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
