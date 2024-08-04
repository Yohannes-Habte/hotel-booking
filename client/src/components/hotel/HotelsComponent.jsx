import React from 'react';
import { NavLink } from 'react-router-dom';
import './HotelComponent.scss';

const HotelsComponent = ({ hotel, handleSearch }) => {
  return (
    <div className="each-hotel-container">
      {/*  Hotel details part */}
      <article className="description-container">
        <h3 className="sub-title"> {hotel.name} </h3>
        <span className="hotel-description">{hotel.description}</span>
      </article>

      {/* Hotel image and assessments part */}
      <div className="hotel-image-evaluation">
        {/*  Image part */}
        <figure className="image-container">
          <img src={hotel.photos[14]} alt="" className="image" />
        </figure>

        {/*  Hotel assessment part */}
        <div className="hotel-evaluation-container">
          <span className="hotel-distance">
            The location of {hotel.name} is {hotel.distance} km from city
            center.
          </span>
          <span className="hotel-taxi"> Free airport taxi </span>
          <span className="hotel-apartment">
            Studo Apartment with air conditioning
          </span>
          {hotel.rating && (
            <div className="hotel-assessment">
              <span className="hotel-evaluation"> The {hotel.name} is Excellent </span>
              <span className="hotel-rating"> The {hotel.name} is rated {hotel.rating} </span>
            </div>
          )}

          <div className="price-btn-container">
            <span className="hotel-price">Price: ${hotel.cheapestPrice}</span>
            <span className="total-price">Includes taxes and fees</span>
            <NavLink to={`/hotels/${hotel._id}`}>
              <button onClick={handleSearch} className="search-item-btn">
                See availability
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelsComponent;
