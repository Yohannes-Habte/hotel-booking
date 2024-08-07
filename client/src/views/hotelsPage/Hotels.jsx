import React, { useState } from "react";
import "./Hotels.scss";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import HotelsComponent from "../../components/hotel/HotelsComponent";
import Fetch from "../../hooks/Fetch";
import PreLoader from "../../components/preLoader/PreLoader";
import CheckoutSteps from "../../components/checkoutSteps/CheckoutSteps";
import { API } from "../../utiles/shortAPI";

const Hotels = () => {
  // useLocation will be used to transfer the state variables from header to this page (hotels page)
  const { state } = useLocation();
  // State variables form the useLocation will be
  const [destination, setDestination] = useState(state.destination);
  const [options, setOptions] = useState(state.options);
  const [dates, setDates] = useState(state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  // Fetching data from backend and sending datat to backend
  const { data, loading, error, reFetch } = Fetch(
    `${API}/hotels?city=${destination}&min=${min || 0}&max=${max || 99999}`
  );

  // Function that handle Search button
  const handleSearch = () => {
    reFetch();
  };

  return (
    <main className="hotels-page">
      <CheckoutSteps step1 step2></CheckoutSteps>

      <section className="hotel-page-container">
        <h1 className="page-title"> Welcome to your Hotel</h1>

        <div className="search-hotels-wrapper">
          {/* Search */}
          <article className="search-container">
            <h2 className="search-title"> Search </h2>

            {/* Destination Input */}
            <div className="input-container">
              <label htmlFor="" className="label">
                Destination
              </label>
              <input
                type="text"
                placeholder={destination}
                className="input-field"
              />
            </div>

            {/* Dates range */}
            <div className="input-container">
              <label htmlFor="" className="label">
                Check-in Date
              </label>
              <span
                onClick={() => setOpenDate(!openDate)}
                className="dates-range"
              >
                {`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(
                  dates[0].endDate,
                  "dd/MM/yyyy"
                )}`}

                {/* Date Range will be used to select new dates other than home page selected dates */}
                {openDate && (
                  <DateRange
                    onChange={(item) => setDates([item.section])}
                    minDate={new Date()}
                  />
                )}
              </span>
            </div>

            {/* Options Elements */}
            <div className="Options-container">
              <label htmlFor="" className="label">
                Options
              </label>
              <div className="options-items">
                <label htmlFor="min">
                  Min price <small>per night</small>
                </label>

                <input
                  type="number"
                  name="min"
                  id="min"
                  onChange={(e) => setMin(e.target.value)}
                  className="input-field"
                />
              </div>

              <div className="options-items">
                <label htmlFor="max">
                  Max price <small>per night</small>
                </label>

                <input
                  type="number"
                  name="max"
                  id="max"
                  onChange={(e) => setMax(e.target.value)}
                  className="input-field"
                />
              </div>

              <div className="options-items">
                <span>Adult</span>
                <input
                  type="number"
                  name=""
                  id=""
                  min={1}
                  placeholder={options.adult}
                  className="input-field"
                />
              </div>

              <div className="options-items">
                <span>Children</span>
                <input
                  type="number"
                  name=""
                  id=""
                  min={0}
                  placeholder={options.children}
                  className="input-field"
                />
              </div>

              <div className="options-items">
                <span>Room</span>
                <input
                  type="number"
                  name=""
                  id=""
                  min={1}
                  placeholder={options.room}
                  className="input-field"
                />
              </div>
            </div>

            <button className="button"> Search </button>
          </article>

          {/* List of hotels */}
          <article className="hotels">
            {loading ? (
              <PreLoader />
            ) : error ? (
              <p> {error} </p>
            ) : (
              <React.Fragment>
                {data.map((hotel) => {
                  return (
                    <HotelsComponent
                      key={hotel._id}
                      hotel={hotel}
                      handleSearch={handleSearch}
                    />
                  );
                })}
              </React.Fragment>
            )}
          </article>
        </div>
      </section>
    </main>
  );
};

export default Hotels;
