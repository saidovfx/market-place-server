import cloudinary from 'cloudinary'
cloudinary.v2
import ENV from '../lib/ENV.js'

cloudinary.config({
    cloud_name:ENV.CLOUDINARY_CLOUD_NAME,
    api_key:ENV.CLOUDINARY_API_KEY,
    api_secret:ENV.CLOUDINARY_API_SECRET
})

export default cloudinary