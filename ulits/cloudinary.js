import cloudinary from 'cloudinary';

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});

async function uploadFileToCloudinary(file) {
  try {
    const result = await cloudinary.v2.uploader.upload(file);
    console.log('File uploaded successfully:', result);
    // Do something with the uploaded file information
  } catch (error) {
    console.error('Error uploading file:', error);
    // Handle the error appropriately
  }
}

export default uploadFileToCloudinary;

const file = 'path/to/your/file.jpg';
uploadFileToCloudinary(file);
