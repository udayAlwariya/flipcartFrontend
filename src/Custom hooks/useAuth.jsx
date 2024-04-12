import axios from "axios";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { userLoggedIn } from "../atom";
import { useNavigate } from "react-router-dom";

export function useAuth(){
    const navigate = useNavigate()
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
        .then(()=>{
            setUserLoggedIn(true)
        })
        .catch(()=>{
            setUserLoggedIn(false)
        })
    })
}