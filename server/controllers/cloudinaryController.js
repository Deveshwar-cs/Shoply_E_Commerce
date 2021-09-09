const cloudinary = require('cloudinary');

// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploadImages = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.body.image, {
      public_id: `${Date.now()}`, // public_id needs to be unique
      resource_type: 'auto', //jpeg, png
    });
    res.json({
      public_id: result.public_id,
      url: result.secure_url,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

exports.deleteImage = (req, res) => {
  const image_id = req.body.public_id;

  cloudinary.uploader.destroy(image_id, (error, result) => {
    if (error) return res.json({ success: false, error });
    res.json({ success: true });
  });
};
