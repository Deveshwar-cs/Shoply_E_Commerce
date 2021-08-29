const User = require('../models/userModel');

exports.createOrUpdateUser = async (req, res) => {
  const { email, name, picture } = req.user;

  const user = await User.findOneAndUpdate(
    { email },
    { name: email.split('@')[0], picture },
    { new: true }
  );
  if (user) {
    console.log('USER UPDATED', user);
    res.status(200).json(user);
  } else {
    const newUser = await new User({
      email,
      name: email.split('@')[0],
      picture,
    }).save();
    console.log('USER CREATED', newUser);
    res.status(200).json(newUser);
  }
};

exports.currentUser = async (req, res) => {
  await User.findOne({ email: req.user.email }).exec((error, user) => {
    if (error) throw new Error(error);

    res.status(200).json(user);
  });
};
