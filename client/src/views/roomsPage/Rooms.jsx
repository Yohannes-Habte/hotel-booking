import  { useContext, useState } from 'react';
import './Rooms.scss';
import Fetch from '../../hooks/Fetch';
import { UserContext } from '../../context/user/UserProvider';
import { AiOutlineClose } from 'react-icons/ai';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { API } from '../../utiles/shortAPI';

const Rooms = () => {
  // Global variables
  const { data, loading, error } = Fetch(
    `${API}/pages/rooms`
  );

  const { user } = useContext(UserContext);
  // Local state variables
  const [slideIndex, setSlideIndex] = useState(0);
  const [open, setOpen] = useState(false);
  console.log('The bedroom is', slideIndex);

  // Handle open for a specific room image
  const handleOpen = () => {
    setSlideIndex(slideIndex);
    setOpen(true);
  };

  // Function to handle slider image move
  const sliderMove = (direction) => {
    let newSlideNumber;

    if (direction === 'left') {
      newSlideNumber = slideIndex === 0 ? 14 : slideIndex - 1;
    } else {
      newSlideNumber = slideIndex === 14 ? 0 : slideIndex + 1;
    }

    setSlideIndex(newSlideNumber);
  };

  return (
    <main className="rooms-page">
      <section className="rooms-page-container">
        <h1 className="title"> Welcome {user?.firstName} to Your Rooms</h1>

        {loading ? (
          'Loading...'
        ) : error ? (
          <div> {error} </div>
        ) : (
          <div className="slide-rooms-container">
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
                    src={data[slideIndex].image}
                    alt={data.title}
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
            <div className="rooms-container">
              {data.map((room, index) => {
                return (
                  <figure key={index} className="image-container">
                    <img
                      src={room.image}
                      alt={room.title}
                      onClick={() => handleOpen(room)}
                      className="image"
                    />
                  </figure>
                );
              })}
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default Rooms;
