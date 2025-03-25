import React from "react";
import arrowLeft from "../../images/icon/arrow_left.svg"
import arrowRight from "../../images/icon/arrow_right.svg"

const PaginationProvider = ({ currentPage, totalPages, onPageChange, tableName = "" }) => {
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1); // First page
    pages.push(2); // First page
    if (currentPage > 3) pages.push("..."); // Ellipsis before the middle pages
    if (currentPage > 2 && currentPage < totalPages - 1) pages.push(currentPage); // Current page
    if (currentPage < totalPages - 2) pages.push("..."); // Ellipsis after the middle pages
    pages.push(totalPages - 1); // Last page
    pages.push(totalPages); // Last page

    return pages;
  };

  return (
    <div className="flex justify-between items-center mt-4">
      <div>
        <span className="text-textsecondary">Showing 10 entries</span>
      </div>
      <div className={`flex justify-end items-center space-x-2 ${tableName === "connectionRequests" ? "right-100" : "right-6"}`}>
        {/* Previous button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-[0.7rem]  py-[0.6rem] bg-secondary3 rounded disabled:opacity-50"
        >
          <img src={arrowLeft} alt="arrowLeft" className="w-[0.6rem]" />
        </button>

        {/* Page Numbers */}
        {getPageNumbers().map((num, index) =>
          num === "..." ? (
            <span key={index} className="px-3 py-1 rounded bg-white border border-borderColor">
              ...
            </span> 
          ) : (
            <button
              key={num}
              onClick={() => onPageChange(num)}
              className={`px-3 py-1 rounded font-medium ${currentPage === num ? "bg-secondary2 text-white" : "bg-white border border-borderColor"
                }`}
            >
              {num}
            </button>
          )
        )}

        {/* Next button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-[0.7rem] py-[0.6rem] bg-secondary3 text-white rounded disabled:opacity-50"
        >
          <img src={arrowRight} alt="arrowRight" className="w-[0.6rem]" />
        </button>
      </div>
    </div>
  );
};

export default PaginationProvider;