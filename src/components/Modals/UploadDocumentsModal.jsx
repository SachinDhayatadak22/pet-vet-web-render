import React, { useState } from 'react';
// import uploadToCloud from "../../images/dataroom/upload-to-cloud.svg";
import DocumentUploadDrop from '../imageuploader/docUpload';

const UploadDocumentsModal = ({ isVisible, onClose }) => {
    const [fileList, setFileList] = useState([]);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setFileList(files);
    };

    const handleUpload = () => {
        // Handle file upload logic here
        console.log('Files uploaded:', fileList);
        onClose();
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white text-textcolor rounded-lg p-6 w-full max-w-md shadow-lg">
                <div className="flex justify-between items-center pb-2 mb-4">
                    <h2 className="text-xl text-textcolor font-semibold">Upload Documents</h2>
                    <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={onClose}
                    >
                        &times;
                    </button>
                </div>

                <div className='mt-2'>
                    <div>
                        <DocumentUploadDrop/>
                    </div>
                   
                </div>


                <div className="flex justify-end space-x-3 mt-4">
                    <button
                        className="bg-[#F0F0F0] text-textcolor px-4 py-2 text-sm rounded"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-secondary text-textsecondary px-4 py-2 rounded "
                        onClick={handleUpload}
                    >
                        Upload
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UploadDocumentsModal;