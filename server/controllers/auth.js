const User = require('../models/user');

exports.createOrUpdateUser = async (req, res) => {
  const { email, name, picture } = req.user;
  console.log('AUTH createOrUpdateUser CONTROLLER', email, name, picture);

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
