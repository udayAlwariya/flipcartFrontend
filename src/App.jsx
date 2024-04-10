import {BrowserRouter, Route, Routes} from "react-router-dom"
import { Home } from './pages/Home'
import {  Signin } from './pages/Signin'
import { Cart } from './pages/Cart'
import { ProductDetails } from './pages/ProductDetails'
import { Signup } from './pages/SignUp'
import { Address } from './pages/Address'
import { useRecoilValue } from 'recoil'
import { modalAtom } from './atom'
import { Modal } from './Components/Modal'
import { WishList } from './pages/Wishlist'
import { Orders } from './pages/Orders'
import { OrderDetails } from './pages/OrderDetails'
import { Navbar } from "./Components/Navbar"

function App() {
  const modal = useRecoilValue(modalAtom)
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>

      <Route path='/' element = {<Home/>}/>
      <Route path='/signin' element = {<Signin/>}/>
      <Route path='/signup' element = {<Signup/>}/>
      <Route path='/checkout/cart' element = {<Cart/>}/>
      <Route path='/checkout/cart/address' element = {modal?<Modal/>:<Address/>}/>
      <Route path='/checkout/buy/:id/address' element = {modal?<Modal/>:<Address/>}/>
      <Route path='/productDetails/:id' element = {<ProductDetails/>}/>
      <Route path='/wishlist' element = {<WishList/>}/>
      <Route path='/orders' element = {<Orders/>}/>
      <Route path='/orderDetails/:productId/:orderId' element = {<OrderDetails/>}/>

    </Routes>
    
    </BrowserRouter>
  )
}

export default App
