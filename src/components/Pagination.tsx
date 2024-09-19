import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

type PaginationProps = {
  page: number;
  pageSize: number;
  total: number;
  pageNumber: number[];
  showPagination: boolean;
  showMd: boolean;
  prev: () => void;
  next: () => void;
  customPage: (pageNumber: number) => void;
  handlePageSize: (val: string) => void;
  activeCards: [];
};

const PaginationComponent = ({
  page,
  pageSize,
  pageNumber,
  showMd,
  prev,
  next,
  customPage,
  handlePageSize,
  activeCards,
}: PaginationProps) => {
  return (
    <Pagination className={`${showMd ? "blur" : ""} mb-10 md:mb-0`}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={prev} />
        </PaginationItem>
        {pageNumber &&
          pageNumber.map((pageNumber) => (
            <PaginationItem>
              {pageNumber == page ? (
                <PaginationLink isActive onClick={() => customPage(pageNumber)}>
                  {pageNumber}
                </PaginationLink>
              ) : (
                <PaginationLink onClick={() => customPage(pageNumber)}>
                  {pageNumber}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
        <PaginationItem>
          <PaginationNext onClick={next} />
        </PaginationItem>
      </PaginationContent>
      <Button variant="outline" disabled className="ml-2">
        {activeCards.length + " 个"}
      </Button>
      <Select
        onValueChange={(val) => {
          handlePageSize(val);
        }}
      >
        <SelectTrigger className="w-[100px] ml-2">
          <SelectValue placeholder={pageSize + " 个/页"} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="10">10 个/页</SelectItem>
          <SelectItem value="20">20 个/页</SelectItem>
          <SelectItem value="30">30 个/页</SelectItem>
          <SelectItem value="40">40 个/页</SelectItem>
          <SelectItem value="50">50 个/页</SelectItem>
        </SelectContent>
      </Select>
    </Pagination>
  );
};

export default PaginationComponent;
