import "./Stripe.scss";

const StripeSuccess = () => {
  // useEffect(()=>{
  //    navigate("/")
  // },5000)

  return (
    <main className="boxAlignment">
      <div className="paymentBox">
        <h2>Payment Success! </h2>
        <h3>We are now processing your order</h3>
      </div>
    </main>
  );
};

export default StripeSuccess;
