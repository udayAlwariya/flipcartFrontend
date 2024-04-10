import { useSetRecoilState } from "recoil"
import { inputSearch } from "../atom"
import { useEffect } from "react"

export function useRemoveInput(){
    const setSearch = useSetRecoilState(inputSearch)
    useEffect(()=>{
        setSearch("")
    },[])
}