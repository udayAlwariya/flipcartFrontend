import { useEffect, useState } from "react"
import axios from "axios"
import { Wish } from "../Components/Wish"
import { useGetCartItems } from "../Custom hooks/useGetCartItems"
import { EmptyWishList } from "../Components/EmptyWishList"
import { useRemoveInput } from "../Custom hooks/useRemoveInput"
export function WishList(){

    const [wishList,setWishList] = useState([]) 
    const [cartItems,setCartItems] = useGetCartItems()
    const url = "https://flipkartbackend-f609.onrender.com"
    useRemoveInput()
    useEffect(()=>{
        axios({
            method : "get",
            url : `${url}/wish/getWish`,
            headers : {
                Authorization : localStorage.getItem("token")
            }
        })
        .then(res=>setWishList(res.data.wishList))
        .catch((e)=>console.log(e))
    },[])
    return(
        <div>
        {wishList.length ? <div className=" relative pt-5"><h1 className=" border sm:w-9/12 pl-2 shadow-sm min-h-[10vh] space-y-2 font-semibold text-xl flex items-center bg-gray-100 w-11/12 mx-auto sm:mx-[15vw]">My Wishlist {wishList.length}</h1>
        {wishList.map((wish,index)=><Wish key={index} setCartItems={setCartItems} cartItems={cartItems} setWishList={setWishList} wishList={wishList} wish={wish}/>)}
        </div>:<EmptyWishList/>}
        </div>
    )
}