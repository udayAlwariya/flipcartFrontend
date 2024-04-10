import {useNavigate} from "react-router-dom"
import img1 from "../../public/logo.png"
export function CheckoutNavbar(){
    
    const navigate = useNavigate()

    return(
        <div className="font-semibold pl-20 text-white bg-customBlue py-4">
            <img src={img1} className="cursor-pointer" onClick={()=>navigate("/")} width="120px" alt="" />
        </div>
    )
}