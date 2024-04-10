import { useSetRecoilState, useRecoilState } from "recoil"
import { addressAtom, renderAtom, selectedAddress } from "../atom"
import axios from "axios"

export function AddressList({address,index}){
    const url = "https://flipkartbackend-f609.onrender.com"
    const [addresses,setAddresses] = useRecoilState(addressAtom)
    const render = useSetRecoilState(renderAtom)
    const setSelectedAddress = useSetRecoilState(selectedAddress)
    function radioHandler(id,e){
        
        if(e.target.checked){
        render(true)
        const address = addresses.filter((val)=>val._id==id)[0]
        setSelectedAddress(address)
        }
    }

    function removeHandler(id){
        axios({
            method : "delete",
            url : `${url}/address/deleteAddress/`+id,
            headers : {
                Authorization : localStorage.getItem("token")
            }
        })
        .then((res)=>{
            const filteredAddresses = addresses.filter(adrs=>adrs._id != id)
            setAddresses(filteredAddresses)
        })
            

    }

    return(
        <div className="sm:mx-[25vw] mx-auto w-11/12 sm:w-8/12 pb-5 ">
           
            <h1 className="text-sm font-semibold mt-5 text-gray-700">Address {index+1}</h1>
            <div className="shadow-md pl-3 py-4 border mt-5">
                <div className="flex space-x-2">
                <input type="radio" id={`${address._id}`} onChange={(e)=>radioHandler(address._id,e)} name="address" />
                <label htmlFor={`${address._id}`} className="text-sm font-semibold"  name="address">{address.name}</label>
                </div>
                <div className="text-sm text-gray-600 mt-4">
                <h1>{address.address},{address.town},{address.city}</h1>
                <h1>{address.city},{address.state}-{address.pincode}</h1>
                </div>
                <h1 className="text-sm mt-4 text-gray-600">Mobile:<span className="text-gray-800 font-semibold">{address.mobile}</span></h1>
                <h1 className="text-sm mt-4 text-gray-600">o Pay on delivery available</h1>
                <div className="flex mt-3 space-x-4">
                    <button onClick={()=>removeHandler(address._id)} className="border font-semibold border-black rounded-sm px-2 py-1 text-sm">REMOVE</button>
                </div>
            </div>
        </div>
    )
}