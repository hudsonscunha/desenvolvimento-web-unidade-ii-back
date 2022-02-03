import cloudinary from 'cloudinary'

cloudinary.config({
    cloud_name: 'deqa6sbo0',
    api_key: '846482489654479',
    api_secret: 'PdXwsNhu4mSmQVY4pNE7WndQALM'
})

module.exports = async (file) => {
    try {
        const res = await cloudinary.uploader.upload(file)
        return res.secure_url
    } catch (error) {
        return error
    }
}