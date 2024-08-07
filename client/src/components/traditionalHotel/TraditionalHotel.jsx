import React from "react";
import "./TraditionalHotel.scss";
import Fetch from "../../hooks/Fetch";
import { API } from "../../utiles/shortAPI";

const TraditionalHotel = () => {
  // Global state variables
  const { data, loading, error } = Fetch(
    `${API}/hotels?featured=true&min=10&max=199`
  );
  return (
    <div className="traditional-hotels">
      {loading ? (
        "Loading..."
      ) : error ? (
        <div> {error} </div>
      ) : (
        <React.Fragment>
          {data.map((hotel, index) => {
            return (
              <section key={hotel._id} className="hotel-container">
                <figure className="image-container">
                  <img
                    src={hotel.photos[0]}
                    alt={hotel.name}
                    className="image"
                  />
                </figure>

                <article className="hotel-details">
                  <div className="name-price">
                    <h2 className="title"> {hotel.name} </h2>
                    <p className="price">
                      Price <strong>${hotel.cheapestPrice} </strong>
                    </p>
                  </div>
                  <div className="city-rating">
                    <p> {hotel.city} </p>
                    {hotel.rating && (
                      <div className="evaluation">
                        <span className="rating"> {hotel.rating} </span>
                        <span> Excellent </span>
                      </div>
                    )}
                  </div>
                </article>
              </section>
            );
          })}
        </React.Fragment>
      )}
    </div>
  );
};

export default TraditionalHotel;
