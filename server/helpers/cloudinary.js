const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
    cloud_name : 'dznx0wch7',
    api_key : '943165657877711',
    api_secret : "4InzwjvrFEXxF6247dgxOZVX4Po",

});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
    const result = await cloudinary.uploader.upload(file, {
        resource_type : 'auto'
    })

    return result;
}

const upload = multer({storage});

module.exports = { upload, imageUploadUtil };