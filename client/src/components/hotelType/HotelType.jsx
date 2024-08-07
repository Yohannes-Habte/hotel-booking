import React from "react";
import "./HotelType.scss";
import Fetch from "../../hooks/Fetch";
import PreLoader from "../preLoader/PreLoader";
import { API } from "../../utiles/shortAPI";

const HotelType = () => {
  // Global state variables
  const { data, loading, error } = Fetch(`${API}/hotels/countByType/details`);
  return (
    <div className="hotel-type">
      {loading ? (
        <PreLoader />
      ) : error ? (
        <div> {error} </div>
      ) : (
        data.map((hotel, index) => {
          return (
            <section key={index} className="type-container">
              <figure className="image-container">
                <img src={hotel.image} alt={hotel.type} className="image" />
              </figure>

              <article className="title-props">
                <h2 className="title"> {hotel.type} </h2>
                <p className="props">
                  <strong> {hotel.count}</strong> {hotel.type}
                </p>
              </article>
            </section>
          );
        })
      )}
    </div>
  );
};

export default HotelType;
