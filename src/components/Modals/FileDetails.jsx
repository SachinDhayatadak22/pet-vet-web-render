import React, { useEffect, useState } from 'react'
// import crossIcon from "../../images/dataroom/fileDetails/cross-icon.svg";
// import pdfIcon from "../../images/dataroom/fileDetails/pdf-icon.svg";
// import linkIcon from "../../images/dataroom/fileDetails/link-icon.svg";
// import shareIcon from "../../images/dataroom/fileDetails/share-icon.svg";
// import trashIcon from "../../images/dataroom/fileDetails/trash-icon.svg";
import { apiGET } from '../../utils/apiHelper';

const FileDetails = ({ setShowFileDetails, fileToView }) => {
console.log(fileToView);

    const [fileData, setFileData] = useState(null);

    const getFileDetails = async () => {
        try {
            const response = await apiGET(`/v1/document/${fileToView.id}`);
            console.log(response);
            
            if (response.status == 200) {
                setFileData(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching file details:", error.message);
        }
    };

    useEffect(() => {
        getFileDetails();
    }, []);
    

    return (
        <div className='border-2 border-primary my-1 p-4 rounded-xl flex flex-col justify-between'>
        <div>
            <div className='flex justify-between'>
                <h2 className='font-medium'>File Details</h2>
                <img
                    onClick={() => setShowFileDetails(false)}
                    className='cursor-pointer'
                    src={crossIcon}
                    alt="Close"
                />
            </div>
            <div className='border-2 border-secondary rounded-xl mt-4'>
                <div className='px-10 py-4 bg-[#EBF2FF] rounded-xl m-2'>
                    <img className='p-2' src={pdfIcon} alt="File Type Icon" />
                </div>
            </div>

            {fileData ? (
                <div className='flex flex-col gap-2 my-4'>
                    <div className='flex flex-col'>
                        <span className='text-sm'>Name</span>
                        <span className='text-xs text-textgray'>{fileData.name}</span>
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-sm'>Type</span>
                        <span className='text-xs text-textgray'>{fileData.type}</span>
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-sm'>Size</span>
                        <span className='text-xs text-textgray'>{fileData?.size ? Number(fileData?.size)?.toFixed(2) +" MB" :"" }</span> {/* Assuming size is static */}
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-sm'>Owner</span>
                        <span className='text-xs text-textgray'>Me</span> {/* Assuming static */}
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-sm'>Created</span>
                        <span className='text-xs text-textgray'>
                            {new Date(fileData.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-sm'>Edited</span>
                        <span className='text-xs text-textgray'>
                            {new Date(fileData.updatedAt).toLocaleDateString()}
                        </span>
                    </div>
                    {/* <div className='flex flex-col'>
                        <span className='text-sm'>Shared</span>
                        <span className='text-xs text-textgray'>{fileData.shared}</span>
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-sm'>Download</span>
                        <a
                            href={fileData.url}
                            className='text-xs text-primary underline'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            Click here to download
                        </a>
                    </div> */}
                </div>
            ) : (
                <p className='text-textgray'>Loading file details...</p>
            )}
        </div>
        <div className='flex justify-center gap-4 mt-28'>
            <div className='bg-primary rounded-lg p-2'>
                <img src={linkIcon} alt="Link" />
            </div>
            <div className='bg-primary rounded-lg p-2'>
                <img src={shareIcon} alt="Share" />
            </div>
            <div className='bg-primary rounded-lg p-2'>
                <img src={trashIcon} alt="Delete" />
            </div>
        </div>
    </div>
    )
}

export default FileDetails