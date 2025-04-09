import { useState } from "react";
import { SingleProductType } from "../types/storeTypes";
import { useDispatch, useSelector } from "react-redux";
import { addAmount, fetchProduct } from "../features/shoppingCart/cartSlice";
import { AppDispatch } from "../app/store";
import addCartIcon from "../assets/add_shopping_cart.png";
import { expandCollapse } from "../features/textCollapse/textSlice";

export default function SingleProduct({ props }: { props: SingleProductType }) {
  const [inputAmount, setInputAmount] = useState(0);
  const dispatch = useDispatch<AppDispatch>();
  const descriptionCollapsed = useSelector(
    (state: { description: { [key: string]: { collapsed: boolean } } }) =>
      state.description[props.id.toString()]
  );

  function truncateAtWord(text: string, maxChars: number): string {
    if (text.length <= maxChars) return text;

    const truncated = text.slice(0, maxChars);
    const lastSpaceIndex = truncated.lastIndexOf(" ");
    return truncated.slice(0, lastSpaceIndex) + "...";
  }

  return (
    <div className="flex flex-col w-80 md:w-96 p-3 hover:shadow-lg rounded-sm border-b border-blue-950">
      <div className="md:h-24">
        <h4 className="font-semibold border-b border-gray-300">
          {props.title}
        </h4>
        <p className="text-red-700 font-semibold">€ {props.price}</p>
      </div>
      <div className="my-2 p-1">
        <img
          src={props.image}
          alt=""
          className="w-16 md:w-32 object-contain float-left mr-2 mb-1"
        />
        <p className="pl-2 text-sm">
          {descriptionCollapsed
            ? props.description
            : truncateAtWord(props.description, 30)}
        </p>
        <button
          className="text-[0.3rem] sm:text-xs italic text-gray-950 border-2 border-dotted rounded-md px-1 hover:bg-gray-700 hover:text-white"
          onClick={() =>
            dispatch(
              expandCollapse({
                id: props.id.toString(),
                collapse: !descriptionCollapsed,
              })
            )
          }
        >
          {descriptionCollapsed ? "Collapse" : "Expand"}
        </button>
      </div>
      <div className="flex mt-auto justify-end gap-2 items-end">
        <div className="flex flex-col ">
          <label htmlFor={props.id.toString()} className="text-sm font-bold">
            Amount
          </label>
          <input
            className="rounded border-2 w-[70px]"
            type="number"
            id={props.id.toString()}
            value={inputAmount}
            min={0}
            onChange={(e) => setInputAmount(Number(e.target.value))}
          />
        </div>
        <button
          className="bg-red-800 text-white rounded px-2 h-[30px] font-bold text-xs md:text-base hover:bg-red-950"
          onClick={async () => {
            dispatch(addAmount({ inputAmount, id: props.id }));
            setInputAmount(0);
            dispatch(fetchProduct({ id: props.id }));
          }}
        >
          <img
            src={addCartIcon}
            alt="Add to cart"
            width="20px"
            className="w-[20px]"
          />
        </button>
      </div>
    </div>
  );
}
