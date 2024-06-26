import { useEffect, useState } from "react";
import { Order } from "../Components/Order";
import axios  from "axios";
import { Link } from "react-router-dom";
import { useRemoveInput } from "../Custom hooks/useRemoveInput";
import { EmptyOrder } from "../Components/EmptyOrder";
export function Orders(){
    const [orders,setOrders] = useState([])
    useRemoveInput()
    const url = "https://flipkartbackend-f609.onrender.com"
    useEffect(()=>{
        axios({
            method : "get",
            url : `${url}/order/allOrders`,
            headers : {
                Authorization : localStorage.getItem("token")
            }
        })
        .then(res=>{
        setOrders(res.data.orders)
    })
    },[])
    return(
        <>
        {orders.length==0?<EmptyOrder/>: <div  className="sm:pl-14 pt-10 space-y-5 ">
           {orders && orders.map((value)=>{
                return value.cartItems.map((val,index)=>{
                    return <Link key={index} to={`/orderDetails/${val._id}/${value._id}`}><Order value={val}/></Link>
                })
           })}
        </div>}
       
        </>
    )
}