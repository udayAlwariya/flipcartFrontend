import { useEffect} from "react";
import { AmountSection } from "../Components/AmountSection";
import { CreateAddress } from "../Components/CreateAddress";
import axios from "axios";
import { AddressList } from "../Components/AddressLists";
import { AddNewAddress } from "../Components/AddNewAddress";
import { useRecoilState, useRecoilValue } from "recoil";
import { addressAtom, cartAtom, renderAtom, selectedAddress, userLoggedIn } from "../atom";
import { toast } from "react-toastify";
import { SelectAddress } from "../Components/SelectAddress";
import { useLocation,useNavigate} from "react-router-dom";
import { useEmptyCart } from "../Custom hooks/useEmptyCart";
import { useAuth } from "../Custom hooks/useAuth";
export function Address(){

    const [cartItems,setCartItems] = useRecoilState(cartAtom)
    const [address,setAddresses] = useRecoilState(addressAtom)
    const [selectedAdress,setSelectedAddress] = useRecoilState(selectedAddress)
    const render = useRecoilValue(renderAtom)
    const isUserLoggedIn = useRecoilValue(userLoggedIn)
    const url = "https://flipkartbackend-f609.onrender.com"
    const {pathname} = useLocation()
    const navigate = useNavigate()
    
    useEffect(()=>{
        if(!isUserLoggedIn){
            toast.error('please Login first!', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            navigate("/")
        }
        axios({
            method : "get",
            url : `${url}${pathname}`,
            headers : {
                Authorization : localStorage.getItem("token")
            }
        })
        .then((res)=>{
            setCartItems(res.data.response)
            setSelectedAddress({})
        })
        .catch(()=>{
            console.log("Error")
        })
    },[])

    useEffect(()=>{
        axios({
            method : "get",
            url : `${url}/address/getAddress`,
            headers : {
                Authorization : localStorage.getItem("token")
            }
        })
        .then((res)=>{
            setAddresses(res.data.adresses)  
        })
        .catch((e)=>{
            console.log("ERROR")
        })
    },[render])

    async function handler(){
        if(Object.keys(selectedAdress).length>0){
            toast.info('Just a moment please!', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
        
        if(Object.keys(selectedAdress).length>0){
            const totalPrice = cartItems.reduce((acc,items)=>{
                return acc += items.price.cost*items.quantity
            },0)
            let totalPriceObj = {
                totalPrice
            }
            const {data : {order}} = await axios({
                method : "post",
                url : `${url}/pay/checkout/order`,
                data : totalPriceObj,
                headers : {
                    Authorization : localStorage.getItem("token")
                }
            })

            var options = {
                key: "rzp_test_NB2FBWcDYK84Ek",
                "amount": order.amount, 
                "currency": "INR",
                "name": "Flipkart",
                "order_id": order.id, 
                "handler": async function (response){
                    response.cartItems = cartItems
                    response.selectedAdress = selectedAdress
                    axios({
                        method : "post",
                        url : "https://flipkartbackend-f609.onrender.com/pay/verify",
                        data : response,
                        headers : {
                            Authorization : localStorage.getItem("token")
                        }
                    })
                    .then((res)=>{
                        useEmptyCart(setCartItems)
                        navigate("/orders")
                        toast.success('Order Confirmed', {
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
                   
                },
                "theme": {
                    "color": "#3399cc"
                }
            };
            let rzp = new window.Razorpay(options)
            rzp.open()            
        }else{
            
            toast.error('Select the Address', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
    }
    return(
        <>
         <div className="sm:space-x-10 lg:space-x-[10vw] grid grid-cols-1 sm:grid-cols-2">
            {address.length>0? <div>
            <SelectAddress/>
        {address && address.map((value,index)=>{
            return <AddressList address={value} key={index} index={index} />
        })}
        <AddNewAddress/> 
        </div>:<CreateAddress setAddresses={setAddresses}/>}
        <div className="sm:w-11/12 w-11/12 mx-auto sm:mx-0 lg:w-8/12 sm:mr-4 mt-10 h-[41vh] bg-white ">
            <div className=" pt-3 shadow-md">
            <AmountSection/>
            <div onClick={handler} className=" py-2 cursor-pointer text-center font-semibold text-white bg-blue-500 mt-2">Continue</div>
            </div>
        </div>
        </div>
        </>
       
    )
}