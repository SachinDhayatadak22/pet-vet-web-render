import React, { useState, useEffect, useRef } from 'react';
// import crossIcon from "../../images/dataroom/fileDetails/cross-icon.svg";
import { apiDELETE } from '../../utils/apiHelper';
import { toast } from 'react-toastify';

const DeleteFolderModal = ({ isOpen, closeModal, selectedFolder, refreshFolders }) => {
  const modalRef = useRef();

  const deleteFolder = async (selectedFolder) => {
    try {
      const response = await apiDELETE(`/v1/folder/delete/${selectedFolder?.id}`,);
      console.log(response);
      if (response.status) {
        toast.success("Folder deleted successfully");
      } else {
        toast.error("Failed to delete folder")
      }
      refreshFolders();
      closeModal();
    } catch (error) {
      console.log(error);
      toast.error("Error while deleting the folder!");
    }

    closeModal();
    refreshFolders();
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
            Delete Folder
          </h2>
          <img
            src={crossIcon}
            alt="Close Icon"
            className="w-5 h-5 cursor-pointer"
            onClick={() => closeModal()}
          />
        </div>
        <div>
          <span>Are you sure you want to delete this folder ?</span>
        </div>
        <div className="flex justify-end gap-2">
          <button
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg"
            type="button"
            onClick={() => closeModal()}
          >
            Cancel
          </button>
          <button
            className="bg-[#E01313] text-white px-4 rounded-lg"
            onClick={() => deleteFolder(selectedFolder)}
          >
            Delete Folder
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteFolderModal;
