import { useEffect, useRef, useState } from "react";
import Header from "../../components/header/Header";
import { FiPhoneCall } from "react-icons/fi";
import { MdClose, MdEmail, MdLocationOn } from "react-icons/md";
import { FaTwitterSquare } from "react-icons/fa";
import { BiCloudUpload } from "react-icons/bi";
import "./Contact.scss";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { API, cloud_URL, upload_preset } from "../../utiles/shortAPI";

const Contact = () => {
  // Comment Id
  const params = useLocation();
  console.log("Comment Id will be", params);
  // State variables
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState("");
  const [message, setMessage] = useState("");
  const [comments, setComments] = useState([]);
  // Validation of the state variables
  const [firstNameValidation, setFirstNameValidation] = useState(false);
  const [lastNameValidation, setLastNameValidation] = useState(false);
  const [emailValidation, setEmailValidation] = useState(false);
  const [messageValidation, setMessageValidation] = useState(false);

  // useRef to store the email input
  const emailRef = useRef();
  const textMessage = useRef();

  // Function to check if the email is valid
  const checkEmailFormat = () => {
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email);
    if (emailRegex) {
      emailRef.current.className = "errorInvisible";
    } else {
      emailRef.current.className = "errorVisible";
    }
  };

  //Function that validate message length
  const messageLength = () => {
    if (message.length >= 50) {
      textMessage.current.className = "errorInvisible";
    } else {
      textMessage.current.className = "errorVisible";
    }
  };

  // Function that handle input change
  const handleChange = (event) => {
    switch (event.target.name) {
      case "firstName":
        setFirstName(event.target.value);
        setFirstNameValidation(true);
        break;
      case "lastName":
        setLastName(event.target.value);
        setLastNameValidation(true);
        break;
      case "email":
        setEmail(event.target.value);
        setEmailValidation(true);
        break;
      case "message":
        setMessage(event.target.value);
        setMessageValidation(true);
        break;
      default:
        break;
    }
  };

  // Display comment in the frontend
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await axios.get(`${API}/comments`);
        setComments(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchComments();
  }, []);

  // Function to reset input data
  const reset = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setFile("");
    setMessage("");
    setFirstNameValidation(false);
    setLastNameValidation(false);
    setEmailValidation(false);
    setMessageValidation(false);
  };

  // Function to submit testimonial
  const submitTestimonial = async (event) => {
    event.preventDefault();

    if (!firstName || !lastName || !email || !file || !message) {
      toast.error("Please fill in the required fields");
    } else {
      // Upload the image from the form data
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", upload_preset);

      try {
        const response = await axios.post(`${cloud_URL}`, data);
        const { url } = response.data;

        // new comment
        const newComment = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          file: url,
          message: message,
        };

        await axios.post(`${API}/comments/createComment`, newComment);

        reset();
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  // Delete single comment
  // Delete a product from database
  const deleteComment = async (id) => {
    try {
      await axios.delete(`${API}/comments/${id}`);
      setComments(comments.filter((comment) => comment._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="contact-page">
      <Header pages="HotelsHotelAndContact" page="Conctact" />

      <section className="contact-container">
        <h1 className="title">We Would Love to Hear From You</h1>
        <div className="form-communication-tools">
          <article className="form-container">
            <h3 className="sub-title"> Drop us a message below </h3>

            <form
              onSubmit={submitTestimonial}
              encType="multipart/form-data"
              className="contact-form"
            >
              <div className="user-data">
                <div className="input-container">
                  <input
                    type="text"
                    name="firstName"
                    onChange={handleChange}
                    value={firstName}
                    placeholder="First Name"
                    className="input-field"
                  />
                  <div
                    className={
                      firstNameValidation && firstName.trim().length === 0
                        ? "errorVisible"
                        : "errorInvisible"
                    }
                  >
                    First name is required!
                  </div>
                </div>

                <div className="input-container">
                  <input
                    type="text"
                    name="lastName"
                    onChange={handleChange}
                    value={lastName}
                    placeholder="Last Name"
                    className="input-field"
                  />

                  <div
                    className={
                      lastNameValidation && lastName.trim().length === 0
                        ? "errorVisible"
                        : "errorInvisible"
                    }
                  >
                    Last name is required!
                  </div>
                </div>

                <div className="input-container">
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={email}
                    onBlur={checkEmailFormat}
                    placeholder="Email"
                    className="input-field"
                  />
                  <div
                    className={
                      emailValidation && email.trim().length === 0
                        ? "errorVisible"
                        : "errorInvisible"
                    }
                  >
                    Email is required!
                  </div>
                  <div className="errorInvisible" ref={emailRef}>
                    Incorrect email format!
                  </div>
                </div>

                <div className="input-files-container">
                  <input
                    type="file"
                    name="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="input-file"
                  />
                  <button className="file-btn">
                    <BiCloudUpload className="icon" /> Upload
                    <small className="supported-files">(PDF, JPG, & PNG)</small>
                  </button>
                </div>
              </div>

              <div className="text-message">
                <textarea
                  name="message"
                  value={message}
                  onChange={handleChange}
                  rows="7"
                  placeholder="We value your message"
                  className="input-field"
                />
                <div
                  className={
                    messageValidation && message.trim().length === 0
                      ? "errorVisible"
                      : "errorInvisible"
                  }
                >
                  Message is required!
                </div>

                <div>
                  {message.length === 0 ? (
                    ""
                  ) : (
                    <div className="errorVisible">
                      {50 - message.trim().length > 0
                        ? `${50 - message.trim().length} characters needed`
                        : ""}
                    </div>
                  )}
                </div>
              </div>
              <button className="contact-form-btn">Submit</button>
            </form>
          </article>

          <article className="fast-contact-tools">
            <h5 className="sub-title"> Would you like a prompt reply? </h5>
            <div className="contact-tools">
              <FiPhoneCall className="contact-icon" />
              <p className="link-container">
                <a className="link" href="tel:+4917581005650">
                  {" "}
                  Call us{" "}
                </a>
              </p>
            </div>
            <div className="contact-tools">
              <MdEmail className="contact-icon" />
              <p className="link-container">
                <a className="link" href="mailto:uelandrae@gmail.com">
                  {" "}
                  Email Us{" "}
                </a>
              </p>
            </div>
            <div className="contact-tools">
              <FaTwitterSquare className="contact-icon" />
              <p className="link-container">
                <a className="link" href="twitter">
                  {" "}
                  Tweet us{" "}
                </a>
              </p>
            </div>
            <div className="contact-tools">
              <MdLocationOn className="contact-icon" />
              <p className="link-container">
                <a className="link" href="#">
                  {" "}
                  Straße 31, 4657 Hamburg, Germany
                </a>
              </p>
            </div>
            <figure className="image-display">
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : "https://icon-library.com/images/no-image-icon//no-image-icon-0.jpg"
                }
                alt=""
                className="image"
              />
            </figure>
          </article>
        </div>
      </section>

      {/* Open public comments */}
      <section className="public-comments">
        <h2 className="comment-title"> Public Comments</h2>

        <div className="comments">
          {comments.map((comment) => {
            return (
              <article key={comment._id} className="single-comment">
                <div className="photo-container">
                  <img src={comment.file} alt={comment.nam} className="photo" />
                </div>
                <div className="name-email">
                  <span className="name">
                    {comment.firstName} {comment.lastName}
                  </span>
                  <span className="email">
                    <a href={`mailto:${comment.email}`}> Send Email </a>
                  </span>
                </div>
                <p className="message"> {comment.message} </p>

                <MdClose
                  onClick={() => deleteComment(comment._id)}
                  className="close-icon"
                />
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Contact;
