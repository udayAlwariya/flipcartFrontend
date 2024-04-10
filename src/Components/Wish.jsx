import { MdDelete } from "react-icons/md";
import { useDeleteWish } from "../Custom hooks/useDeleteWish";
import { useAddToCart } from "../Custom hooks/useAddToCart";
import {toast} from "react-toastify"

export function Wish({wish,cartItems,wishList,setWishList,setCartItems}){
  
    function clickHandler(id){
        const array = useDeleteWish(cartItems,wishList,setWishList,id)
        if(array.length==0){

            useAddToCart(id,setCartItems)
            
        }else{
            toast.info('Product already present!', {
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
    function deleteHandler(id){
        toast.success('Removed from Wishlist', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        useDeleteWish(cartItems,wishList,setWishList,id)
    }
    return(
        <div className="relative">
            
            <div className="sm:w-[15vw] h-[36vh] ml-[5vw] mt-2 border">
            <MdDelete  onClick={()=>deleteHandler(wish.id)} className="text-2xl absolute right-0 top-5 rounded-full cursor-pointer  text-gray-500" />
            <img src={wish.url} width="100px" className="mx-auto mt-4" alt="" />
            <h1 className="mt-5">{wish.title.longTitle.substring(0,27)+"..."}</h1>
            <div className="pl-2 space-x-2 mt-2 items-center">
                <h1 className="font-semibold space-x-2">Rs.{wish.price.cost}<del className="text-sm ml-2 text-gray-500">Rs.{wish.price.mrp}</del><span className="text-sm text-orange-600">({wish.discount.replace("Minimum", "").trim()})</span></h1>
            </div>
            <div className="text-center absolute bottom-0 sm:w-[15vw] border py-2">
                <button onClick={()=>clickHandler(wish.id)} className="font-semibold text-[15px]">MOVE TO CART</button>
            </div>
            </div>
        </div>
    )
}