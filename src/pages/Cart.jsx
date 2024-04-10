import { useNavigate } from "react-router-dom"
import axios from "axios"
import { EmptyCart } from "../Components/EmptyCart"
import { CartItems } from "../Components/CartItems"
import { useGetCartItems } from "../Custom hooks/useGetCartItems"
import { useRemoveInput } from "../Custom hooks/useRemoveInput"

export function Cart(){
    const navigate = useNavigate()
    const [cartItems,setCartItems] = useGetCartItems()
    const url = "https://flipkartbackend-f609.onrender.com"
    useRemoveInput()
    function addToCart(id){
        axios({
            method : "post",
            url : `${url}/checkout/addToCart/${id}`,
            headers : {
                Authorization : localStorage.getItem("token")
            }
        })
        .then((res)=>{
            const updatedCartItems = cartItems.map(item => {
                if (item.id === id) {
                  return { ...item, quantity: item.quantity + 1 };
                }
                return item;
              });
              setCartItems(updatedCartItems);
        })
        .catch((e)=>{
            console.log("ERROR")
        })
    }

    function removeFromCart(id){
        axios({
            method : "post",
            url :`${url}/checkout/removeItem/${id}`,
            headers : {
                Authorization : localStorage.getItem("token")
            }
        })
        .then((res)=>{
            let productQuantity = cartItems.find(value=>value.id==id)
            if(productQuantity.quantity==1){
                let filteredItems = cartItems.filter(val=>val.id!=id)
                console.log(filteredItems)
                setCartItems(filteredItems)
            }else{
                let updatedItems = cartItems.map(item=>{
                    if(item.id == id){
                        return {...item,quantity:item.quantity-1}
                    }
                    return item
                })
                setCartItems(updatedItems)
            }
            
        })
        .catch((e)=>{
            console.log("error")
        })
    }

    function removeProduct(id){
        axios({
            method : "delete",
            url : `${url}/checkout/removeProduct/${id}`,
            headers : {
                Authorization : localStorage.getItem("token")
            }
        })
        .then((res)=>{
            const filteredCart = cartItems.filter(val=>val.id!=id)
            setCartItems(filteredCart)
            
        })
        .catch((e)=>{
            console.log("error")
        })
    }

    return(
        <div className="relative">
        {cartItems.length==0?<EmptyCart/>:<CartItems removeProduct={removeProduct} navigate={navigate} cartItems={cartItems} removeFromCart={removeFromCart} addToCart={addToCart}/>}
        </div>
    )
}