import { useContext, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Fetch from "../../hooks/Fetch";
import "./Booking.scss";
import { SearchContext } from "../../context/search/SearchProvider";
import CheckoutSteps from "../checkoutSteps/CheckoutSteps";
import { API } from "../../utiles/shortAPI";

const Booking = ({ setOpenModal, hotelID }) => {
  const navigate = useNavigate();
  // Global state variables
  const { dates } = useContext(SearchContext);
  // Local state variables
  const [selectedRooms, setSelectedRooms] = useState([]);

  // Global function
  const { data, loading, error } = Fetch(
    `${API}/hotels/hotel/${hotelID}/rooms`
  );

  //! Handle select room
  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value; // The id of the room

    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((room) => room !== value)
    );
  };
  console.log(selectedRooms);

  // Function that updates the unavailable dates from the backend
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());

    let daysList = [];
    while (date <= end) {
      daysList.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return daysList;
  };
  const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  // Available dates for booking a room
  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      allDates.includes(new Date(date).getTime())
    );
    return !isFound;
  };

  // Reserve your room
  const submitReserve = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const { data } = axios.put(`${API}/rooms/availability/${roomId}`, {
            dates: allDates,
          });
          return data;
        })
      );
      navigate("/payment");
      setOpenModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="modal-booking">
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>

      <article className="modal-container">
        <AiOutlineClose
          onClick={() => setOpenModal(false)}
          className="modal-icon"
        />
        <h3 className="modal-title"> Reserve Your Room </h3>
        <span className="select-room"> Select your room: </span>
        {data.map((item, index) => (
          <div key={index} className="item-container">
            <div className="item-info">
              <div className="item-title"> {item.title} </div>
              <div className="item-description"> {item.description} </div>
              <div className="item-maxPeople">
                Maximum People: <b> {item.maxPeople}</b>
              </div>
              <div className="item-maxPeople"> ${item.price} </div>
            </div>

            <div className="selected-rooms">
              {item.roomNumbers.map((roomNumber) => (
                <div key={roomNumber._id} className="room-container">
                  <label className="label" htmlFor="roomNumber">
                    {roomNumber.number}
                  </label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    name="roomNumber"
                    id="roomNumber"
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                    className="input-field"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        <button onClick={submitReserve} className="reserve-btn">
          Reserve Now
        </button>
      </article>
    </section>
  );
};

export default Booking;
