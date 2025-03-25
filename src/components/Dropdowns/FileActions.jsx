import React, { useEffect, useRef, useState } from 'react';
// import editIcon from "../../images/dataroom/edit-icon.svg";
// import trashIcon from "../../images/dataroom/trash-icon.svg";
// import infoIcon from "../../images/dataroom/info.png";


const FileActions = ({ file, setFileToEdit, setFileToDelete, setFileToView, setShowEditFileModal, setShowDeleteFileModal, selectedFileIndex, setSelectedFileIndex, viewItemDetailsFn }) => {
    const popupRef = useRef();
console.log(setFileToView);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setSelectedFileIndex(null);
            }
        };
        if (selectedFileIndex) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [selectedFileIndex]);

    return (

        <div className="">
            <div className="bg-white border-2 border-bordergray rounded-lg" ref={popupRef}>
                <div className="flex flex-col">

                    <div
                        className="flex border-b-2 p-1 border-bordergray cursor-pointer"
                        onClick={() => {
                            setFileToEdit(file);
                            setShowEditFileModal(true)
                            setSelectedFileIndex(null)
                        }}
                    >
                        <img src={editIcon} alt="img" className="w-5 h-5 pl-2" />
                        <div className="w-full text-center">
                            <span className="text-sm px-6 font-medium whitespace-nowrap">Edit File</span>
                        </div>
                    </div>
                    <div
                        className="flex p-1 cursor-pointer  border-b-2 border-bordergray"
                        onClick={() => {
                            setFileToDelete(file)
                            setShowDeleteFileModal(true)
                            setSelectedFileIndex(null)
                        }}
                    >
                        <img src={trashIcon} alt="img" className="w-5 h-5 pl-2" />
                        <div className="w-full text-center">
                            <span className="text-sm text-[#E01313] px-6 font-medium">Delete</span>
                        </div>
                    </div>
                    <div
                        className="flex p-1 cursor-pointer"
                        onClick={() => {
                            setFileToView(file)
                            viewItemDetailsFn()
                            setSelectedFileIndex(null)
                        }}
                    >
                        <img src={infoIcon} alt="Info Icon" className="w-5 ml-1" />
                        <div className="w-full text-center">
                            <span className="text-sm pl-5 pr-6 font-medium">Details</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default FileActions;
