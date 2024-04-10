import  axios  from "axios"

export function useDeleteWish(cartItems,wishList,setWishList,id){
    let array = cartItems.filter(item=>item.id == id)
    axios({
        method : "delete",
        url : "https://flipkartbackend-f609.onrender.com/wish/deleteWish/" + id,
        headers : {
            Authorization : localStorage.getItem("token")
        }
    })
    .then(res=>{
    let filteredArray = wishList.filter(val=>val.id!=id)
    setWishList(filteredArray)
    })
    return array
}