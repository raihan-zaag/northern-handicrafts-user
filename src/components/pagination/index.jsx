import React from "react";
import { Pagination } from "antd";

const PaginationComponent = ({ pageSize, handlePagination, current = 1 }) => {
  return (
    <Pagination
      onChange={handlePagination}
      total={pageSize}
      showSizeChanger={false}
      size="default"
      pageSize={10}
      current={current}
    />
  );
};

export default PaginationComponent;
