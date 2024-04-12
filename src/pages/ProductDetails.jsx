import { HiShoppingCart } from "react-icons/hi";
import { AiFillThunderbolt } from "react-icons/ai";
import { HiTag } from "react-icons/hi";
import { MdStar } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import { IoMdHeartEmpty } from "react-icons/io";
import { GoHeartFill } from "react-icons/go";
import { useNavigate, useParams } from "react-router-dom";
import {toast} from 'react-toastify'
import { useRemoveInput } from "../Custom hooks/useRemoveInput";



export function ProductDetails(){
    let Url = "https://flipkartbackend-f609.onrender.com/"
    const [like,setLike] = useState(false)
    const navigate = useNavigate()
    let {id} = useParams() 
    const[product,setProduct] = useState({})
    useRemoveInput()

    useEffect(()=>{
        axios({
            method : "get",
            url : Url + "product/productDetails/" + id
        })
        .then((res)=>{
            setProduct(res.data.product[0])
            
        })
        .catch(()=>{
            console.log("ERROR")
        })
        
    },[id])

    useEffect(()=>{
        axios({
            method : "get",
            url : `${Url}wish/getSpecificWish/${id}`,
            headers : {
                Authorization : localStorage.getItem("token")
            }
        })
        .then((res)=>{
            if(res.data.wish!=null){
                setLike(true)
            }
        })
        .catch(()=>console.log("ERROR"))
    },[id])

    function addToCart(){
        axios({
            method : "post",
            url : `${Url}checkout/addToCart/${id}`,
            headers : {
                Authorization : localStorage.getItem("token")
            }
        })
        .then(()=>{
            navigate("/checkout/cart")
            toast.success('ADDED TO CART', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        })
        .catch((error)=>{
            toast.error('Please Login First', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            console.log("The error is",error)
        })
    }

    function clickHandler(){
        navigate(`/checkout/buy/${id}/address`)
    }

    function isActive(){

        setLike(true)
        if(!like){
           
            axios({
                method : "post",
                url : `${Url}wish/postWish`,
                headers : {
                    Authorization : localStorage.getItem("token")
                },
                data : product
            })
            .then((res)=>{
                toast.success('Added to Wishlist', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
                    
            })
            .catch(()=>{
                toast.error('Please Login First', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
                    
            })
        }
    }

    return(
        <div>    
        {Object.keys(product).length && <div className="sm:flex flex-row mt-5 w-11/12 mx-auto">
            <div className="flex-col sm:ml-10">
                <div className="relative">
            <img src={product.detailUrl} className=" w-full sm:shadow-md px-5 py-5" alt="" />
            {like?<GoHeartFill onClick={isActive} className={`text-3xl absolute top-0 right-2 cursor-pointer text-red-600`}/>:<IoMdHeartEmpty className={`text-3xl absolute top-0 cursor-pointer right-2`} onClick={isActive}/>}
                </div>
            <div className="font-semibold flex  text-white mt-2 space-x-4">
                <div className="relative">
                <HiShoppingCart className="sm:left-5 sm:top-4 left-2 top-3 text-2xl absolute"/>
                <button onClick={addToCart} className="bg-yellow-500 ml-2 px-6 py-3 sm:px-10 sm:py-4">ADD TO CART</button>
                </div>
                <div className="relative">
                <AiFillThunderbolt className="text-2xl sm:left-5 sm:top-4 top-3 absolute" />
                <button onClick={clickHandler} className="bg-orange-500 px-6 py-3 sm:ml-1 sm:px-10 sm:py-4">BUY IT NOW </button>
                </div> 
            </div>
            </div>

            <div className="pl-3 space-y-4 ml-2 w-full sm:w-8/12 mt-10 sm:mt-0">
                <h1 className="text-lg font-semibold">{product.title.longTitle}</h1>
                <h1 className="text-md text-gray-800">{product.description}</h1>
                <div className="flex space-x-3">
                <div className="flex items-center px-1 text-sm rounded-sm text-white space-x-1 bg-green-600 w-max">
                <h1>{(Math.random() + 4).toFixed(1)}</h1>
                <MdStar className="text-white" />
                </div>
                <h1 className="text-gray-500">737 Ratings & 39 Reviews</h1>
                </div>
                <h1 className="text-green-600">{product.discount}</h1>
                <div className="flex space-x-3 items-center">
                    <h1 className="text-3xl">₹{product.price.cost}</h1>
                    <h1 className="text-gray-400"><del>₹{product.price.mrp}</del></h1>
                    <h1 className="text-green-600">{product.price.discount} off</h1>
                </div>

                <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                    <HiTag className="text-green-500 text-xl" />
                    <h1><span className="font-semibold">Bank Offer</span>Get ₹25* instant discount for the 1st Flipkart Order using Flipkart UPI <span className="text-sky-500">T&C</span></h1>
                    </div>
                    <div className="flex items-center space-x-2">
                    <HiTag className="text-green-500 text-xl" />
                    <h1><span className="font-semibold">Bank Offer</span>Flat ₹1,250 off on HDFC Bank Credit Card EMI Txns on 6 and 9 months tenure, Min. Txn Value: ₹15,000 <span className="text-sky-500">T&C</span></h1>
                    </div>
                    <div className="flex items-center space-x-2">
                    <HiTag className="text-green-500 text-xl" />
                    <h1><span className="font-semibold">Bank Offer</span> Flat ₹1,500 off on HDFC Bank Credit Card EMI Txns on 12 months tenure, Min. Txn Value: ₹15,000 <span className="text-sky-500">T&C</span></h1>
                    </div>
                    <div className="flex items-center space-x-2">
                    <HiTag className="text-green-500 text-xl" />
                    <h1><span className="font-semibold">Special PriceGet </span>extra ₹1540 off (price inclusive of cashback/coupon) <span className="text-sky-500">T&C</span></h1>
                    </div>
                    <div className="flex items-center space-x-2">
                    <HiTag className="text-green-500 text-xl" />
                    <h1><span className="font-semibold">Freebie</span>Flat ₹650 off on Cleartrip flights booking along with 300 supercoins on booking <span className="text-sky-500">T&C</span></h1>
                    </div>

                </div>
            </div>
        </div>}
        </div>
        
    )
}