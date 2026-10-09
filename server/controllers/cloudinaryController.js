import { v2 as cloudinary } from 'cloudinary';

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload image
export const uploadImages = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.body.image, {
      public_id: `${Date.now()}`,
      resource_type: 'auto',
    });

    res.status(200).json({
      public_id: result.public_id,
      url: result.secure_url,
    });
  } catch (error) {
    console.error('Cloudinary upload error:', error);

    res.status(500).json({
      error: error.message,
    });
  }
};

// Delete image
export const deleteImage = async (req, res) => {
  try {
    const { public_id } = req.body;

    const result = await cloudinary.uploader.destroy(public_id);

    res.status(200).json(result);
  } catch (error) {
    console.error('Cloudinary delete error:', error);

    res.status(500).json({
      error: error.message,
    });
  }
};
