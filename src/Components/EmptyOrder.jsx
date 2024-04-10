import img1 from "../../public/order.png"
export function EmptyOrder(){
    return(
        <div>
            <h1 className="text-center sm:mt-5 mt-16 font-semibold text-3xl">NO ORDERS YET</h1>
            <img className="mx-auto" src={img1} alt="" />
        </div>
    )
}