import { Banner } from "../Components/Banner";
import { Category } from "../Components/Category"
import { Slider } from "../Components/Slider";
import { useGetAllProducts } from "../Custom hooks/useGetAllProducts";
import { useRemoveInput } from "../Custom hooks/useRemoveInput";

export function Home(){
    const products = useGetAllProducts()
    useRemoveInput()
    
    return(
        <div>
        <div className='shadow-md mx-4 pb-3'>
            <Category/>
        </div> 
           <Banner/>
           <div className="mt-5 ">
           <Slider data={products}/>
           </div>
        </div>
     
    )
}