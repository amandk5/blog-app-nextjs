import { Box, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const handleClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  console.log(currentPage);

  const renderPageNumbers = pageNumbers.map((pageNumber) => (
    <button
      display="inline"
      key={pageNumber}
      className={pageNumber === currentPage ? "active" : null}
      onClick={() => handleClick(pageNumber)}
    >
      {pageNumber}
    </button>
  ));

  return (
    <Box className="pagination">
      <button
        className="prev"
        onClick={() => {
          if (currentPage !== 1) {
            // decrease currentPage value by 1
            onPageChange(currentPage - 1);
          }
        }}
      >
        Prev
      </button>
      {renderPageNumbers}
      <button
        className="next"
        onClick={() => {
          if (currentPage !== totalPages) {
            // increase currentPage value by 1
            onPageChange(currentPage + 1);
          }
        }}
      >
        Next
      </button>
    </Box>
  );
};

export default Pagination;
