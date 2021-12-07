import axios from 'axios';

export const createCoupon = async (coupon, authToken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/coupons`,
    { coupon },
    {
      headers: {
        authToken,
      },
    }
  );
};

export const getAllCoupons = async (authToken) => {
  return await axios.get(`${process.env.REACT_APP_API}/coupons`, {
    headers: {
      authToken,
    },
  });
};

export const deleteCoupon = async (couponId, authToken) => {
  return await axios.delete(
    `${process.env.REACT_APP_API}/coupons/${couponId}`,
    {
      headers: {
        authToken,
      },
    }
  );
};
