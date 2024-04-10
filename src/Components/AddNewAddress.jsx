
import { useSetRecoilState } from "recoil"
import { modalAtom } from "../atom"

export function AddNewAddress(){
    const setOpenModal = useSetRecoilState(modalAtom)
    return(
        <>
        <h1 onClick={()=>setOpenModal(true)} className="cursor-pointer  sm:mx-[25vw] mx-auto pl-3 font-semibold border-dotted border-2 w-11/12 sm:w-8/12 py-5">+ Add New Address</h1>
        </>
      
    )
}