import React, { useState } from 'react'
// import pdfIcon from '../../images/dataroom/fileDetails/pdf-icon.svg'
// import moreVertical from '../../images/dataroom/more-vertical.svg'
import FileActions from '../Dropdowns/FileActions'
import EditFileNameModal from '../Modals/EditFileNameModal'
import DeleteFileModal from '../Modals/DeleteFileModal'

const GridProvider = ({ tableData, viewItemDetailsFn, setFileToView, refreshFiles }) => {
    const [selectedFileIndex, setSelectedFileIndex] = useState(null)
    const [showEditFileModal, setShowEditFileModal] = useState(false);
    const [showDeleteFileModal, setShowDeleteFileModal] = useState(false);
    const [fileToEdit, setFileToEdit] = useState(null);
    const [fileToDelete, setFileToDelete] = useState(null);
console.log(setFileToView);

    return (
        <div>
            <div>
                <div className="overflow-x-auto my-4">
                    <div className="flex flex-wrap gap-3">
                        {
                            tableData && tableData.map((file, index) => {
                                return <>
                                    <div key={index} className='border-2 border-bordergray p-3 rounded-xl'>
                                        <div className='flex justify-center py-8 px-15 rounded-lg bg-[#EBF2FF]'>
                                            <img src={pdfIcon} alt="img" />
                                        </div>
                                        <div className='flex justify-between items-center mt-4'>
                                            <div className='flex flex-col'>
                                                <div className="relative group">
                                                    <p className="font-medium">{file.name.length >= 16 ? file.name.substring(0, 16) + "..." : file.name}</p>
                                                    {
                                                        file.name.length >= 16 &&
                                                        <div className="absolute bg-white mb-1 whitespace-nowrap bottom-full hidden group-hover:block text-sm  border border-bordergray shadow px-4 py-2 rounded-lg">
                                                            {file.name}
                                                        </div>
                                                    }
                                                </div>
                                                <span className='text-xs'>{file.type}</span>
                                            </div>
                                            <div>
                                                <img
                                                    onClick={() => {
                                                        setSelectedFileIndex(selectedFileIndex === index ? null : index)
                                                    }}
                                                    className='cursor-pointer'
                                                    src={moreVertical} alt="img" />
                                            </div>
                                            {selectedFileIndex === index &&
                                                <div className="absolute">
                                                    <div className="relative mx-2 left-39 bottom-17 ">
                                                        <FileActions
                                                            file={file}
                                                            setFileToEdit={setFileToEdit}
                                                            setFileToDelete={setFileToDelete}
                                                            setFileToView={setFileToView}
                                                            setShowEditFileModal={setShowEditFileModal}
                                                            setShowDeleteFileModal={setShowDeleteFileModal}
                                                            viewItemDetailsFn={viewItemDetailsFn}
                                                            selectedFileIndex={selectedFileIndex}
                                                            setSelectedFileIndex={setSelectedFileIndex}
                                                        />
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </>
                            })
                        }
                    </div>
                </div>
            </div>
            {
                showEditFileModal &&
                <EditFileNameModal file={fileToEdit} isOpen={showEditFileModal} closeModal={setShowEditFileModal} refreshFiles={refreshFiles} />
            }
            {
                showDeleteFileModal &&
                <DeleteFileModal file={fileToDelete} isOpen={showDeleteFileModal} closeModal={setShowDeleteFileModal} refreshFiles={refreshFiles} />
            }
        </div>
    )
}

export default GridProvider