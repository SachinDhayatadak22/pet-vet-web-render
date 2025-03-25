import React, { useEffect, useRef, useState } from 'react';
// import editIcon from "../../images/dataroom/edit-icon.svg";
// import trashIcon from "../../images/dataroom/trash-icon.svg";

const FolderActions = ({ folder, editFolder, deleteFolder, selectedFolderIndex, setSelectedFolderIndex }) => {
    const popupRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setSelectedFolderIndex(null);
            }
        };
        if (selectedFolderIndex) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [selectedFolderIndex]);

    return (
        <div className="absolute">
            <div className="relative mx-2 top-2 right-4 bg-white border-2 border-bordergray rounded-lg" ref={popupRef}>
                <div className="flex flex-col">
                    <div
                        className="flex border-b-2 p-1 border-bordergray cursor-pointer"
                        onClick={() => {
                            editFolder(folder)
                            setSelectedFolderIndex(null)
                        }}
                    >
                        <img src={editIcon} alt="Edit Icon" className="w-5 h-5 pl-2" />
                        <div className="w-full text-center">
                            <span className="text-sm px-6 font-medium">Edit Folder</span>
                        </div>
                    </div>
                    <div
                        className="flex p-1 cursor-pointer"
                        onClick={() => {
                            deleteFolder(folder)
                            setSelectedFolderIndex(null)
                        }}
                    >
                        <img src={trashIcon} alt="Delete Icon" className="w-5 h-5 pl-2" />
                        <div className="w-full text-center">
                            <span className="text-sm text-[#E01313] px-6 font-medium">Delete</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FolderActions;
