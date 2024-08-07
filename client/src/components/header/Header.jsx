import { useContext, useState } from "react";
import { MdLocationPin } from "react-icons/md";
import { LuCalendarDays } from "react-icons/lu";
import { BsPersonPlusFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "./Header.scss";
import { SearchContext } from "../../context/search/SearchProvider";

// Date Range
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { SEARCH_ACTION } from "../../context/search/SearchReducer";
import Fetch from "../../hooks/Fetch";
import { API } from "../../utiles/shortAPI";

const Header = ({ pages, page }) => {
  const navigate = useNavigate();
  // Global state variables
  const { dispatch } = useContext(SearchContext);
  // Local state variables
  const [openDate, setOpenDate] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [destination, setDestination] = useState("");
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  // State variables form date-range
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  // Function that handles quantity for the options item
  const handleOption = (option, quantity) => {
    setOptions((prev) => {
      return {
        ...prev,
        [option]:
          quantity === "increase" ? options[option] + 1 : options[option] - 1,
      };
    });
  };

  // Header image
  const { data, loading, error } = Fetch(`${API}/pages/header`);

  // Handle search to navigate to the hotels page. Besides, it will transfer the state variables to the hotels page
  const handleSearch = () => {
    dispatch({
      type: SEARCH_ACTION.NEW_SEARCH,
      payload: { destination, dates, options },
    });
    navigate("/hotels", { state: { destination, dates, options } });
  };

  return (
    <header className="header">
      <section
        className={
          pages === "HotelsHotelAndContact"
            ? "header-container pages"
            : "header-container"
        }
      >
        {/* Header image */}
        {loading ? (
          "Loading"
        ) : error ? (
          <div> {error} </div>
        ) : (
          <figure className="hotel-image">
            <img src={data.image} alt={data.name} className="image" />
          </figure>
        )}

        {/* Header title */}
        {page !== "Conctact" && (
          <h1 className="header-title"> {data.title} </h1>
        )}

        {/* Header search */}
        {pages !== "HotelsHotelAndContact" && (
          <div className="header-search">
            <div className="search-input">
              <MdLocationPin className="icon" />
              <input
                type="text"
                name="destination"
                id="destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Where are youg going?"
                className="input-field"
              />
            </div>

            <div className="select-dates">
              <LuCalendarDays className="icon" />
              <span
                onClick={() => setOpenDate(!openDate)}
                className="date-range"
              >
                {`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(
                  dates[0].endDate,
                  "dd/MM/yyyy"
                )}`}
              </span>

              {/* Date rage from react-date-range */}
              {openDate && (
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setDates([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={dates}
                  minDate={new Date()}
                  className="date"
                />
              )}
            </div>

            <div className="select-items">
              <BsPersonPlusFill className="icon" />
              <span
                onClick={() => setOpenOptions(!openOptions)}
                className="select-quantity"
              >
                {`${options.adult} Adults | ${options.children} Children | ${options.room} Rooms`}
              </span>

              {/* Modal box that shows the options */}
              {openOptions && (
                <div className="options">
                  <div className="option-item">
                    <span>Adults</span>
                    <div className="button-quantiy">
                      <button
                        disabled={options.adult <= 1}
                        onClick={() => handleOption("adult", "decrease")}
                        className="btn-dec"
                      >
                        -
                      </button>
                      <span className="quantity"> {options.adult} </span>
                      <button
                        onClick={() => handleOption("adult", "increase")}
                        className="btn-inc"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="option-item">
                    <span>Children</span>
                    <div className="button-quantiy">
                      <button
                        disabled={options.children <= 0}
                        onClick={() => handleOption("children", "decrease")}
                        className="btn-dec"
                      >
                        -
                      </button>
                      <span className="quantity"> {options.children} </span>
                      <button
                        onClick={() => handleOption("children", "increase")}
                        className="btn-inc"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="option-item">
                    <span>Rooms</span>
                    <div className="button-quantiy">
                      <button
                        disabled={options.room <= 1}
                        onClick={() => handleOption("room", "decrease")}
                        className="btn-dec"
                      >
                        -
                      </button>
                      <span className="quantity"> {options.room} </span>
                      <button
                        onClick={() => handleOption("room", "increase")}
                        className="btn-inc"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="btn-container">
              <button onClick={handleSearch} className="search-btn">
                Search
              </button>
            </div>
          </div>
        )}
      </section>
    </header>
  );
};

export default Header;
