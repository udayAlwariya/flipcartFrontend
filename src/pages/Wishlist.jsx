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
        <>
        {wishList.length ? <div><h1 className="pl-[5vw] mt-[10vh] text-lg font-semibold">My Wishlist {wishList.length} item</h1>
        <div className="grid grid-cols-1 sm:grid-cols-5 sm:pr-8">
        {wishList.map((wish,index)=><Wish key={index} setCartItems={setCartItems} cartItems={cartItems} setWishList={setWishList} wishList={wishList} wish={wish}/>)}
        </div></div>:<EmptyWishList/>}
        </>
    )
}