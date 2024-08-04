import React from 'react';
import './FeaturedChart.scss';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FiMoreVertical } from 'react-icons/fi';
import {BiDownArrowAlt, BiUpArrowAlt} from "react-icons/bi"

const FeaturedChart = () => {
  return (
    <div>
      <div className="featured-chart">
        <section className="total-revenue">
          <h1 className='title'> Total Revenue </h1>
          <FiMoreVertical className="icon" />
        </section>
        <div className="details-container">
          <div className="chart">
            <CircularProgressbar value={80} text="80%" strokeWidth={9} />
          </div>
          <p className="title">Total sales made today </p>
          <p className="amount"> $400 </p>
          <p className="description">
            Previous transactions processing. Last payments may not be included.
          </p>

          <div className="summary">
            <div className="item">
              <div className="item-title">This Week</div>
              <div className="item-result positive">
                <BiUpArrowAlt />
                <div className="item-amount">$9.7k</div>
              </div>
            </div>

            <div className="item">
              <div className="item-title">Last Week</div>
              <div className="item-result positive">
                <BiUpArrowAlt />
                <div className="item-amount">$6.5k</div>
              </div>
            </div>

            <div className="item">
              <div className="item-title">Last Month</div>
              <div className="item-result negative">
                <BiDownArrowAlt />
                <div className="item-amount">$8.4k</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedChart;
