const Razorpay = require("razorpay");

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });

    const order = await razorpay.orders.create({
      amount: 4900, // ₹49
      currency: "INR",
      receipt: "lal-kitab-live-session"
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        orderId: order.id,
        name: body.name,
        email: body.email,
        mobile: body.mobile
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};