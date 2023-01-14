import {useContext} from "react"
import {CartContext} from '../../context/cart.context'
import Button from '../button/Button'
import './product-card.styles.scss'


// the data comes here from shop.comp.jsx via prop named product


const ProductCard = ({product}) => {
  const {name, price, imageUrl} = product;

  const {addItemToCart} = useContext(CartContext)

  const addProductCart =()=> addItemToCart(product)
   

  return (
    <div className='product-card-container'>
        <img src={imageUrl} alt={`${name}`} />
        <div className="footer">
             <span className='name'>{name}</span>
             <span className='price'>{price}</span>
        </div>
        <Button buttonType='inverted' onClick={addProductCart}>Add To Card</Button>
    </div>
  )
}

export default ProductCard