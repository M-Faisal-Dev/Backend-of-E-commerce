import cloudinary from 'cloudinary';

cloudinary.config({ 
  cloud_name: "dpvefempu", 
  api_key: '775619252319668', 
  api_secret: 'Z94IkNxRCQ2-Lzn1dxzwCtXbheM'
});

async function uploadFileToCloudinary(file) {
  try {
    const result = await cloudinary.v2.uploader.upload(file);
    const url = result.secure_url; 
   
    return {url}; 
  } catch (error) {
    console.error('Error uploading file:', error);
    // Handle the error appropriately
    throw error; // Rethrow the error if needed
  }
}

export default uploadFileToCloudinary;


