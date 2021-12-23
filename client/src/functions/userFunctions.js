import axios from 'axios';

export const createUserCart = async (cart, authToken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/user/cart`,
    { cart },
    {
      headers: {
        authToken,
      },
    }
  );
};

export const getUserCart = async (authToken) => {
  return await axios.get(`${process.env.REACT_APP_API}/user/cart`, {
    headers: {
      authToken,
    },
  });
};

export const emptyUserCart = async (authToken) => {
  return await axios.delete(`${process.env.REACT_APP_API}/user/cart`, {
    headers: {
      authToken,
    },
  });
};

export const saveUserAddress = async (address, authToken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/user/address`,
    { address },
    {
      headers: {
        authToken,
      },
    }
  );
};

export const getUserAddress = async (authToken) => {
  return await axios.get(`${process.env.REACT_APP_API}/user/address`, {
    headers: {
      authToken,
    },
  });
};

export const applyCouponToUserCart = async (coupon, authToken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/user/cart/coupon`,
    { coupon },
    {
      headers: {
        authToken,
      },
    }
  );
};

// User order

export const createUserOrder = async (stripeResponse, authToken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/user/orders`,
    { stripeResponse },
    {
      headers: {
        authToken,
      },
    }
  );
};

export const getAllOrdersByUser = async (authToken) => {
  return await axios.get(`${process.env.REACT_APP_API}/user/orders`, {
    headers: {
      authToken,
    },
  });
};

// User wishlist
export const getWishlist = async (authToken) => {
  return await axios.get(`${process.env.REACT_APP_API}/user/whishlist`, {
    headers: {
      authToken,
    },
  });
};

export const removeProductFromWishlist = async (productId, authToken) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/user/orders`,
    { productId },
    {
      headers: {
        authToken,
      },
    }
  );
};

export const addProductToWishlist = async (productId, authToken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/user/orders`,
    { productId },
    {
      headers: {
        authToken,
      },
    }
  );
};
