import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Product from './components/Product';
import Contact from './components/Contact';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Login from './components/Login';
import Register from './components/Register';
import Admin from './components/Admin';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');

  const handleLogin = (token) => {
    setToken(token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setToken('');
    setIsLoggedIn(false);
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Switch>
        {/*         Test để sửa trang admin
 */}      <Route exact path="/adminedit" component={Admin} />
        <Route exact path="/" component={Home} />
        <Route exact path="/products" component={Product} />
        <Route exact path="/products/:bookId" component={ProductDetail} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/login" component={Login} />



      
        <Route exact path="/register" component={Register} />
        <Route exact path="/admin" render={() => isLoggedIn ? <Admin token={token} /> : <Redirect to="/login" />} />

        <Redirect to="/" />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
