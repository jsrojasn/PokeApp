import React from "react";
import PropTypes from "prop-types";


import { fetchPageNumbers } from "../../utils/functions";

const Pagination = ({
  numberOfPages,
  currentPage,
  limit,
  changePage,
  isSearching,
}) => {
  const pages = fetchPageNumbers(numberOfPages, currentPage);
  return (
    <div className="flex content-center h-8">
      {pages.map((page, index) => {
        console.log(page);
        if (page === "LEFT")
          return (
            <div
              className="border w-8 flex justify-center items-center cursor-pointer"
              key={index}
              onClick={() => changePage({ offset: (currentPage - 2) * limit })}
            >
              <p className="text-xs">&laquo;</p>
            </div>
          );

        if (page === "RIGHT")
          return (
            <div
              className="border w-8 flex justify-center items-center cursor-pointer"
              key={index}
              onClick={() => changePage({ offset: currentPage * limit })}
            >
              <p className="text-xs">&raquo;</p>
            </div>
          );

        return (
          <div
            className={`border w-8 flex justify-center items-center cursor-pointer ${currentPage === page && "bg-sky-800 text-white"}`}
            key={index}
            onClick={() => {
              if (isSearching) return;
              changePage({ offset: (page - 1) * limit });
            }}
          >
            <p className="text-xs">{page}</p>
          </div>
        );
      })}
    </div>
  );
};

Pagination.propTypes = {
  numberOfPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
  isSearching: PropTypes.bool.isRequired,
};

export default Pagination;
