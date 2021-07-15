import React, {useState, useEffect} from 'react';
import './Payment.css';
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider';
import { Link, useHistory } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { getBasketTotal } from './Reducer';
import CurrencyFormat from 'react-currency-format';
import axios from './axios';
import { db } from './firebase';


function Payment() {
    const [{basket, user}, dispatch] = useStateValue();
    const history = useHistory();
    
    const stripe= useStripe();
    const elements= useElements();
    
    const[succeeded, setSucceeded] = useState(false);
    const[processing, setProcessing] = useState("");
    const[error, setError] = useState(null);
    const[disabled, setDisabled] = useState(true);
    const[clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        //generate a specia stripe secret which allows us to
        //charge a customer

        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                //stripe expects the total in a currencies submit
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();
    }, [basket]);

    console.log("the secret is >>>>>>>", clientSecret);
    console.log('😀', user);

    const handleSubmit = async (event) => {
        //do all the stripe stuff...
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {
            //payment intent= payment confirmation
             
            db
              .collection('users')
              .doc(user?.uid)
              .collection('orders')
              .doc(paymentIntent.id)
              .set({
                  basket: basket,
                  amount: paymentIntent.amount,
                  created: paymentIntent.created
              })

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type: 'EMPTY_BASKET'
            })

            history.replace('/orders')
        })
    }

    const handleChange = event => {
        //listen for changes in cardelement
        //and display any error as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }


    return (
        <div className="payment">
            <div className="payment__container">
                  <h1>
                      Checkout {
                          <Link to="/checkout">
                              ({basket?.length} items)
                          </Link>
                      }
                  </h1>


                {/* Payment section- delivery address */}
                <div className="payment__section">
                   <div className="payment__title">
                    <h3>Delivery Address</h3>
                   </div>
                   <div className="payment__address">
                     <p>
                       {user?.email}
                     </p>
                     <p>38, Vikasnagar</p>
                     <p>Dehradun, Uttarakhand, India</p>
                   </div>
                </div>

                {/* Payment section- review items */}
                <div className="payment__section">
                   <div className="payment__title">
                     <h3>Review items and delivery</h3>
                   </div>
                   <div className="payment__item">
                       {basket.map(item => (
                           <CheckoutProduct
                           id={item.id}
                           title={item.title}
                           image={item.image}
                           price={item.price}
                           rating={item.rating}
                           />
                       ))}

                   </div>
                </div>

                {/* Payment section- payment method */}
                <div className="payment__section">
                   <div className="payment__title">
                      <h3>Payment Method</h3>
                   </div>
                   <div className="payment__details">
                       {/* STRIPE PAYMENT */}
                       <form onSubmit={handleSubmit}>
                           <CardElement onChange={handleChange}/>

                           <div className="payment__priceContainer">
                           <CurrencyFormat
                            renderText={(value) => (
            
                              <h3>Order Total: {value}</h3>
                            
                           )}
              
                          decimalScale={2}
                         value={getBasketTotal(basket)}
                         displayType={"text"}
                         thousandSeparator={true}
                         prefix={"₹"}

                         />
                         <button
                          disabled={processing || disabled
                        || succeeded}>
                            <span>{processing ? <p>Processing</p> :
                            "Buy Now"}</span>
                        </button>
                           </div>

                           {/*Error */}
                           {error && <div>{error}</div>}

                       </form>
                   </div>
                </div>

            </div>
        </div>
    )
}

export default Payment;
