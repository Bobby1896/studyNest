import React from "react";
import PropTypes from "prop-types";
import "../styles/tablePagination.scss";
import Icon from "./Icon";

const Pagination = ({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(startIndex + pageSize - 1, totalItems);

  return (
    <div className="pagination-container">
      {/* Page Size Dropdown */}
      <div className="page-size-control">
        <span>Page size: </span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          style={{ padding: "4px 8px" }}
        >
          {[10, 20, 30, 40].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      {/* Page Navigation */}
      <div className="page-navigation">
        <span>
          {startIndex}-{endIndex} of {totalItems}
        </span>
        <div className="button-wrapper">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              padding: "4px 8px",
              marginRight: "4px",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
            }}
          >
            <Icon icon="left" />
          </button>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              padding: "4px 8px",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            }}
          >
            <Icon icon="right" />
          </button>
        </div>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
};

export default Pagination;
