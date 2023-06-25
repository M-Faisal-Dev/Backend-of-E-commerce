import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAMEE, 
  api_key: process.env.API_KEYY, 
  api_secret: process.env.API_SECRETT,
});

async function uploadFileToCloudinary(file) {
  try {
    const result = await cloudinary.v2.uploader.upload(file);
    const url = result.secure_url; 
    const asset_id = result.asset_id; 
    const public_id = result.public_id; 
   
    return { url, asset_id, public_id };

  } catch (error) {
    console.error('Error uploading file:', error);
    // Handle the error appropriately
    throw error; // Rethrow the error if needed
  }
}

async function deleteFileFromCloudinary(public_id) {
  try {
    const result = await cloudinary.v2.uploader.destroy(public_id);
    return result;

  } catch (error) {
    console.error('Error deleting file:', error);
    // Handle the error appropriately
    throw error; // Rethrow the error if needed
  }
}

export { uploadFileToCloudinary, deleteFileFromCloudinary };
