import React from 'react';

const CheckoutSteps = (props) => {
  return (
    <section className="hotel-reservation-checkout-steps">
      <div className={props.step1 ? 'active' : ''}> Sign in</div>
      <div className={props.step2 ? 'active' : ''}> Hotels </div>
      <div className={props.step3 ? 'active' : ''}> Hotel </div>
      <div className={props.step4 ? 'active' : ''}> Reserve </div>
      <div className={props.step5 ? 'active' : ''}> Payment </div>
    </section>
  );
};

export default CheckoutSteps;
