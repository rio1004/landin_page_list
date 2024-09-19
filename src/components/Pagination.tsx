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
    <Pagination
      className={`${
        showMd ? "blur" : ""
      } mb-10  md:mb-0 flex items-center flex-col md:flex-row`}
    >
      <PaginationContent className="flex justify-center">
        {page == 1 ? (
          <PaginationItem>
            <PaginationPrevious isDisabled />
          </PaginationItem>
        ) : (
          <PaginationItem>
            <PaginationPrevious onClick={prev} />
          </PaginationItem>
        )}
        {pageNumber &&
          pageNumber.map((pageNumber) => (
            <PaginationItem className="hidden md:block">
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
        <PaginationItem className="md:hidden">
          <PaginationLink isActive>{page}</PaginationLink>
        </PaginationItem>
        {page == pageNumber.length ? (
          <PaginationItem>
            <PaginationNext isDisabled />
          </PaginationItem>
        ) : (
          <PaginationItem>
            <PaginationNext onClick={next} />
          </PaginationItem>
        )}
      </PaginationContent>

      <div className="flex justify-center">
        <Select
          onValueChange={(val) => {
            handlePageSize(val);
          }}
        >
          <SelectTrigger className="w-[100px] ml-0 md:ml-2 mt-2 md:mt-0">
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
      </div>
      <Button variant="outline" disabled className="ml-0 md:ml-2 mt-3 md:mt-0">
        {activeCards.length + " 个"}
      </Button>
    </Pagination>
  );
};

export default PaginationComponent;
