import { NavLink } from "react-router-dom";
import "./Footer.scss";
import {
  FaLinkedin,
  FaYoutube,
  FaFacebookSquare,
  FaTwitterSquare,
} from "react-icons/fa";
import {
  MdOutlineMail,
  MdPhoneInTalk,
  MdOutlineMessage,
  MdLocationOn,
} from "react-icons/md";
import Fetch from "../../hooks/Fetch";
import { API } from "../../utiles/shortAPI";

const Footer = () => {
  // Display service procedures in the frontend fetched from backend
  const { loading, error, data } = Fetch(`${API}/pages/footer`);

  return (
    <footer className="footer">
      {loading ? (
        "Loading..."
      ) : error ? (
        <div> {error} </div>
      ) : (
        <div className="footer-sections-container">
          <section className="footer-sitemap">
            <h2 className="title"> {data.sitemap} </h2>
            <ul>
              <li>
                <NavLink to="/"> {data.home} </NavLink>
              </li>
              <li>
                <NavLink to="/about"> {data.about} </NavLink>
              </li>
              <li>
                <NavLink to="/rooms"> {data.rooms} </NavLink>
              </li>

              <li>
                <NavLink to="/contact"> {data.contact} </NavLink>
              </li>
            </ul>
          </section>

          <section className="footer-company">
            <h2 className="title"> {data.company} </h2>
            <ul>
              <li>
                <NavLink to="/story"> {data.story} </NavLink>
              </li>
              <li>
                <NavLink to="/team"> {data.employees} </NavLink>
              </li>

              <li>
                <NavLink to="/awards"> {data.award} </NavLink>
              </li>
              <li>
                <NavLink to="/clients"> {data.client} </NavLink>
              </li>
            </ul>
          </section>

          <section className="footer-social">
            <h2 className="title"> {data.social} </h2>
            <ul>
              <li>
                <a
                  href="https://www.linkedin.com/in/yohannes-habtemariam/"
                  target="_blank"
                >
                  <FaLinkedin className="footer-icon" /> {data.linkedIn}
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/profile.php?id=100009710022882"
                  target="_blank"
                >
                  <FaFacebookSquare className="footer-icon" /> {data.facebook}
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/" target="_blank">
                  <FaYoutube className="footer-icon" /> {data.youtube}
                </a>
              </li>

              <li>
                <a href="https://twitter.com/" target="_blank">
                  <FaTwitterSquare className="footer-icon" /> {data.twitter}
                </a>
              </li>
            </ul>
          </section>

          <section className="footer-contact">
            <h2 className="title"> Contact </h2>
            <ul>
              <li>
                <a href="mailto:uelandrae@gmail.com">
                  <MdOutlineMail className="footer-icon" /> {data.email}
                </a>
              </li>
              <li>
                <a href="tel:123-456-7890">
                  <MdPhoneInTalk className="footer-icon" /> {data.phone}
                </a>
              </li>
              <li>
                <a href="tel:6031112298">
                  <MdLocationOn className="footer-icon" /> {data.location}
                </a>
              </li>
              <li>
                <NavLink to="/contact">
                  <MdOutlineMessage className="footer-icon" /> {data.comment}
                </NavLink>
              </li>
            </ul>
          </section>
        </div>
      )}
      <hr />
      <div className="footer-copyright">
        <p className="compyright"> &copy; {data.copyright} </p>
        <figure className="footer-logo">
          <NavLink to="/">
            <img src={data.logo} alt="Logo of LisaConsult" />
          </NavLink>
        </figure>
      </div>
    </footer>
  );
};

export default Footer;
