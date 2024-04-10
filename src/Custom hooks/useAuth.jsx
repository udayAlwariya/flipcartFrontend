import axios from "axios";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { userLoggedIn } from "../atom";

export function useAuth(){
    const url = "https://flipkartbackend-f609.onrender.com"
    const setUserLoggedIn = useSetRecoilState(userLoggedIn) 
    useEffect(()=>{
        axios({
            method : "get",
            url : `${url}/user/auth`,
            headers : {
                Authorization : localStorage.getItem("token")
            }
        })
        .then((res)=>{
            setUserLoggedIn(true)
        })
        .catch((error)=>{
            setUserLoggedIn(false)
        })
    })
}