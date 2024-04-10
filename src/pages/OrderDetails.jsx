import  axios  from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useRemoveInput } from "../Custom hooks/useRemoveInput"

export function OrderDetails(){
    const {productId,orderId} = useParams()
    const url = "https://flipkartbackend-f609.onrender.com"

    useRemoveInput()

    const [orderDetails,setOrderDetails] = useState({})

    const [addressDetails,setAddressDetails] = useState({})

    useEffect(()=>{
        axios({
            method : "get",
            url : `${url}/order/orderDetails/${orderId}`,
            headers : {
                Authorization : localStorage.getItem("token")
            }
        })
        .then((res)=>{
            const data = res.data.order
            const filteredData = data.cartItems.filter(item=>item._id == productId)[0]
            setOrderDetails(filteredData)
            setAddressDetails(data.address)
        })
    },[])

    console.log(addressDetails)
    return(
        <>
        <div className="bg-gray-100 pt-2 h-[91vh]">
        <h1 className="w-11/12 mx-auto text-sm text-gray-500">Home&rarr;Orders&rarr;{orderId}</h1>
        {Object.keys(addressDetails).length>0 && <Address addressDetails={addressDetails}/> }
        {Object.keys(orderDetails).length>0 && <OrderData orderDetails={orderDetails}/>}
        </div>
        </>
    )
}


function Address({addressDetails}){
    return (
        <div className="w-11/12 p-4 mt-5 h-[24vh] mx-auto bg-white">
            <div className="ml-3">
            <h1 className="font-semibold">Delivery Address</h1>
            <h1 className="mt-2 text-gray-900 font-semibold">{addressDetails.name}</h1>
            <div className="mt-2 text-[14px]">
                <h1>{addressDetails.address},{addressDetails.town},{addressDetails.city}</h1>
                <h1>{addressDetails.city}- {addressDetails.pincode}, {addressDetails.state}</h1>
            </div>
            <div className="flex mt-3 space-x-2 text-[14px]">
            <h1 className="font-semibold">Phone number </h1>
            <h1 className>{addressDetails.mobile}</h1>
            </div>
            </div>
        </div>
    )
}

function OrderData({orderDetails}){
    return(
        <div className="w-11/12 p-4 mt-5 h-[24vh] mx-auto bg-white">
            <div className="ml-5 flex ">
                <img src={orderDetails.url} width="120px" alt="" />
                <div className="pl-4 pt-2">
                    <h1 className="font-semibold text-gray-900">{orderDetails.title.longTitle}</h1>
                    <h1 className="font-semibold text-gray-600 text-sm">Qty - {orderDetails.quantity}</h1>
                    <h1 className="font-semibold mt-2">₹{orderDetails.quantity*orderDetails.price.cost}</h1>
                </div>
            </div>
        </div>
    )
}