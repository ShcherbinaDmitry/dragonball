import React, { useState } from 'react';

const Pagination = (props) => {
  const pageLimit = 5;
  const pageNeighbours = 0;
  const totalRecords = 10;
  const [currentPage, setCurrentPage] = useState(1);



  return (
    <div>
      Pagination
    </div>
  );
};

export default Pagination;
