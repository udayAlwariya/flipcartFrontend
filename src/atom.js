import {atom} from "recoil"

export const productAtom = atom({
    key : "productKey",
    default : []
})

export const userLoggedIn = atom({
    key : "userLoggedIn",
    default : false
})

export const cartAtom = atom({
    key : "cartItem",
    default : []
})

export const modalAtom = atom({
    key : "modal",
    default : false
})

export const addressAtom = atom({
    key : "address",
    default : []
})

export const renderAtom = atom({
    key : "render",
    default : false
})

export const selectedAddress = atom({
    key : "selected",
    default : {}
})

export const searchResult = atom({
    key : "search",
    default : []
})

export const inputSearch = atom({
    key : "input",
    default : ""
})
