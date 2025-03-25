import uploadIcon from "../../images/icon/upload.svg";
import {useState} from "react";

const FileUpload = ({ title, onFileSelect, error }) => {
  const [image, setImage] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        onFileSelect(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h2 className="text-[18px] text-black font-medium">{title}</h2>
      <label className="mt-[5px] p-[12px] relative flex flex-col items-center justify-center w-full h-64 border-2 border-gray-200 border-dashed rounded-xl bg-white cursor-pointer">
        <input
          type="file"
          accept="image/*"
          className="peer hidden"
          onChange={handleFileChange}
        />
        {error && <p className="text-red-500">{error}</p>}
        {image ? (
          <img
            src={image}
            alt="Uploaded"
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
        ) : (
          <>
            <img src={uploadIcon} alt="Upload Icon" />
            <p className="text-gray-300 mt-2 peer-hover:text-gray-400 transition">
              JPG, PNG, SVG, PDF
            </p>
          </>
        )}
      </label>
    </div>
  );
};

export default FileUpload;
