import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentPage } from "../features/paginator/pageSlice";
import { SingleProductType } from "../types/storeTypes";

export default function Paginator({
  props,
}: {
  props: {
    dataLength: number;
    currentData: SingleProductType[];
    loading: boolean;
  };
}) {
  const itemsPerPage = useSelector(
    (state: { page: { itemsPerPage: number } }) => state.page.itemsPerPage
  );
  const currentPageNr = useSelector(
    (state: { page: { currentPage: number } }) => state.page.currentPage
  );

  function calculatePages() {
    const pages = Math.ceil(props.dataLength / itemsPerPage);
    const pagesArray = [];
    for (let i = 1; i <= pages; i++) {
      pagesArray.push(i);
    }

    return pagesArray;
  }

  const [pageNumbers, setPageNumbers] = useState(calculatePages());

  useEffect(() => {
    setPageNumbers(calculatePages());
  }, [props.loading]);

  const dispatch = useDispatch();

  return (
    <div className="flex justify-center gap-2 mt-4">
      {pageNumbers.map((page) => {
        return (
          <button
            className={`text-lg border-2 rounded-md p-1 border-gray-500 ${
              page === currentPageNr ? "bg-green-950 text-white" : ""
            }`}
            key={page}
            onClick={() => {
              dispatch(
                currentPage({ products: props.currentData, currentPage: page })
              );
              window.scrollTo(0, 0);
            }}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
}
