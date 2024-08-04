import Stripe from 'stripe';
// Payment
const hotelPayment = async (req, res, next) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',

      line_items: [
        {
          price_data: {
            currency: 'EUR',
            product_data: {
              name: 'Hotel Service',
            },
            unit_amount: +req.body.total * 100,
          },
          quantity: 1,
        },
      ],

      success_url: `${process.env.SERVER_URL}/stripe-success`,
      cancel_url: `${process.env.SERVER_URL}/stripe-cancel`,
    });

    // Feedback to the frontend
    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default hotelPayment;
