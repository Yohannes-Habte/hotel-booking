import React from 'react';
import axios from 'axios';
import './HotelReservation.scss';
import CheckoutSteps from '../../components/checkoutSteps/CheckoutSteps';

const HotelReservation = () => {
  const totalCost = 500;

  const stripepayment = async () => {
    try {
      const servicePrice = {
        total: totalCost,
      };
      const { data } = await axios.post(
        `http://localhost:9900/api/payment`,
        servicePrice
      );

      if (data) {
        window.location.href = data.url;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="payement-page">
        <CheckoutSteps step1 step2 step3 step4 step5></CheckoutSteps>
      <section className="payement-container">
        <h1 className="payment-title"> Hotel Service Payment </h1>
        <article className='reservation-details'>
          <h2 className='hotel-name'> Hotel Name</h2>
          <p className='reserved-rooms'> The rooms that you reserver are: </p>
          <p className='services'> Details of your demands in the hotel includes:</p>
          <p className='total-price'> Total Price</p>
        </article>
        <button onClick={stripepayment} className="payment-btn">
          Pay
        </button>
      </section>
    </main>
  );
};

export default HotelReservation;
