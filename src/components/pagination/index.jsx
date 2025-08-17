import React from "react";

const PaginationComponent = ({ pageSize, handlePagination, current = 1 }) => {
  const totalPages = Math.max(1, Math.ceil(pageSize / 10));

  const goTo = (page) => {
    if (page < 1 || page > totalPages) return;
    handlePagination(page);
  };

  const pages = [];
  const windowSize = 5;
  const start = Math.max(1, current - Math.floor(windowSize / 2));
  const end = Math.min(totalPages, start + windowSize - 1);
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={() => goTo(current - 1)}
        disabled={current === 1}
        className="px-3 py-1 rounded border border-input text-sm disabled:opacity-50"
      >
        Prev
      </button>
      {start > 1 && (
        <>
          <button
            type="button"
            onClick={() => goTo(1)}
            className={`px-3 py-1 rounded border text-sm ${
              current === 1 ? "bg-primary text-white border-primary" : "border-input"
            }`}
          >
            1
          </button>
          {start > 2 && <span className="px-2">...</span>}
        </>
      )}
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => goTo(p)}
          className={`px-3 py-1 rounded border text-sm ${
            current === p ? "bg-primary text-white border-primary" : "border-input"
          }`}
        >
          {p}
        </button>
      ))}
      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="px-2">...</span>}
          <button
            type="button"
            onClick={() => goTo(totalPages)}
            className={`px-3 py-1 rounded border text-sm ${
              current === totalPages
                ? "bg-primary text-white border-primary"
                : "border-input"
            }`}
          >
            {totalPages}
          </button>
        </>
      )}
      <button
        type="button"
        onClick={() => goTo(current + 1)}
        disabled={current === totalPages}
        className="px-3 py-1 rounded border border-input text-sm disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationComponent;
