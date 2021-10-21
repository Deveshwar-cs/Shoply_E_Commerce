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
  // check if intended – if we need to redirect to product page when user login
  const intended = history.location.state;
  if (intended) {
    history.push(intended.from);
  } else {
    if (user.role === 'admin') {
      history.push('/admin/dashboard');
    } else {
      history.push('/user/history');
    }
  }
};
