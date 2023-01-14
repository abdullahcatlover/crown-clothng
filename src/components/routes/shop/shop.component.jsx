import {useContext} from 'react'
import { ProductsContext } from '../../../context/Products.context'
import ProductCard from '../../product-card/product-card.component'
import './shop.styles.scss'

// data comes here from    import { ProductsContext } from '../../../context/Products.context'
// and parsed to import ProductCard from '../../product-card/product-card.component' via prop


const Shop = () => {
   const {products} = useContext(ProductsContext)

  return (
    <div className='products-container'>
        {products.map((product) => (
           <ProductCard key={product.id} product={product}/>
        ))}
    </div>
  )
}

export default Shop