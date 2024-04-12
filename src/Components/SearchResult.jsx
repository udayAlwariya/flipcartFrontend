import { useRecoilValue } from "recoil"
import { searchResult } from "../atom"
import { Link } from "react-router-dom"

export function SearchResult({setSearch}){
    const products = useRecoilValue(searchResult)
    return(
        <div className={`bg-white text-black z-10 absolute w-12/12 sm:w-[50vw] sm:ml-2 shadow-md`}>
             {products.map((product,index)=><div key={index} className="mt-1 pl-2 ">
        <Link to = {`/productDetails/${product.id}`} onClick={()=>setSearch("")}>{product.title.longTitle}</Link>
    </div>)}
        </div>
       
    )
}