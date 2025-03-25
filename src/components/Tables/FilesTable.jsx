import React, { useState } from 'react'
import TableProvider from './TableProvider';
// import columnView from '../../images/dataroom/table/column-view.svg';
// import columnViewInverted from '../../images/dataroom/table/column-view-inverted.svg';
// import filterIcon from '../../images/dataroom/table/filter-icon.svg';
// import moreVertical from '../../images/dataroom/table/more-vertical.svg';
// import rowView from '../../images/dataroom/table/row-view.svg';
// import rowViewInverted from '../../images/dataroom/table/row-view-inverted.svg';
import GridProvider from './GridProvider';


const columnNames = [
    { name: "File Name", indexCol: true },
    { name: "File Size" },
    { name: "Shared With" },
    { name: "Action", actionColumn: true }
]

const FilesTable = ({ folderId, allDocuments, viewItemDetailsFn, refreshFiles, setFileToView }) => {
    const [viewMode, setViewMode] = useState("table");
    console.log(folderId);

    return (
        <div>
            <div className='bg-white rounded-xl p-4'>
                <div className='flex justify-between mt-8 text-textcolor'>
                    <h2 className='font-semibold'>Files</h2>
                    <div className='flex justify-between items-center gap-4'>
                        <div className='flex'>
                            <input
                                type="text"
                                placeholder="Search"
                                className="px-4 py-1  rounded-full border-2 border-primary focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                            />
                        </div>
                        <div>
                            <div className='flex gap-2'>
                                <img onClick={() => setViewMode("table")} className='bg-primary p-1 rounded-lg cursor-pointer' src={viewMode === "table" ? rowView : rowViewInverted} alt="img" />
                                <img onClick={() => setViewMode("grid")} className='bg-primary p-1 rounded-lg cursor-pointer' src={viewMode === "grid" ? columnViewInverted : columnView} alt="img" />
                                <img className='bg-primary p-1 rounded-lg' src={filterIcon} alt="img" />
                                <img className='bg-primary p-1 rounded-lg' src={moreVertical} alt="img" />
                            </div>
                        </div>
                    </div>
                </div>
                {
                    viewMode === "table" && <TableProvider columnNames={columnNames} tableData={allDocuments} viewItemDetailsFn={viewItemDetailsFn} refreshFiles={refreshFiles} setFileToView={setFileToView} />
                }
                {
                    viewMode === "grid" && <GridProvider tableData={allDocuments} viewItemDetailsFn={viewItemDetailsFn} refreshFiles={refreshFiles} setFileToView={setFileToView}/>
                }
            </div>
        </div>
    )
}

export default FilesTable