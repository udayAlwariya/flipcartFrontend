import img3 from "../../public/3.jpg"
import {useNavigate} from "react-router-dom"
export function EmptyWishList(){
    const navigate = useNavigate()
    return(
        <div>
            <img src={img3} className="sm:w-[23vw] w-[80vw] mx-auto" alt="" />
            <div className="text-center text-lg text-gray-600 font-semibold">
            <h1>Add items that you like to your wishlist. Review</h1>
            <h1>them anytime and easily move them to the bag.</h1>
            </div>
            <div className="text-center">
            <button onClick={()=>navigate("/")} className="border border-red-600 text-red-600 px-20 mt-5  py-3">Continue Shopping</button>
            </div>
            
        </div>
    )
}