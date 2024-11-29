import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentPage } from "../features/paginator/pageSlice";
import { SingleProductType } from "../types/storeTypes";

export default function Paginator({
  props,
}: {
  props: { dataLength: number; currentData: SingleProductType[] };
}) {
  const itemsPerPage = useSelector(
    (state: { page: { itemsPerPage: number } }) => state.page.itemsPerPage
  );
  const [pageNumbers, setPageNumbers] = useState(() => {
    const pages = Math.ceil(props.dataLength / itemsPerPage);
    const pagesArray = [];
    for (let i = 1; i <= pages; i++) {
      pagesArray.push(i);
    }
    return pagesArray;
  });
  const dispatch = useDispatch();

  return (
    <div>
      {pageNumbers.map((page) => {
        return (
          <button
            key={page}
            onClick={() =>
              dispatch(
                currentPage({ products: props.currentData, currentPage: page })
              )
            }
          >
            {page}
          </button>
        );
      })}
    </div>
  );
}
