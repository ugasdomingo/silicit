//Import tools
import { v2 as cloudinary } from 'cloudinary';

//Config
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
});

//Upload image to silicit/services
export const upload_services_cover = async (file: any) => {
    try {
        const result = await cloudinary.uploader.upload(file, {
            folder: 'silicit/services',
        });
        return result;
    } catch (error) {
        console.log(error);
    }
};

//Upload image to silicit/payment
export const upload_payment_proof = async (file: any) => {
    try {
        const result = await cloudinary.uploader.upload(file, {
            folder: 'silicit/payment',
        });
        return result;
    } catch (error) {
        console.log(error);
    }
};

//Delete image
export const delete_image = async (public_id: string) => {
    try {
        const result = await cloudinary.uploader.destroy(public_id);
        return result;
    } catch (error) {
        console.log(error);
    }
};
