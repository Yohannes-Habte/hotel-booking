import React from 'react';
import './Widget.scss';
import { BsArrowUpShort } from 'react-icons/bs';
import { IoIosPerson } from 'react-icons/io';
import { BsCartFill } from 'react-icons/bs';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { MdOutlineAccountBalanceWallet } from 'react-icons/md';

const Widget = ({ type }) => {
  let data;
  // Temporary
  const amount = 100;
  const percentage = 20;
  switch (type) {
    case 'user':
      data = {
        title: 'Users',
        isMoney: false,
        link: 'See all users',
        icon: (
          <IoIosPerson
            className="icon"
            style={{ color: 'green', backgroundColor: "#E6E6FA" }}
          />
        ),
      };
      break;
    case 'order':
      data = {
        title: 'Orders',
        isMoney: false,
        link: 'View all orders',
        icon: (
          <BsCartFill
            className="icon"
            style={{ color: '#6495ed', backgroundColor: '#e6e6fa' }}
          />
        ),
      };
      break;
    case 'earning':
      data = {
        title: 'Earning',
        isMoney: true,
        link: 'View net earnings',
        icon: (
          <RiMoneyDollarCircleLine
            className="icon"
            style={{ color: '#006400', backgroundColor: '#E6E6FA' }}
          />
        ),
      };
      break;
    case 'balance':
      data = {
        title: 'Balance',
        isMoney: true,
        link: 'See details',
        icon: (
          <MdOutlineAccountBalanceWallet
            className="icon"
            style={{ color: '	#ff00ff', backgroundColor: '#e6e6fa' }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <section className="widget">
      <div className="widget-left">
        <span className="title"> {data.title} </span>
        <span className="counter">
          {data.isMoney && '$'} {amount}
        </span>
        <span className="link"> {data.link} </span>
      </div>
      <div className="widget-right">
        <div className="percentage positive">
          <BsArrowUpShort /> {percentage}%
        </div>
        {data.icon}
      </div>
    </section>
  );
};

export default Widget;
