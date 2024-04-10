import { useNavigate } from "react-router-dom"
import img1 from "../../public/1.webp"
export function EmptyCart(){
    const navigate = useNavigate()
    return(
        <div className="bg-gray-100 min-h-[90vh] pt-5">
        <div className="w-10/12 sm:w-8/12 text-center shadow-md min-h-[55vh] space-y-2 bg-white mx-auto">
                <img src={img1} className="mx-auto" width="300px" alt="" />
            <h1 className="text-lg">Your Cart is empty!</h1>
            <h1 className="text-sm">Add items to it now</h1>
            <button onClick={()=>navigate("/")} className="bg-blue-500 text-white rounded-sm px-16 py-2">Shop now</button>
            </div>
            <hr className="mt-10" />
        </div>
         
    )
}