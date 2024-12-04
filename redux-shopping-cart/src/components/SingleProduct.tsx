import { useState } from "react";
import { SingleProductType } from "../types/storeTypes";
import { useDispatch } from "react-redux";
import { addAmount, fetchProduct } from "../features/shoppingCart/cartSlice";
import { AppDispatch } from "../app/store";

export default function SingleProduct({ props }: { props: SingleProductType }) {
  const [inputAmount, setInputAmount] = useState(0);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="flex flex-col w-80 md:w-96 p-3 hover:shadow-lg rounded">
      <div className="md:h-24">
        <h4 className="font-semibold">{props.title}</h4>
        <p className="text-red-500 font-semibold">€ {props.price}</p>
      </div>
      <div className="my-2 p-1 border-2 rounded border-zinc-600 bg-slate-300">
        <img
          src={props.image}
          alt=""
          className="w-16 md:w-32 object-contain float-left mr-2 mb-1"
        />
        <p className="pl-2 text-sm">{props.description}</p>
      </div>
      <div className="flex mt-auto">
        <div>
          <label htmlFor={props.id.toString()} className="text-sm">
            Amount
          </label>
          <input
            className="rounded border-2"
            type="number"
            id={props.id.toString()}
            value={inputAmount}
            min={0}
            onChange={(e) => setInputAmount(Number(e.target.value))}
          />
        </div>
        <button
          className="bg-red-800 text-white rounded p-1 font-bold text-xs md:text-base hover:bg-red-950"
          onClick={async () => {
            dispatch(addAmount({ inputAmount, id: props.id }));
            setInputAmount(0);
            dispatch(fetchProduct({ id: props.id }));
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
