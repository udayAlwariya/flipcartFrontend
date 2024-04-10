import { useRecoilState } from "recoil"
import { modalAtom } from "../atom"

export function SelectAddress(){
    const[modal,setOpenModal] = useRecoilState(modalAtom)
    return(
        <div className="flex sm:mx-[25vw] mx-auto w-8/12 mt-5 justify-between items-center">
            <h1 className="font-semibold text-[17px] ">Select Delivery Address</h1>
            <button onClick={()=>setOpenModal(true)} className="border hidden sm:block font-semibold border-black text-gray-700 rounded-sm px-3 py-2 text-[12px]">ADD NEW ADDRESS</button>
        </div>
    )
}