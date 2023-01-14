import { createContext, useState, useEffect} from "react";

// function to find inside of existing array any cart items that exist that match ID of the product
// if we find then increment the quantity, otherwise make a new cart item
const addCartItem =(cartItems, productToAdd)=> {
    // 1. find if cartItem contains productToAdd
    const exisitingCartItem = cartItems.find((cartItem)=> cartItem.id === productToAdd.id)

    //2. if found increment quantity, if quantity is incremented return a new item

    if(exisitingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? 
        {...cartItem, quantity: cartItem.quantity + 1 } : cartItem)
    }

    //3. return new array with modified cart items/ new cart item
   return [...cartItems, {...productToAdd, quantity: 1}]
}



//-------------------------------------------------------------remove Item From Cart start--------------------------------------------------
const removeCartItem =(cartItems, cartItemToRemove)=> {
   //  find the cart item tp remove
   const exisitingCartItem = cartItems.find((cartItem)=> cartItem.id === cartItemToRemove.id)


   // check if quantity is equal to one, if it is remove the item from cart
  if(exisitingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
  }


   //return back cart items with matching cart item with reduced quantity
   return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id ? 
         {...cartItem, quantity: cartItem.quantity - 1 } : cartItem)
}

//-------------------------------------------------------------remove Item From Cart end--------------------------------------------------
const clearCartItem =(cartItems, cartItemToClear)=> {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id)
}

//-----------------------------------------------------clear cart item start-----------------------------------------------





//-----------------------------------------------------clear cart item end-----------------------------------------------


export const CartContext = createContext({
   isCartOpen: false,
   setIsCartOpen: ()=> false,
   CartItems: [],
   addItemToCart: ()=> {},
   removeItemFromCart: ()=> {},
   clearItemFromCart: ()=> {},
   cartCount: 0,
   cartTotal: 0
})

// 

export const CartProvider = ({children})=> {

    // states start-----------------------------------------------------
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [CartItems, setCartItems] = useState([])
    const [cartCount, setCartCount] = useState(0)
    const [cartTotal, setCartTotal] = useState(0)
// states end-----------------------------------------------------


// controlling cart count  start
useEffect(()=> {
   const newCartCount =()=> CartItems.reduce((total, cartItem)=> total + cartItem.quantity, 0)
   setCartCount(newCartCount)
}, [CartItems])
// controlling cart count  end

// controlling cart total start

 useEffect(()=> {
    const newCartTotal =()=> CartItems.reduce((total, cartItem)=> total + cartItem.quantity * cartItem.price, 0)
    setCartTotal(newCartTotal)
 }, [CartItems])

// controlling cart total end

    const addItemToCart =(productToAdd)=> {
        setCartItems(addCartItem(CartItems, productToAdd))
     }

     const removeItemToCart =(cartItemToRemove)=> {
        setCartItems(removeCartItem(CartItems, cartItemToRemove))
     }

     const clearItemFromCart =(cartItemToRemove)=> {
        setCartItems(clearCartItem(CartItems, cartItemToRemove))
     }




    const value = {isCartOpen, 
        setIsCartOpen, 
        addItemToCart,
        removeItemToCart,
        clearItemFromCart,
        CartItems, 
        cartCount,
        cartTotal}


   

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}