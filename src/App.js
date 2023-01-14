import Home from './components/routes/home/Home';
import { Routes, Route } from 'react-router-dom'
import Navigation from './components/navigation/Navigation.conponent';
import Authentication from './components/routes/home/authentication/authentication';
import Shop from './components/routes/shop/shop.component';
import CheckOut from './components/routes/checkout/checkout.component';


/* const Shop = () => {
  return (
    <h1>I am the shop page</h1>
  )
} */





const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path='/shop' element={<Shop />}/>
          <Route path='/auth' element={<Authentication />}/>
          <Route path='/checkout' element={<CheckOut />}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
