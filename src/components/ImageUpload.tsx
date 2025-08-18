import { useImage } from "../hooks/useImage"

export default function ImageUpload() {
    const {image, uploadedImage,  handleChooseImage, handleUploadImage,preview } = useImage()
    
    return (
        <>
            <div>
                <h2>Image Upload</h2>
                <input type="file" onChange={handleChooseImage} />
                <button onClick={handleUploadImage} disabled={!image}>
                    Image Upload
                </button>
                <hr />
                <h3>Chosen Image</h3>
                {preview ? <img src={preview} alt="chosen" /> : <p>No Image Chosen</p>}
                <hr />
                <h3>Uploaded Image</h3>
                <p>{uploadedImage || "No Image Uploaded"}</p>
            </div>
        </>
    )
}