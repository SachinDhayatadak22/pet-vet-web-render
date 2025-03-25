import React, { useEffect, useState } from 'react'
// import searchIcon from "../images/icon/search-icon.svg";
// import uploadToCloud from "../images/dataroom/upload-to-cloud.svg";
// import previousPageIcon from "../images/dataroom/previous-page.svg";
// import chevronRightIcon from "../images/dataroom/chevron-right.svg";
import FilesTable from '../components/Tables/FilesTable';
import FileDetails from '../components/Modals/FileDetails';
import { useLocation, useNavigate } from 'react-router-dom';
import DocumentUploadDrop from '../components/imageuploader/docUpload';
import { apiGET } from '../utils/apiHelper';
import Loader from '../common/Loader';

const Folder = () => {
  const location = useLocation();
  const { folderId, folderName } = location.state || {};
  const [fileToView, setFileToView] = useState(null);
  const [showFileDetails, setShowFileDetails] = useState(false);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [allDocuments, setAllDocuments] = useState(null);
  console.log(allDocuments);

  const toggleFileDetailsPanel = () => {
    if (showFileDetails) {
      setShowFileDetails(false);
    } else {
      setShowFileDetails(true);
    }
  }

  const getAllDocuments = async () => {
    setIsLoading(true);
    try {
        const response = await apiGET(`/v1/document/all/${folderId}`);
        console.log(response);

        if (response.status === 200) {
            setAllDocuments(response.data.data);
        } else {
            // toast.error("Failed to fetch all folders !");
        }
    } catch (error) {
        console.log(error);
    } finally {
        setIsLoading(false);
    }
};

useEffect(() => {
    getAllDocuments();
}, []);

useEffect(() => {
    if (isLoading) {
        return <Loader />
    }
}, []);

  return (
    <div>
      <div className="m-3 lg:ml-0 bg-primary rounded-lg text-textcolor">
        <div className="flex flex-col gap-4 text-textcolor bg-primary rounded-lg ">
          <div className="flex flex-col gap-4">
            <div className=" flex items-center min-w-full">
              <input
                className="w-full bg-layerWhite rounded-2xl py-2 pl-10 pr-4 placeholder:text-textcolor border border-transparent focus:border-2 focus:border-secondary outline-none"
                type="text"
                placeholder="Search"
              />
              <img
                className="absolute left-3 w-4 h-4 text-textcolor"
                src={searchIcon}
                alt="Search icon"
              />
            </div>
          </div>
        </div>
        <div>
          <div className='flex gap-2 my-3'>
            <div className='flex gap-2 cursor-pointer' onClick={() => navigate("/data-room")}>
              <img src={previousPageIcon} alt="img" />
              <span className=' text-secondary font-semibold'>Data Room</span>
            </div>
            <div className='flex gap-2'>
              <img src={chevronRightIcon} alt="img" />
              <span className=' font-semibold'>{folderName}</span>
            </div>
          </div>
        </div>
        <div >
          <div className='bg-white rounded-xl p-6 mb-4'>
            <DocumentUploadDrop folderId={folderId} refreshFiles={getAllDocuments}/>
            {/* <div className='flex flex-col gap-4 items-center mt-2'>
                            <div>
                                <img src={uploadToCloud} alt="img" />
                            </div>
                            <div>
                                <span className='text-secondary font-medium'>Click Here </span>
                                <span className='font-medium'> to upload your files or drag </span>
                            </div>
                            <div>
                                <span>Max file size : (25MB each)</span>
                            </div>
                </div> */}
          </div>
        </div>
        <div className='w-full flex'>
          <div className='w-full flex bg-white rounded-xl'>
            <div className='w-full '>

              <FilesTable refreshFiles={getAllDocuments} setFileToView={setFileToView} folderId={folderId} allDocuments={allDocuments} viewItemDetailsFn={toggleFileDetailsPanel} />
            </div>
            {showFileDetails && (
              <div className="bg-white w-60 p-2 pl-0 rounded-xl">
                <FileDetails fileToView={fileToView} setShowFileDetails={setShowFileDetails} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Folder