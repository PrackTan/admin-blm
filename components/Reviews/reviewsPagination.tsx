import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (p: number) => void;
}

export default function ReviewsPagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  /* helper ngắn gọn */
  const nav = (p: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (p >= 1 && p <= totalPages) onPageChange(p);
  };

  return (
    <Pagination className="mt-6">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            aria-disabled={currentPage === 1}
            onClick={nav(currentPage - 1)}
          />
        </PaginationItem>

        {pages.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              href="#"
              isActive={p === currentPage}
              onClick={nav(p)}
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href="#"
            aria-disabled={currentPage === totalPages}
            onClick={nav(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
