import "./HotelByCity.scss";
import Fetch from "../../hooks/Fetch";
import PreLoader from "../preLoader/PreLoader";
import { API } from "../../utiles/shortAPI";

const HotelByCity = () => {
  const { data, loading, error } = Fetch(
    `${API}/hotels/countByCity/number?cities=Massawa,Hamburg,Nairobi`
  );

  const { data: hotels } = Fetch(`${API}/pages/home/hotels`);
  console.log("City hotels are:", hotels);
  return (
    <div className="city-hotels">
      {loading ? (
        <PreLoader />
      ) : error ? (
        <p> {error} </p>
      ) : (
        hotels.map((hotel, index) => {
          return (
            <section key={index} className="hotel-container">
              <figure className="image-container">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="hotel-image"
                />
              </figure>

              <article className="hotel-city-props">
                <h2 className="hotel-title"> {hotel.name} </h2>
                <p className="hotel-props"> {data[index]} Properties </p>
              </article>
            </section>
          );
        })
      )}
    </div>
  );
};

export default HotelByCity;
