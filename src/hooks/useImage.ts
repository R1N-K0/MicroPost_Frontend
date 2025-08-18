import axios from "axios"
import { ChangeEvent, useState } from "react"

const UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET as string
const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME as string

export const useImage = () => {
    const [image, setImage] = useState<File | null>(null)
    const [preview ,setPreview] = useState<string>("")
    const [uploadedImage, setUploadedImage] = useState("");

    const handleChooseImage = (e: ChangeEvent<HTMLInputElement>) => {
        if(!e.target.files || e.target.files.length == 0)
            return alert("Failed to choose image")

        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file))
        console.log("set Preview")
    };

    const handleUploadImage = async () => {
        try{
            const data = new FormData();
            if(!image) return;
            data.append("file", image)
            data.append("upload_preset", UPLOAD_PRESET)
            data.append("cloud_name", CLOUD_NAME)

            const res = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, data)

            setUploadedImage(res.data.secure_url);
            setImage(null)
            alert("Succeeded in image upload");
            } catch (error) {
                alert("Failed to image upload");
            }
        }

    return {image, setImage, uploadedImage, setUploadedImage, handleChooseImage, handleUploadImage, preview, setPreview}
}
