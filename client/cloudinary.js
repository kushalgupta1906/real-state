// import { v2 as cloudinary } from 'cloudinary';
// import fs from 'fs'

//    export const uploadOnCloudinary=async(file)=>{
//         cloudinary.config({ 
//             cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//             api_key: process.env.CLOUDINARY_API_KEY, 
//             api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
//         });
//     // Configuration
//    try {
//     const uploadResult = await cloudinary.uploader.upload(file,
//         {resource_type:"auto"})
//         //console.log(uploadResult)
//         fs.unlinkSync(file);
//         //return uploadResult
//    } catch (error) {
//     fs.unlinkSync(file);
//     //return null;
//    }
// }