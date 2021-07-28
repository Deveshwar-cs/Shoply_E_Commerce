import axios from 'axios';

export const createOrUpdateUser = async (authToken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-or-update-user`,
    {},
    {
      headers: {
        authToken,
      },
    }
  );
};

export const currentUser = async (authToken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/current-user`,
    {},
    {
      headers: {
        authToken,
      },
    }
  );
};

export const roleBasedRedirect = (user, history) => {
  if (user.role === 'admin') {
    history.push('/admin/dashboard');
  } else {
    history.push('/user/history');
  }
};
