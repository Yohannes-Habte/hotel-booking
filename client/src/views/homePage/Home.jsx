import React from 'react';
import './Home.scss';
import Header from '../../components/header/Header';
import HotelType from '../../components/hotelType/HotelType';
import TraditionalHotel from '../../components/traditionalHotel/TraditionalHotel';
import HotelByCity from '../../components/hotelByCity/HotelByCity';

const Home = () => {
  return (
    <main className="home-page">
      <Header />
      <section className="home-container">
        <h1 className="country-hotel-title">Hotels By City</h1>
        <HotelByCity />

        <h2 className="city-hotel-title">Hotels Types</h2>
        <HotelType />

        <h2 className="modern-hotel-title"> Recreation </h2>
        <TraditionalHotel />
      </section>
    </main>
  );
};

export default Home;
