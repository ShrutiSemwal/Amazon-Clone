import React from 'react';
import './Checkout.css';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import Subtotal from './Subtotal';

function Checkout() {
    const [{basket}] = useStateValue();

    return (
        <div className="checkout">
            <div className="checkout__left">
            <img
            className="checkout__ad"
            src="https://disruptiveadvertising.com/static/c653234a6e43c8c1c2c33cb2ac5e4477/7f757/Screen-Shot-2018-10-29-at-11.50.03-AM.png"
            alt=""
            />
            {basket?.length === 0 ? (
                <div>
                    <h2>Your Shopping Basket is empty! 🙁</h2>
                    <p>
                        You have no items in your basket. To buy one or more items,
                        click "Add to basket" next to the item. 
                    </p>
                    </div>
            ) : (
                <div>
                    <h2 className="checkout__title">Your Shopping Basket</h2>
                    {/*List out all of the Checkout Products */}
                    {basket.map((item) => (
                       
                       <CheckoutProduct
                       id={item.id}
                       title={item.title}
                       image={item.image}
                       price={item.price}
                       rating={item.rating}
                       />
                    ))}      
                </div>
            )}
            </div>
            {basket.length >0 && (
                <div className="checkout__right">
                    <Subtotal/>
                    </div>
            )}
        </div>
    );
}

export default Checkout;
