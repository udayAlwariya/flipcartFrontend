import axios from "axios"
import { ImCross } from "react-icons/im";
import { useState } from "react"
import {useSetRecoilState} from "recoil"
import { addressAtom, modalAtom, selectedAddress } from "../atom"

export function Modal(){
    const url = "https://flipkartbackend-f609.onrender.com"
    const setAddresses = useSetRecoilState(addressAtom)
    const setModal = useSetRecoilState(modalAtom)
    const addressSelected = useSetRecoilState(selectedAddress)
    const [formData,setFormData] = useState({
        name : "",
        mobile : "",
        pincode : "",
        town : "",
        city : "",
        address : "",
        state : ""
    })
    function handler(e){
        const {name,value,type} = e.target
        setFormData(prev=>({
            ...prev,
            [name] : type=="number"?Number(value):value
        }))
    }

    function addresshandler(){
        axios({
            method : "post",
            url : `${url}/address/createAddress`,
            headers : {
                Authorization : localStorage.getItem("token")
            },
            data : formData
        })
        .then(()=>{
            addressSelected({})
            setAddresses(prev=>[...prev,formData])
            setModal(false)
            
        })
        .catch(()=>console.log("error"))
    }
    return(
        <div className="h-[100vh] pt-20 bg-gray-100">
             <div className="mx-auto py-5 bg-white relative w-11/12 sm:w-4/12 pb-5 shadow-md">
             <ImCross onClick={()=>setModal(false)} className="absolute right-3 top-3 cursor-pointer"/>
            <div className="flex-col space-y-3 py-3 flex">
                <h1 className="ml-3 font-semibold text-sm">CONTACT DETAILS</h1>
                <input type="text" onChange={handler} className="border py-3 mx-3 rounded-md placeholder:pl-2" name="name" placeholder="Name*" />
                <input type="number" onChange={handler} className="border py-3 mx-3 rounded-md placeholder:pl-2" name="mobile" placeholder="Mobile No*" />
            </div>
            <div className="flex space-y-3 flex-col">
                <h1 className="ml-3 font-semibold mt-6">ADDRESS</h1>
                <input type="number" onChange={handler} className="border py-3 mx-3 rounded-md placeholder:pl-2" name="pincode" placeholder="Pin Code*"/>
                <input type="text" onChange={handler} className="border py-3 mx-3 rounded-md placeholder:pl-2" name="address" placeholder="Address(House No,Building,Street,Area)*" />
                <input type="text" onChange={handler} className="border py-3 mx-3 rounded-md placeholder:pl-2" name="town" placeholder="Locality/Town*" />
                <div className="flex">
                    <input type="text" onChange={handler} className="border py-3 mx-3 rounded-md placeholder:pl-2" name="city" placeholder="City/District*" />
                    <input type="text" onChange={handler} className="border py-3 mx-3 rounded-md placeholder:pl-2" name="state" placeholder="State*" />
                </div>
            </div>
            <div onClick={addresshandler} className="bg-blue-500 cursor-pointer w-11/12 py-3 text-center mx-auto text-white font-semibold border mt-4">ADD ADDRESS</div>
        </div>
        </div>
    )
}
