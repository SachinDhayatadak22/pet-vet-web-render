import React, { useEffect, useState } from 'react'
// import columnView from '../../images/dataroom/table/column-view.svg';
// import columnViewInverted from '../../images/dataroom/table/column-view-inverted.svg';
// import filterIcon from '../../images/dataroom/table/filter-icon.svg';
// import moreVertical from '../../images/dataroom/table/more-vertical.svg';
// import rowView from '../../images/dataroom/table/row-view.svg';
// import rowViewInverted from '../../images/dataroom/table/row-view-inverted.svg';

import TableProvider from './TableProvider';
import GridProvider from './GridProvider';

const columnNames = [
    { name: "File Name", indexCol: true },
    { name: "File Size" },
    { name: "Shared With" },
    { name: "Action", actionColumn: true }
]

const files = [
    { id: 1, name: "Breske volume1 pdf", type: "Kyc Business", size: "3.1 Gb" },
    { id: 2, name: "Breske volume2 pdf", type: "Kyc Business", size: "3.2 Gb" },
    { id: 3, name: "Breske volume3 pdf", type: "Kyc Business", size: "3.3 Gb" },
    { id: 4, name: "Breske volume4 pdf", type: "Kyc Business", size: "3.4 Gb" },
    { id: 5, name: "Breske volume5 pdf", type: "Kyc Business", size: "3.5 Gb" },
    { id: 6, name: "Breske volume6 pdf", type: "Kyc Business", size: "3.6 Gb" },
    { id: 7, name: "Breske volume7 pdf", type: "Kyc Business", size: "3.7 Gb" },
    { id: 8, name: "Breske volume8 pdf", type: "Kyc Business", size: "3.8 Gb" },
    { id: 9, name: "Breske volume9 pdf", type: "Kyc Business", size: "3.9 Gb" },
];

const RecentDocumentsTable = ({recentDocuments, setFileToView, refreshFiles, toggleFileDetailsPanel }) => {
    const [viewMode, setViewMode] = useState("table");

    return (
        <div>
            <div className='flex justify-between mt-8 text-textcolor'>
                <h2 className='font-semibold'>Recent Documents</h2>
                <div className='flex gap-2'>
                    <img onClick={() => setViewMode("table")} className='bg-primary p-1 rounded-lg cursor-pointer' src={viewMode === "table" ? rowView : rowViewInverted} alt="img" />
                    <img onClick={() => setViewMode("grid")} className='bg-primary p-1 rounded-lg cursor-pointer' src={viewMode === "grid" ? columnViewInverted : columnView} alt="img" />
                    <img className='bg-primary p-1 rounded-lg' src={filterIcon} alt="img" />
                    <img className='bg-primary p-1 rounded-lg' src={moreVertical} alt="img" />
                </div>
            </div>
            {
                viewMode === "table" && <TableProvider columnNames={columnNames} tableData={recentDocuments} refreshFiles={refreshFiles} setFileToView={setFileToView} viewItemDetailsFn={toggleFileDetailsPanel} />
            }
            {
                viewMode === "grid" && <GridProvider tableData={recentDocuments} refreshFiles={refreshFiles} setFileToView={setFileToView} viewItemDetailsFn={toggleFileDetailsPanel} />
            }
        </div>
    )
}

export default RecentDocumentsTable;