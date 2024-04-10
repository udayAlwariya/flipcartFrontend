import { AmountSection } from "./AmountSection"

export function CartItems({cartItems,addToCart,removeFromCart,removeProduct,navigate}){
    return (
        <div className="bg-gray-100 sm:flex relative pt-5 ">
            <div>
            <div className=" text-center border shadow-sm min-h-[10vh] space-y-2 bg-white mx-auto sm:mx-[15vw] sm:w-8/12"></div>
            <div className="sm:w-8/12 mx-auto  mt-3 py-5 border shadow-sm min-h-[10vh] space-y-2 bg-white sm:mx-[15vw]">
            {cartItems && cartItems.map((value,index)=>{
                    return <div key={index}>
                    <div className="ml-2 mt-3">
                    <div className="flex">
                    <img src={value.url} className="ml-3" width="115px" alt="No image Found" />
                    <div className="pl-3 w-10/12">
                       <h1>{value.title.longTitle}</h1>
                       <h1>Seller : Vision Star</h1>

                       <div className="flex items-center mt-3 space-x-2">
                        <h1 className="text-gray-500"><del>₹{value.price.mrp}</del></h1>
                        <h1 className="text-2xl font-semibold">₹{value.price.cost}</h1>
                        <div>
                        <h1 className="text-green-500 font-semibold text-sm">{value.price.discount} Off</h1>
                        <h1 className="text-green-500 font-semibold text-sm">{Math.floor(10*Math.random())} Offers applied</h1>
                        </div>
                       </div>

                    </div>
                </div> 
                 <div className="flex items-center mt-2 space-x-7">
                    <div className="space-x-1 flex ">
                        <button onClick={()=>removeFromCart(value.id)} className="rounded-full border font-semibold  w-9 h-9">-</button>
                        <button className="border h-8 w-14">{value.quantity}</button>
                        <button onClick={()=>addToCart(value.id)} className="rounded-full font-semibold border w-9 h-9">+</button>
                    </div>
                    <h1 onClick={()=>removeProduct(value.id)} className="font-semibold cursor-pointer text-xl">Remove</h1>
                 </div>
                 <hr className="mt-3 mb-4"/>
                    </div>
                    </div>            
            })}
            <div className="flex justify-end">
            <button onClick={()=>navigate("/checkout/cart/address")} className="px-16 py-3 mr-3 text-white bg-orange-500">PLACE ORDER</button>
            </div>
            </div>
            </div>
            
           <div className="sm:w-3/12 h-[41vh] bg-white right-20">
                <AmountSection cartItems={cartItems}/>
           </div>

        </div>
    )
    
}