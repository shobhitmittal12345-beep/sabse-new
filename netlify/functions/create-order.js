const Razorpay = require("razorpay");

exports.handler = async () => {
  const razorpay = new Razorpay({
    key_id: process.env.RZP_KEY_ID,
    key_secret: process.env.RZP_KEY_SECRET
  });

  const order = await razorpay.orders.create({
    amount: 4900,
    currency: "INR"
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      id: order.id,
      amount: order.amount,
      key: process.env.RZP_KEY_ID
    })
  };
};
