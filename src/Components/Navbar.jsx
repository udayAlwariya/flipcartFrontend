import { CgProfile } from "react-icons/cg";
import { IoSearchOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import img2 from "../../public/logo.png"
import { useRecoilState,useSetRecoilState } from "recoil";
import {inputSearch, searchResult, userLoggedIn } from "../atom";
import { useAuth } from "../Custom hooks/useAuth";
import { SearchResult } from "./SearchResult";
import { useGetAllProducts } from "../Custom hooks/useGetAllProducts";
import { BsBoxSeam } from "react-icons/bs";
import {toast} from "react-toastify"
import {useLocation} from "react-router-dom"
import { useGetCartItems } from "../Custom hooks/useGetCartItems";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";

export function Navbar(){
    const navigate = useNavigate()
    const {pathname} = useLocation()
    const id = pathname.split("/")[3]
    const[onToggle,setOnToggle] = useState(false)
    const [search,setSearch] = useRecoilState(inputSearch)
    const setSearchResult = useSetRecoilState(searchResult)
    const [cartItems,setCartItems] = useGetCartItems()
    const [isUserLoggedIn,setisUserLoggedIn] = useRecoilState(userLoggedIn)
    const products = useGetAllProducts()
    useAuth()
    function changeHandler(e){
        setSearch(e.target.value)
        let array = products.filter(val=>val.title.longTitle.toLowerCase().includes(e.target.value.toLowerCase()))
        setSearchResult(array)
    }

    function logoutHandler(){
        toast.info('You are LoggedOut', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            
            });
        setCartItems([])
        localStorage.removeItem("token")
        setisUserLoggedIn(false)
        navigate("/")
    }

    function isActive(){
        return pathname == `/checkout/buy/${id}/address` || pathname=="/checkout/cart/address"
    }
    return(
        <div className="relative">
         <div className={` ${(isActive())?"pl-14 py-4":"flex"} font-semibold items-center text-white bg-customBlue justify-around py-4`}>
            <Link to="/"><img src={img2} className={`sm:w-[9vw] w-[30vw] ml-4`}/></Link>
            {isActive()?"": <div className={`flex space-x-14 ${!isUserLoggedIn && "mr-[10.5vw]"}`}>
            <div className=" hidden sm:flex items-center relative">
            <IoSearchOutline className="absolute left-2 text-2xl text-gray-500" />
            <input type="text" onChange={(e)=>changeHandler(e)} value={search} className="w-[45vw] pl-10 rounded-md text-black placeholder:text-lg placeholder:text-gray-500 py-2 outline-none bg-gray-100"  placeholder="Search for Products, Brands and More" />
            </div>

            <div className="flex items-center">
            <div className="flex items-center text-lg space-x-1">
            <CgProfile className="text-2xl" />
            {isUserLoggedIn?<h1 className="cursor-pointer" onClick={logoutHandler}>Logout</h1>:<Link to="/signup"><h1>SignUp</h1></Link>}
            </div>
             <IoMenu onClick={()=>setOnToggle(prev=>!prev)} className="text-2xl ml-10 cursor-pointer sm:hidden"/>
            </div>
            
           {isUserLoggedIn && <div className="sm:flex hidden items-center space-x-[3vw]">
            <Link to="/checkout/cart" className="flex items-center text-lg space-x-1">
            <div className="flex relative">
            <IoCartOutline className="text-2xl"  />
            {cartItems.length>0 && <h1 className="bg-red-600 absolute bottom-4 left-3 rounded-full w-5 h-5 flex justify-center items-center text-[14px]">{cartItems.length}</h1>}
            <h1>Cart</h1>
            </div>
            </Link>
            <Link to="/wishlist" className="flex relative items-center text-lg space-x-1">
            <IoMdHeartEmpty  className="text-2xl"  />
            <h1>WishList</h1>
            </Link>
            <Link to="/orders" className="flex items-center text-lg space-x-1">
            < BsBoxSeam className="text-xl"  />
            <h1>Orders</h1>
            </Link>
            </div> } 
            </div>}
        </div>

             {onToggle && <div className="bg-customBlue duration-1000 absolute text-white  z-10 w-full transition-all h-[20vh]">
             <div className="flex-row ml-2 space-y-3">

            <Link to="/checkout/cart" onClick={()=>setOnToggle(false)} className="flex relative items-center text-lg space-x-1">
            <IoCartOutline className="text-2xl"  />
            {cartItems.length>0 && <h1 className="bg-red-600 absolute bottom-4 left-3 rounded-full w-5 h-5 flex justify-center items-center text-[14px]">{cartItems.length}</h1>}
            <h1>Cart</h1>
            </Link>

            <Link to="/wishlist" onClick={()=>setOnToggle(false)} className="flex relative items-center text-lg space-x-1">
            <IoMdHeartEmpty  className="text-2xl"  />
            <h1>WishList</h1>
            </Link>

            <Link to="/orders" onClick={()=>setOnToggle(false)} className="flex items-center text-lg space-x-1">
            < BsBoxSeam className="text-xl"  />
            <h1>Orders</h1>
            </Link>

            </div>
            </div>}


            <div className="flex sm:hidden items-center relative">
            <IoSearchOutline className="absolute left-2 text-2xl text-gray-500" />
            <input type="text" onChange={(e)=>changeHandler(e)} value={search} className="w-full pl-10 rounded-md text-black placeholder:text-lg placeholder:text-gray-500 py-2 outline-none bg-gray-100"  placeholder="Search for Products, Brands and More" />
            </div>
            {search.length>0 && <SearchResult isUserLoggedIn={isUserLoggedIn}/>}
        </div>
       
    )
}