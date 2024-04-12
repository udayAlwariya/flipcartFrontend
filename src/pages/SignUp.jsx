import { useState} from "react";
import { Link,useNavigate} from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { userLoggedIn } from "../atom";
import { useRemoveInput } from "../Custom hooks/useRemoveInput";

export function Signup(){
    const Url = "https://flipkartbackend-f609.onrender.com"
    const navigate = useNavigate()
    const setUserLoggedIn = useSetRecoilState(userLoggedIn)
    useRemoveInput()
    const [formData,setFormData] = useState({
        firstName : "",
        lastName : "",
        email : "",
        password : ""
    })
    function changeHandler(e){
        const {name,value} = e.target
        setFormData((prev)=>({
            ...prev,
            [name] : value
        }))
    }
    function clickHandler(e){
        e.preventDefault()
        axios({
            method : "post",
            url : `${Url}/user/signup`,
            data : formData
        }).then((res)=>{
            toast.success("Signup Successfull", {
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
            setUserLoggedIn(true)
            setFormData({
                firstName : "",
                lastName : "",
                email : "",
                password : ""
            })
            let token = res.data.token
            localStorage.setItem("token","Bearer " + token)
        }).catch((error)=>{
            toast.error(error.response.data.message, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            console.log(error)
        })
    }
    return(
        <form className="mt-10 mx-auto sm:border-2 sm:shadow-md border-white-500 sm:w-7/12 md:w-5/12 lg:w-4/12 2xl:w-3/12 rounded-md">
            <div className="mt-5 text-center mb-6">
                <h1 className="font-bold text-blue-500 text-3xl">Sign Up</h1>
                <p className="text-gray-500 w-2/3 mx-auto mt-3">Enter your information to create an account</p>
            </div>

            <div className="mx-auto w-10/12">
            <div className="mb-2">
                <p className="font-bold mb-2">First Name</p>
                <input className="border rounded-md  w-full py-1 pl-2" value={formData.firstName} onChange={changeHandler} name="firstName" type="text" placeholder="John"/>
            </div>
            <div className="mb-2">
                <p className="font-bold mb-2">Last Name</p>
                <input className="border rounded-md w-full py-1 pl-2" value={formData.lastName} onChange={changeHandler} name="lastName" type="text" placeholder="Doe"/>
            </div>
            <div className="mb-2">
                <p className="font-bold mb-2">Email</p>
                <input className="border rounded-md  w-full py-1 pl-2" value={formData.username} onChange={changeHandler} name="email" type="text" placeholder="JohnDoe@gmail.com"/>
            </div>
            <div className="mb-4">
                <p className="font-bold">Password</p>
                <input className="border rounded-md  w-full py-1 pl-2" value={formData.password} onChange={changeHandler} name="password" type="password" />
            </div>
            <div>
            <button onClick={(e)=>clickHandler(e)} className="border bg-blue-500 mb-3 text-white rounded-md  w-full py-1 pl-2">Signup</button>
            <p className="text-center mb-6">Already have an account ? <Link to="/signin"><u>Signin</u></Link></p>
            </div>
            
            </div>
        
        </form>
    )
}