import React, { useState, useEffect, useRef } from 'react';
// import crossIcon from "../../images/dataroom/fileDetails/cross-icon.svg";
import { toast } from 'react-toastify';
import { apiPUT } from '../../utils/apiHelper';

const EditFileNameModal = ({ file, isOpen, closeModal, refreshFiles }) => {
  const [fileName, setFileName] = useState('');
  const modalRef = useRef();
  console.log(file);

  useEffect(() => {
    if (file) {
      setFileName(file.name);
    } else {
      setFileName('');
    }
  }, [file]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedName = fileName.trim() || "New File";

    try {
      if (file?.id) {
        const response = await apiPUT(`/v1/document/update/${file.id}`,
          {
            name: trimmedName,
            url: file.url,
            type: file.type,
            folderId: file.folderId,
            shared: file.shared,
          }
        );
        console.log(response);
        if (response.status === 201) {
          toast.success("File name updated successfully");
        } else {
          toast.error("Failed to update file name");
        }
        refreshFiles();
        closeModal();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while updating the file name!");
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
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-999">
        <div className="bg-white rounded-lg p-6 w-80 shadow-lg" ref={modalRef}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Edit File Name</h2>
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
              placeholder="File Name"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
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
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default EditFileNameModal;
