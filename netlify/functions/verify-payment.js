const crypto = require("crypto");

exports.handler = async (event) => {
  const body = JSON.parse(event.body);

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RZP_KEY_SECRET)
    .update(body.razorpay_order_id + "|" + body.razorpay_payment_id)
    .digest("hex");

  if (expectedSignature === body.razorpay_signature) {
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  }

  return {
    statusCode: 400,
    body: JSON.stringify({ success: false })
  };
};

