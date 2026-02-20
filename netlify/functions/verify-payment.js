const crypto = require("crypto");

exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body || "{}");

    const secret = process.env.RAZORPAY_KEY_SECRET;

    const generatedSignature = crypto
      .createHmac("sha256", secret)
      .update(
        data.razorpay_order_id + "|" + data.razorpay_payment_id
      )
      .digest("hex");

    if (generatedSignature === data.razorpay_signature) {

      return {
        statusCode: 200,
        body: JSON.stringify({ status: "success" })
      };
    }

    return {
      statusCode: 400,
      body: JSON.stringify({ status: "failed" })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};