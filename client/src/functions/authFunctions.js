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

export const roleBasedRedirect = (user, navigate, location) => {
  // Check if there is an intended page to return to after login
  const intended = location?.state;

  if (intended?.from) {
    navigate(intended.from);
  } else {
    if (user.role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/user/history');
    }
  }
};
