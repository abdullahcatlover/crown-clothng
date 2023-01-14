import {useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import { CartContext } from '../../context/cart.context'
import Button from '../button/Button'
import CartItem from '../cart-item/cart-item.component'
import './cart-dropdown.styles.scss'


// data comes from cart context and parsed to cart-item cie prop cartItem={item}
const CartDropdown = () => {
   const {CartItems} = useContext(CartContext)
   
   const navigate = useNavigate();

   const goToCheckOutHandler =()=> {
    navigate('/checkout')
   }


  return (
    <div className='cart-dropdown-container'>
        <div className="cart-items">
           {
            CartItems.map(item => <CartItem key={item.id} cartItem={item}/>)
           }
        </div>
        <Button onClick={goToCheckOutHandler}>Go To Checkout</Button>
       
    </div>
  )
}

export default CartDropdown