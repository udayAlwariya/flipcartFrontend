import { useRecoilValue } from "recoil"
import { searchResult } from "../atom"
import { Link } from "react-router-dom"

export function SearchResult({setSearch,isUserLoggedIn}){
    const products = useRecoilValue(searchResult)
    return(
        <div className={`bg-white text-black z-10 absolute w-12/12 sm:w-[45vw] sm:ml-[18.9vw] sm:max-md:ml:[10vw] shadow-md`}>
             {products.map((product,index)=><div key={index} className="mt-1 pl-2 ">
        <Link to = {`/productDetails/${product.id}`} onClick={()=>setSearch("")}>{product.title.longTitle}</Link>
    </div>)}
        </div>
       
    )
}