import { useEffect } from "react"
import { useRecoilState } from "recoil"
import { cartAtom } from "../atom"
import  axios  from "axios"

export function useGetCartItems(){
    const url = "https://flipkartbackend-f609.onrender.com"
    const [cartItems,setCartItems] = useRecoilState(cartAtom)
    useEffect(()=>{
        axios({
            method : "get",
            url : `${url}/checkout/cart/address`,
            headers : {
                Authorization : localStorage.getItem("token")
            }
        })
        .then((res)=>{
            setCartItems(res.data.response)
        })
        .catch((e)=>{
            console.log("Error is " + e)
        })
    },[])
    return [cartItems,setCartItems]
}