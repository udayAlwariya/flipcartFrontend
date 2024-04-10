import { useRecoilState } from "recoil"
import { productAtom } from "../atom"
import axios from "axios"
import { useEffect } from "react"

export function useGetAllProducts(){
    const Url = "https://flipkartbackend-f609.onrender.com"

    const [products,setProducts] = useRecoilState(productAtom)
  
    useEffect(()=>{
        axios({
            method : "get",
            url : `${Url}/product/allProducts`
        })
        .then((res)=>{
            setProducts(res.data.msg)
        })
        .catch((e)=>{
            console.log(e)
        })
    },[])
    return products
}