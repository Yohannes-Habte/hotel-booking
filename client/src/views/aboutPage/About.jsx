import { useState } from "react";
import Fetch from "../../hooks/Fetch";
import {
  IoIosArrowDropupCircle,
  IoIosArrowDropdownCircle,
} from "react-icons/io";
import "./About.scss";
import { API } from "../../utiles/shortAPI";

const About = () => {
  // Local state variable
  const [open1, setOpten1] = useState(false);
  const [open2, setOpten2] = useState(false);
  const [open3, setOpten3] = useState(false);
  const [open4, setOpten4] = useState(false);
  const [open5, setOpten5] = useState(false);
  const [open6, setOpten6] = useState(false);

  // Global useEffect function
  const { data } = Fetch(`${API}/pages/about`);
  return (
    <main className="about-page">
      <section className="about-container">
        <h1 className="about-title"> {data.title} </h1>

        <section className="booking-steps">
          <h3 className="steps-title"> {data.stepsTitle} </h3>

          {/* Step 1 */}
          <article className="step">
            <h3
              onClick={() => setOpten1(!open1)}
              className={open1 ? "step-title" : "default"}
            >
              {data.step1}
            </h3>
            {open1 ? (
              <IoIosArrowDropupCircle
                onClick={() => setOpten1(!open1)}
                className="up-arrow"
              />
            ) : (
              <IoIosArrowDropdownCircle
                onClick={() => setOpten1(!open1)}
                className="down-arrow"
              />
            )}

            {open1 && <p className="paragraph"> {data.paragraph1} </p>}
          </article>

          {/* Step 2 */}
          <article className="step">
            <h3
              onClick={() => setOpten2(!open2)}
              className={open2 ? "step-title" : "default"}
            >
              {data.step2}
            </h3>

            {open2 ? (
              <IoIosArrowDropupCircle
                onClick={() => setOpten2(!open2)}
                className="up-arrow"
              />
            ) : (
              <IoIosArrowDropdownCircle
                onClick={() => setOpten2(!open2)}
                className="down-arrow"
              />
            )}

            {open2 && <p className="paragraph"> {data.paragraph2} </p>}
          </article>

          {/* Step 3 */}
          <article className="step">
            <h3
              onClick={() => setOpten3(!open3)}
              className={open3 ? "step-title" : "default"}
            >
              {data.step3}
            </h3>

            {open3 ? (
              <IoIosArrowDropupCircle
                onClick={() => setOpten3(!open3)}
                className="up-arrow"
              />
            ) : (
              <IoIosArrowDropdownCircle
                onClick={() => setOpten3(!open3)}
                className="down-arrow"
              />
            )}
            {open3 && <p className="paragraph"> {data.paragraph3} </p>}
          </article>

          {/* Step 4 */}
          <article className="step">
            <h3
              onClick={() => setOpten4(!open4)}
              className={open4 ? "step-title" : "default"}
            >
              {data.step4}
            </h3>

            {open4 ? (
              <IoIosArrowDropupCircle
                onClick={() => setOpten4(!open4)}
                className="up-arrow"
              />
            ) : (
              <IoIosArrowDropdownCircle
                onClick={() => setOpten4(!open4)}
                className="down-arrow"
              />
            )}
            {open4 && <p className="paragraph"> {data.paragraph4} </p>}
          </article>

          {/* Step 5 */}
          <article className="step">
            <h3
              onClick={() => setOpten5(!open5)}
              className={open5 ? "step-title" : "default"}
            >
              {data.step5}
            </h3>

            {open5 ? (
              <IoIosArrowDropupCircle
                onClick={() => setOpten5(!open5)}
                className="up-arrow"
              />
            ) : (
              <IoIosArrowDropdownCircle
                onClick={() => setOpten5(!open5)}
                className="down-arrow"
              />
            )}
            {open5 && <p className="paragraph"> {data.paragraph5} </p>}
          </article>

          {/* Step 6 */}
          <article className="step">
            <h3
              onClick={() => setOpten6(!open6)}
              className={open6 ? "step-title" : "default"}
            >
              {data.step6}
            </h3>

            {open6 ? (
              <IoIosArrowDropupCircle
                onClick={() => setOpten6(!open6)}
                className="up-arrow"
              />
            ) : (
              <IoIosArrowDropdownCircle
                onClick={() => setOpten6(!open6)}
                className="down-arrow"
              />
            )}
            {open6 && <p className="paragraph"> {data.paragraph6} </p>}
          </article>
        </section>

        <figure className="image-container">
          <img
            className="image"
            src={data.recreation}
            alt="Hotel swimming pool!"
          />
          <p3 className="image-title">{data.name} </p3>
        </figure>
      </section>
    </main>
  );
};

export default About;
