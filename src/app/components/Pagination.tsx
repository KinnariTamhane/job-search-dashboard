import React from "react";

interface PaginationProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, setPage }) => {
  if (totalPages <= 1) return null;

  // Helper to generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', page - 1, page, page + 1, '...', totalPages);
      }
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        className="px-3 py-1 rounded bg-gray-800 hover:bg-gray-700 disabled:opacity-50 text-white"
        onClick={() => setPage(Math.max(1, page - 1))}
        disabled={page === 1}
      >
        Prev
      </button>
      {pageNumbers.map((p, idx) =>
        p === '...'
          ? <span key={idx} className="px-2 text-gray-500 select-none">...</span>
          : <button
              key={p}
              className={`px-3 py-1 rounded transition-colors ${p === page ? 'bg-white text-black font-bold border-2 border-black shadow' : 'bg-gray-800 hover:bg-gray-700 text-white border border-transparent'}`}
              onClick={() => setPage(Number(p))}
              disabled={p === page}
            >
              {p}
            </button>
      )}
      <button
        className="px-3 py-1 rounded bg-gray-800 hover:bg-gray-700 disabled:opacity-50 text-white"
        onClick={() => setPage(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination; 