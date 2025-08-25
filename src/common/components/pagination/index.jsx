import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationButton,
  PaginationNextButton,
  PaginationPreviousButton,
} from "@/common/components/ui/pagination";

const PaginationWrapper = ({ 
  pageSize, 
  handlePagination, 
  current = 1, 
  className
}) => {
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
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPreviousButton
            onClick={() => goTo(current - 1)}
            disabled={current === 1}
          />
        </PaginationItem>

        {start > 1 && (
          <>
            <PaginationItem>
              <PaginationButton
                onClick={() => goTo(1)}
                isActive={current === 1}
                aria-label="Go to page 1"
              >
                1
              </PaginationButton>
            </PaginationItem>
            {start > 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        )}

        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationButton
              onClick={() => goTo(page)}
              isActive={current === page}
              aria-label={`Go to page ${page}`}
            >
              {page}
            </PaginationButton>
          </PaginationItem>
        ))}

        {end < totalPages && (
          <>
            {end < totalPages - 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationButton
                onClick={() => goTo(totalPages)}
                isActive={current === totalPages}
                aria-label={`Go to page ${totalPages}`}
              >
                {totalPages}
              </PaginationButton>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationNextButton
            onClick={() => goTo(current + 1)}
            disabled={current === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationWrapper;
