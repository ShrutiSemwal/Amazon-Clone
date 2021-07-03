import React from 'react';
import './Home.css';
import Product from './Product';

function Home() {
    return (
        <div className="home">
            <img
            className="home__image"
            src="https://images-eu.ssl-images-amazon.com/images/G/31/AmazonVideo/2020/X-site/Multititle/Bollywood/1500x600_Hero-Tall_np_bolly._CB405289994_.jpg"
            alt="" />

            {/*Product id, title, price, rating, image */}
            <div className="home__row">
            <Product
            id="1232142"
            title="The Lean Startup: How Constant Innovation Creates Radically Successful Businesses Paperback"
            price={1600}
            rating={4}
            image="https://images-na.ssl-images-amazon.com/images/I/81vvgZqCskL.jpg"
            />
            <Product
            id="1232143"
            title="Echo Smart Speaker with Alexa"
            price={7999.00}
            rating={5}
            image="https://5.imimg.com/data5/DP/RC/AC/SELLER-12479946/amazon-echo-smart-speaker-with-alexa-powered-by-dolby-black-500x500.jpg"
            />
            </div>

            <div className="home__row">
            <Product
            id="1232144"
            title="Samsung Galaxy A12 (Blue,4GB RAM, 64GB Storage) with No Cost EMI/Additional Exchange Offers"
            price={12,999}
            rating={4}
            image="https://images-na.ssl-images-amazon.com/images/G/31/img21/Wireless/Samsung/SamsungM/Hex_MAy/D23788775_IN_WLD_SamsungBAU_HexCard_2._SY530_QL85_.jpg"
            />
            <Product
            id="1232145"
            title="Bella Vita Organic Man Perfume Gift Set for Men 6x10 ml Perfumes Luxury Scent with Long Lasting Fragrance"
            price={499}
            rating={4}
            image="https://images-eu.ssl-images-amazon.com/images/I/618N7-lBF6S._AC_UL200_SR200,200_.jpg"
            />
            <Product
            id="1232146"
            title="RAJMANDIR FABRICS Women's Cotton Anarkali Kurta Pant & Dupatta Set"
            price={1410}
            rating={5}
            image="https://images-eu.ssl-images-amazon.com/images/I/81pUPOfSG0S._AC_UL200_SR200,200_.jpg"
            />

            </div>

            <div className="home__row">
            <Product
            id="1232147"
            title="Hendmadesy Leather Journal Antique Handmade Diary Notebook with Semi Precious Stone Buckle Closure Handicraft Gift Vintage Travel Dairy Unlined Paper 200 Pages Book - 7 x 5 Inches, Yellow"
            price={475}
            rating={4}
            image="https://m.media-amazon.com/images/I/81Zy44i-CKS._AC_UL480_FMwebp_QL65_.jpg"
            />

            </div>
           
              {/*Product */}
           
        </div>
    );
}

export default Home;
