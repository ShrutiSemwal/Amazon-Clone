import React, {useEffect} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login';
import Orders from './Orders';
import Payment from './Payment';
import { useStateValue } from './StateProvider';
import {auth} from './firebase';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';

const promise = loadStripe("Your_API_Key");

function App() {
   
  const[{user}, dispatch] = useStateValue();
   
  //useEffect <<<<<< Powerful!!!!!
  // Piece of code which runs based on a given condition

  useEffect(() => {
       const unsubscribe = auth.onAuthStateChanged((authUser) => {
         if(authUser) {
           //the user is logged in...
           dispatch({
             type: "SET_USER",
             user: authUser,
           })
         }else {
           //the user is logged out...
           dispatch({
             type: "SET_USER",
             user: null,
           });
         }
       });

       return () => {
         //any cleanup operation goes here...
         unsubscribe();
       };
       
  }, []);

  console.log('USER is >>>>', user);

  return (
    <Router>
      <div className="app">
      <Switch>
      <Route path="/orders">
          <Header/>
          <Orders/>
        </Route>
        <Route path="/checkout">
          {/* /checkout/sdfggg/page */}
          <Header/>
          <Checkout/>
        </Route>
        <Route path="/payment">
          <Header/>
          <Elements stripe={promise}>
          <Payment/>
          </Elements>
        </Route>
        <Route path="/login">
          <Login/>
        </Route>
        {/* This is the default route*/}
        <Route path="/">
          <Header/>
          <Home />
        </Route>
      </Switch>
    </div>
    </Router>
    
  );
}

{/*We need React-Router */}

      {/* localhost.com/ */}
      {/* localhost.com/checkout  */}
      {/* localhost.com/login   */}

export default App;
