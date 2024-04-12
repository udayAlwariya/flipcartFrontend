import { useRecoilValue } from "recoil"
import { cartAtom } from "../atom"

export function AmountSection(){
    const cartItems = useRecoilValue(cartAtom)
    const totalItems = cartItems.reduce((acc,item)=>{
        return acc += item.quantity
    },0)

    const discount = cartItems.reduce((acc,items)=>{
        return acc += items.quantity*(items.price.mrp-items.price.cost)
    },0)

    const actualPrice = cartItems.reduce((acc,items)=>{
        return acc += items.price.mrp*items.quantity
    },0)

    const discountedPrice = cartItems.reduce((acc,items)=>{
        return acc += items.price.cost*items.quantity
    },0)
    return(
        <div className="border p-3">
            <h1 className="py-3 pl-4 font-semibold text-gray-400">PRICE DETAILS</h1>
            <hr />
            <div className="w-11/12 mt-4 text-md space-y-4 ml-4">
            <div className="flex justify-between">
                <h1>Price({totalItems} items)</h1>
                <h1>₹{actualPrice}</h1>
            </div>
            <div className="flex justify-between">
                <h1>Discount</h1>
                <h1 className="text-green-600">-₹{discount}</h1>
            </div>
            <div className="flex justify-between">
                <h1>Delivery Charges</h1>
                <h1  className="text-green-600">Free</h1>
            </div>
            <hr className="border-dotted border"/>
            <div className="flex font-semibold text-xl justify-between">
                <h1>Total Amount</h1>
                <h1>₹{discountedPrice}</h1>
            </div>
            </div>
            
            <hr className="border-dotted mx-4 mt-4 border"/>
            <h1 className="text-green-600 ml-4 mt-2">You will save ₹ {discount} on this order</h1>
        </div>
    )
}