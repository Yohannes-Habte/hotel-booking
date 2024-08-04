import React, { useContext, useState } from 'react';
import {
  MdArrowBackIosNew,
  MdArrowForwardIos,
  MdLocationPin,
} from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';
import Fetch from '../../hooks/Fetch';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { SearchContext } from '../../context/search/SearchProvider';
import { UserContext } from '../../context/user/UserProvider';
import Booking from '../../components/modal/Booking';
import './Hotel.scss';
import CheckoutSteps from '../../components/checkoutSteps/CheckoutSteps';

const Hotel = () => {
  // Use naviage
  const navigate = useNavigate();
  // Global state variables
  const { dates, options } = useContext(SearchContext);
  const { user } = useContext(UserContext);

  // Local state variables
  const [slideIndex, setSlideIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  // Get hotel Id using useLocation or useParams
  const location = useLocation();
  const hotelID = location.pathname.split('/')[2];
  const params = useParams();
  const hoteId = params.hotelId;

  // Handle open
  const handleOpen = () => {
    setSlideIndex(slideIndex);
    setOpen(true);
  };

  // Function to handle slider image move
  const sliderMove = (direction) => {
    let newSlideNumber;

    if (direction === 'left') {
      newSlideNumber = slideIndex === 0 ? 5 : slideIndex - 1;
    } else {
      newSlideNumber = slideIndex === 5 ? 0 : slideIndex + 1;
    }

    setSlideIndex(newSlideNumber);
  };

  // Global state variables
  const { data, loading, error } = Fetch(
    `http://localhost:9900/api/hotels/${hoteId}`
  );

  // Total millisenconds per day
  const totalMillisecondsPerDay = 1000 * 60 * 60 * 24;

  // Number of days stayed in the hotel
  const numberOfDays = (startingDay, lastDay) => {
    const timeDifference = Math.abs(lastDay.getTime() - startingDay.getTime());
    const daysDifference = Math.ceil(timeDifference / totalMillisecondsPerDay);
    return daysDifference;
  };

  const totalDays = numberOfDays(dates[0].endDate, dates[0].startDate);

  // Function that calculate the total cost for the hotel
  const totalServiceCost = totalDays * data.cheapestPrice * options.room;

  // Handle booking
  const handleBooking = () => {
    if (user) {
      setOpenModal(true);
    } else {
      alert('Please login!');
      navigate('/login');
    }
  };

  return (
    <main className="single-hotel">
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      {loading ? (
        'Loading...'
      ) : error ? (
        <div> {error} </div>
      ) : (
        <section className="hotel-container">
          {/* Slider for the images to see large picture of each image */}
          {open && (
            <div className="slider">
              <AiOutlineClose
                className="close"
                onClick={() => setOpen(false)}
              />
              <MdArrowBackIosNew
                className="left-arrow"
                onClick={() => sliderMove('left')}
              />
              <span className="previous">Previous</span>
              <figure className="slider-wrapper">
                <img
                  src={data.photos[slideIndex]}
                  alt={data.name}
                  className="slider-image"
                />
              </figure>
              <MdArrowForwardIos
                className="right-arrow"
                onClick={() => sliderMove('right')}
              />
              <span className="next">Next</span>
            </div>
          )}

          <article className="hotel-wrapper">
            <button onClick={handleBooking} className="book-now-btn">
              Book Now
            </button>

            <h1 className="hotel-title"> {data.name} </h1>

            <div className="hotel-address">
              <MdLocationPin className="icon" />
              <span className="address"> {data.address} </span>
            </div>

            <span className="hotel-distance">
              Excellent location - {data.distance} from center of {data.city}
            </span>

            <span className="hotel-price">
              Book with ${data.cheapestPrice} at {data.name} and get a free
              airport taxi
            </span>

            <div className="hotel-images-container">
              {data.photos?.map((photo) => {
                return (
                  <figure key={photo} className="hotel-image-wrapper">
                    <img
                      onClick={() => handleOpen(photo)}
                      src={photo}
                      alt={photo.name}
                      className="hotel-images"
                    />
                  </figure>
                );
              })}
            </div>

            <div className="hotel-details">
              <div className="hotel-explanation">
                <h3 className="hotel-name">Stay in the {data.name} </h3>
                <p className="hotel-description">{data.description}</p>
              </div>
              <div className="hotel-detail-price">
                <h3 className="hotel-title">
                  Perfect for a {totalDays} night stay
                </h3>
                <span className="navigation">
                  Located is not far from where you are. Just turn on navigation
                  and you will be there.
                </span>
                <article className="accommedation">
                  <h3 className="hotel-title">
                    Total Price: ${totalServiceCost}
                  </h3>
                  <span className="nights"> for {totalDays} nights </span>
                </article>
                <button onClick={handleBooking} className="hotel-btn">
                  Reserve or Book Now
                </button>
              </div>
            </div>
          </article>
        </section>
      )}

      {openModal && <Booking setOpenModal={setOpenModal} hotelID={hotelID} />}
    </main>
  );
};

export default Hotel;
