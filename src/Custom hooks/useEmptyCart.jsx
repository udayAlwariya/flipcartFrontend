import axios  from "axios";

export function useEmptyCart(setCartItems){
    const Url = "https://flipkartbackend-f609.onrender.com"
    axios({
        method : "delete",
        url : `${Url}/checkout/removeAll`,
        headers : {
            Authorization : localStorage.getItem("token")
        }
    })
    .then((res)=>{
        setCartItems([])
    })
    .catch((e)=>{
        console.log("ERROR")
    })
}