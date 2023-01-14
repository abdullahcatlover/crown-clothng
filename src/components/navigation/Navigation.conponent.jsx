import { Fragment, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { UserContext } from '../../context/User.context';
import { CartContext } from '../../context/cart.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import './navigation.styles.scss';



const Navigation = () => {
   const { currentUser } = useContext(UserContext);
   const {isCartOpen} = useContext(CartContext)




   return (
      <Fragment>
         <div className="navigation">
            <Link to='/' className='logo-container'>
               <CrownLogo className='logo' />
            </Link>
            <div className='nav-links-container'>
               <Link to='/shop' className='nav-link'>
                  Shop
               </Link>
               {
                  currentUser ? (
                     <span className='nav-link' onClick={signOutUser}>Sign Out</span>
                  ) : (
                     <Link className='nav-link' to='/auth'>
                        Sign in
                     </Link>
                  )
               }
               <CartIcon />
            </div>
            {isCartOpen && <CartDropdown /> }
         </div>
         <Outlet />
      </Fragment>
   )
}


export default Navigation;