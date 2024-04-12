import axios  from "axios";
import { toast } from "react-toastify";

export function useAddToCart(id,setCartItems){
   
    axios({
        method : "post",
        url : `https://flipkartbackend-f609.onrender.com/checkout/addToCart/${id}`,
        headers : {
            Authorization : localStorage.getItem("token")
        }
    })
    .then((res)=>{
        setCartItems(prev=>[...prev,res.data.cartItem])
        toast.success('Added to Cart', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            })
    })
    
    
}