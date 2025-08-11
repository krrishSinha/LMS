import { v2 as cloudinary } from 'cloudinary';

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


export const uploadToCloudinary = async (image: any, folderName: any) => {

    try {

        const result = await cloudinary.uploader.upload(image, {
            folder: folderName,
        });

        console.log(result);
        return result

    } catch (error) {
        console.log('error in uploading image to cloudinary');
        return error
    }
};


export const destroyImageFromCloudinary = async (publicId:any) => {
    try {

        const result = await cloudinary.uploader.destroy(publicId);

        console.log(result);
        return result

    } catch (error) {
        console.log('error in Destroy image from cloudinary');
        return error
    }
}