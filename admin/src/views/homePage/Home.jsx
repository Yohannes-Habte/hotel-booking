import React from 'react';
import './Home.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Widget from '../../components/widget/Widget';
import FeaturedChart from '../../components/charts/featuredChart/FeaturedChart';
import Chart from '../../components/charts/chart/Chart';
import TableReact from '../../components/tables/table/Table';

const Home = () => {
  return (
    <main className="home-page">
      <Sidebar />

      <section className="home-contianer">
        <Navbar />

        <div className="widgets-container">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>

        <div className="chats-container">
          <FeaturedChart />
          <Chart />
        </div>

        <article className="list-container">
          <TableReact />
        </article>
      </section>
    </main>
  );
};

export default Home;
