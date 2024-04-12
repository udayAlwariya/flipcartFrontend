import {MdStar } from "react-icons/md";
import { useDeleteWish } from "../Custom hooks/useDeleteWish";
import { useAddToCart } from "../Custom hooks/useAddToCart";
import { toast } from "react-toastify";
import logo from "../../public/logo2.png";

export function Wish({ wish, cartItems, wishList, setWishList, setCartItems }) {
  function ClickHandler(id) {
    const array = useDeleteWish(cartItems, wishList, setWishList, id);
    if (array.length == 0) {
      useAddToCart(id, setCartItems);
    } else {
      toast.info("Product already present!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }
  function DeleteHandler(id) {
    toast.success("Removed from Wishlist", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    useDeleteWish(cartItems, wishList, setWishList, id);
  }
  return (
    <>
      <div className="p-3 min-h-[10vh] space-y-2 mt-1 border mx-auto w-11/12 sm:mx-[15vw] sm:w-9/12">
        <div className="flex items-center justify-between">
            <div className="sm:flex">
            <img src={wish.url} className="sm:w-[110px] mx-auto w-6/12" alt="" />
          <div className="ml-3">
            <h1>{wish.title.longTitle}</h1>
            <div className="flex mt-2">
              <div className="flex items-center px-1 text-sm rounded-sm text-white space-x-1 bg-green-600 w-max">
                <h1>{(Math.random() + 4).toFixed(1)}</h1>
                <MdStar />
              </div>
              <img src={logo} className="w-[50px] ml-1" alt="" />
            </div>
            <div className="space-x-2 mt-3 items-center">
              <h1 className="font-semibold text-xl space-x-2">
                Rs.{wish.price.cost}
                <del className="text-sm ml-2 text-gray-500">
                  Rs.{wish.price.mrp}
                </del>
                <span className="text-sm text-green-600">
                  ({wish.discount.replace("Minimum", "").trim()})
                </span>
              </h1>
            </div>
            <div className="mt-1 space-x-3">
                <button onClick={()=>ClickHandler(wish.id)} className="bg-green-600 p-2 text-white text-sm font-semibold rounded-sm">MOVE TO CART</button>
                <button onClick={()=>DeleteHandler(wish.id)} className="bg-red-600 p-2 text-white text-sm font-semibold rounded-sm">REMOVE</button>
              </div>
          </div>
            </div>
        </div>
      </div>
    </>
  )
}
