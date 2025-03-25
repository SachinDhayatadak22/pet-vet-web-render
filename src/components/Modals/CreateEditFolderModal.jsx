import React, { useState, useEffect, useRef } from 'react';
// import folderIconGreen from "../../images/dataroom/folder-icon-green.svg";
// import crossIcon from "../../images/dataroom/fileDetails/cross-icon.svg";
import { toast } from 'react-toastify';
import { apiPOST, apiPUT } from '../../utils/apiHelper';

const CreateEditFolderModal = ({ allFolders, isOpen, closeModal, refreshFolders, selectedFolder }) => {
  console.log(selectedFolder?.id);
  
  const [folderName, setFolderName] = useState('');
  const modalRef = useRef();

  useEffect(() => {
    if (selectedFolder) {
      setFolderName(selectedFolder.name);
    } else {
      setFolderName('');
    }
  }, [selectedFolder]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedName = folderName.trim() || "New Folder";

    let uniqueName = trimmedName;
    let count = 2;
    
    while (allFolders && allFolders?.some((folder) => folder.name === uniqueName)) {
      uniqueName = `${trimmedName} (${count++})`;
    }
    
    try {
      if (selectedFolder?.id) {
        const response =  await apiPUT(`/v1/folder/update/${selectedFolder?.id}`, { name: uniqueName });
        console.log(response);
        if (response.status === 201) {
          toast.success("Folder updated successfully");
        } else {
          toast.error("Failed to update folder")
        }
      } else {
        const response = await apiPOST('/v1/folder/add', { name: uniqueName });
        console.log(response);
        if (response.status === 201) {
          toast.success("Folder created successfully");
        } else {
          toast.error("Failed to add folder")
        }
      }
      refreshFolders();
      closeModal();
    } catch (error) {
      console.log(error);
      toast.error("Error while saving the folder!");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, closeModal]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex z-999 items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-80 shadow-lg" ref={modalRef}>
        <div className='flex justify-between items-center mb-4'>
          <h2 className="text-lg font-semibold text-gray-800">
            {selectedFolder ? 'Edit Folder' : 'Create Folder'}
          </h2>
          <img
            src={crossIcon}
            alt="Close Icon"
            className="w-5 h-5 cursor-pointer"
            onClick={() => closeModal()}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <input
            className="w-full border-2 border-primary rounded-lg py-2 px-4 mb-4 focus:outline-none focus:ring-2 focus:ring-secondary"
            type="text"
            placeholder="Folder Name"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <button
              className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg"
              type="button"
              onClick={() => closeModal()}
            >
              Cancel
            </button>
            <button
              className="bg-secondary text-white py-2 px-4 rounded-lg"
              type="submit"
            >
              {selectedFolder ? 'Update Folder' : 'Create Folder'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEditFolderModal;