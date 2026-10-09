import User from '../models/userModel.js';

export const createOrUpdateUser = async (req, res) => {
  try {
    const { email, name, picture } = req.user;

    const user = await User.findOneAndUpdate(
      { email },
      { name, email, picture },
      { new: true, upsert: true },
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: 'Unable to create or update user',
      success: false,
    });
  }
};

export const currentUser = async (req, res) => {
  try {
    const user = await User.find({ email: req.user.email });
    if (!user) {
      res.status(400).json({
        message: 'User Not Found!',
      });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong!',
      error: error.message,
    });
  }
};
