import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import searchIcon from "../images/icon/search-icon.svg";
// import folderIconOrange from "../images/dataroom/folder-icon-orange.svg";
// import folderIconBlue from "../images/dataroom/folder-icon-blue.svg";
// import folderIconGreen from "../images/dataroom/folder-icon-green.svg";
// import plusIcon from "../images/dataroom/plus-icon.svg";
// import moreVertical from "../images/dataroom/more-vertical.svg";
import RecentDocumentsTable from '../components/Tables/RecentDocumentsTable';
import FileDetails from '../components/Modals/FileDetails';
import CreateEditFolderModal from '../components/Modals/CreateEditFolderModal';
import FolderActions from '../components/Dropdowns/FolderActions';
import DeleteFolderModal from '../components/Modals/DeleteFolderModal';
import { apiGET } from '../utils/apiHelper';
import { toast } from 'react-toastify';

const DataRoom = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [allFolders, setAllFolders] = useState(null);
  const [recentDocuments, setRecentDocuments] = useState(null);

  const [showCreateEditFolderModal, setShowCreateEditFolderModal] = useState(false);
  const [showDeleteFolderModal, setShowDeleteFolderModal] = useState(false);
  const [selectedFolderIndex, setSelectedFolderIndex] = useState(null);
  const [folderToEdit, setFolderToEdit] = useState(null);
  const [folderToDelete, setFolderToDelete] = useState(null);
  const [fileToView, setFileToView] = useState(null);

  const [showFileDetails, setShowFileDetails] = useState(false);

  const toggleFileDetailsPanel = () => {
    setShowFileDetails((prev) => !prev);
  };

  const editFolder = (folder) => {
    setFolderToEdit(folder);
    setShowCreateEditFolderModal(true);
  };

  const deleteFolder = (folder) => {
    setFolderToDelete(folder);
    setShowDeleteFolderModal(true);
  };

  const closeCreateEditModal = () => {
    setShowCreateEditFolderModal(false)
  }
  const closeDeleteModal = () => {
    setShowDeleteFolderModal(false)
  }

  const getAllFolders = async () => {
    setIsLoading(true);
    try {
      const response = await apiGET('/v1/folder/all');
      console.log(response);

      if (response.status === 200) {
        setAllFolders(response.data.data);
      } else {
        // toast.error("Failed to fetch all folders !");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getRecentDocuments = async () => {
      setIsLoading(true);
      try {
          const response = await apiGET(`/v1/document/recent`);

          if (response.status === 200) {
              setRecentDocuments(response.data.data);
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
    getAllFolders();
    getRecentDocuments();
  }, []);

  useEffect(() => {
    if (isLoading) {
      return <Loader />
    }
  }, []);


  return (
    <div className="m-3 lg:ml-0 bg-primary rounded-lg">
      <div className="flex flex-col gap-4 text-textcolor bg-primary rounded-lg">
        <div className="flex flex-col gap-4">
          {/* Search Input */}
          <div className="flex items-center min-w-full">
            <input type="text" placeholder="Search" className="w-full bg-layerWhite rounded-2xl py-2 pl-10 pr-4 placeholder:text-textcolor border border-transparent focus:border-2 focus:border-secondary outline-none" />
            <img className="absolute left-3 w-4 h-4 text-textcolor" src={searchIcon} alt="Search icon" />
          </div>

          {/* Folder Creation & List */}
          <div className="bg-white p-4 pb-1 rounded-2xl">
            <div className="w-[100%] flex gap-4">
              <div className="w-[100%]">
                <span className="text-textcolor font-semibold text-xl">Data Room For SDLC Corp</span>

                {/* Folder List */}
                <div className="flex gap-8 flex-wrap mt-10">
                  {allFolders && allFolders.map((folder, index) => (
                    <div key={index} className="p-5 border-2 rounded-lg border-bordergray transition-all hover:border-secondary"                    >
                      <div className={`bg-[#FFEBEB] px-12 py-8 rounded-lg cursor-pointer`}
                        onClick={() => {
                          navigate(`/data-room/${folder.name.replace(/\s+/g, "")}`, {
                            state: { folderId: folder.id, folderName: folder.name },
                          });
                        }}
                      >
                        <img src={folderIconOrange} className="w-10 h-10" alt="img" />
                      </div>
                      <div className="flex justify-between mt-4">
                        <span className="text-sm font-medium">{folder.name}</span>
                        <img src={moreVertical} alt="img" className="cursor-pointer"
                          onClick={() =>
                            setSelectedFolderIndex(selectedFolderIndex === index ? null : index)
                          }
                        />
                      </div>
                      {selectedFolderIndex === index && (
                        <FolderActions
                          folder={folder}
                          editFolder={editFolder}
                          deleteFolder={deleteFolder}
                          selectedFolderIndex={selectedFolderIndex}
                          setSelectedFolderIndex={setSelectedFolderIndex}
                        />
                      )}
                    </div>
                  ))}

                  {/* Create New Folder Button */}
                  <div className="py-2 border-2 flex justify-center rounded-lg border-bordergray transition-all hover:border-secondary"
                    onClick={() => {
                      setFolderToEdit(null);
                      setShowCreateEditFolderModal(true);
                    }}
                  >
                    <div className="flex flex-col py-8 px-2 justify-center items-center cursor-pointer">
                      <div className="p-4 rounded-lg">
                        <img src={plusIcon} className="w-10 h-10" alt="Plus Icon" />
                      </div>
                      <div className='px-7'>
                        <span className='text-sm font-medium'>Create Folder</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Documents Table */}
                <RecentDocumentsTable refreshFiles={getRecentDocuments} recentDocuments={recentDocuments} setFileToView={setFileToView} toggleFileDetailsPanel={toggleFileDetailsPanel} />

                {/* Create/Edit Folder Modal */}
                {showCreateEditFolderModal && (
                  <CreateEditFolderModal
                    allFolders={allFolders}
                    refreshFolders={getAllFolders}
                    selectedFolder={folderToEdit}
                    isOpen={showCreateEditFolderModal}
                    closeModal={closeCreateEditModal}
                  />
                )}

                {/* Delete Folder Modal */}
                {showDeleteFolderModal && (
                  <DeleteFolderModal
                    refreshFolders={getAllFolders}
                    selectedFolder={folderToDelete}
                    isOpen={showDeleteFolderModal}
                    closeModal={closeDeleteModal}
                  />
                )}
              </div>

              {/* File Details Panel */}
              {showFileDetails && (
                <div className="bg-white w-60">
                  <FileDetails fileToView={fileToView} setShowFileDetails={setShowFileDetails} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataRoom;


// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import searchIcon from "../images/icon/search-icon.svg";
// import folderIconOrange from "../images/dataroom/folder-icon-orange.svg";
// import plusIcon from "../images/dataroom/plus-icon.svg";
// import moreVertical from "../images/dataroom/more-vertical.svg";
// import RecentDocumentsTable from '../components/Tables/RecentDocumentsTable';
// import FileDetails from '../components/Modals/FileDetails';
// import CreateEditFolderModal from '../components/Modals/CreateEditFolderModal';
// import { apiGET } from '../utils/apiHelper';
// import toast from 'react-hot-toast';
// import Loader from '../common/Loader';

// const DataRoom = () => {
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);
//   const [allFolders, setAllFolders] = useState([]);
//   const [showCreateEditFolderModal, setShowCreateEditFolderModal] = useState(false);
//   const [showFileDetails, setShowFileDetails] = useState(false);
//   const [folderToEditId, setFolderToEditId] = useState(null);
// console.log(folderToEditId);

//   const getAllFolders = async () => {
//     setIsLoading(true);
//     try {
//       const response = await apiGET('/v1/folder/all');
//       if (response.status === 200) {
//         setAllFolders(response.data.data);
//       } else {
//         toast.error("Failed to fetch all folders!");
//       }
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {

//     getAllFolders();
//   }, []);

//   useEffect(() => {
//     if (isLoading) {
//       return <Loader />
//     }
//   }, []);

//   return (
//     <div className="m-3 lg:ml-0 bg-primary rounded-lg">
//       <div className="flex flex-col gap-4 text-textcolor bg-primary rounded-lg">
//         <div className="flex items-center min-w-full">
//           <input
//             type="text"
//             placeholder="Search"
//             className="w-full bg-layerWhite rounded-2xl py-2 pl-10 pr-4 placeholder:text-textcolor border border-transparent focus:border-2 focus:border-secondary outline-none"
//           />
//           <img className="absolute left-3 w-4 h-4 text-textcolor" src={searchIcon} alt="Search icon" />
//         </div>

//         <div className="bg-white p-4 pb-1 rounded-2xl">
//           <div className="flex gap-8 flex-wrap mt-10">
//             {allFolders.map((folder, index) => (
//               <div key={index} className="p-5 border-2 rounded-lg border-bordergray transition-all hover:border-secondary">
//                 <div
//                   className="bg-[#FFEBEB] px-12 py-8 rounded-lg cursor-pointer"
//                   onClick={() =>
//                     navigate(`/data-room/${folder.name.replace(/\s+/g, "")}`, {
//                       state: { folderId: folder._id, folderName: folder.name },
//                     })
//                   }
//                 >
//                   <img src={folderIconOrange} className="w-10 h-10" alt="Folder Icon" />
//                 </div>
//                 <div className="flex justify-between mt-4">
//                   <span className="text-sm font-medium">{folder.name}</span>
//                   <img src={moreVertical} alt="More Options" className="cursor-pointer"
//                     onClick={() => {
//                       setFolderToEditId(folder._id); // Set the folder ID for editing
//                       setShowCreateEditFolderModal(true); // Show the modal
//                     }                    }
//                   />
//                 </div>
//               </div>
//             ))}

//             <div
//               className="py-2 border-2 flex justify-center rounded-lg border-bordergray transition-all hover:border-secondary"
//               onClick={() => setShowCreateEditFolderModal(true)}
//             >
//               <div className="flex flex-col py-8 px-2 justify-center items-center cursor-pointer">
//                 <img src={plusIcon} className="w-10 h-10" alt="Plus Icon" />
//                 <span className="text-sm font-medium">Create Folder</span>
//               </div>
//             </div>
//           </div>

//           <RecentDocumentsTable toggleFileDetailsPanel={() => setShowFileDetails((prev) => !prev)} />

//           {showCreateEditFolderModal && (
//             <CreateEditFolderModal
//               isOpen={showCreateEditFolderModal}
//               folderToEditId={folderToEditId}
//               closeModal={() => setShowCreateEditFolderModal(false)}
//               refreshFolders={getAllFolders}
//             />
//           )}

//           {showFileDetails && (
//             <div className="bg-white w-60">
//               <FileDetails setShowFileDetails={setShowFileDetails} />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DataRoom;

