import axios  from "axios";

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
    })
    
    
}