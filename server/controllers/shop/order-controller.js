const { client, paypal } = require("../../helpers/paypal");
const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

// CREATE PAYPAL ORDER
const createOrder = async (req, res) => {
  try {
    const { userId, cartItems, cartId, addressInfo } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    // Calculate total in USD
    const totalAmount = cartItems
      .reduce((sum, item) => sum + (item.salePrice || item.price) * item.quantity, 0)
      .toFixed(2);

    // Build PayPal order request
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: totalAmount,
            breakdown: {
              item_total: { currency_code: "USD", value: totalAmount },
            },
          },
          items: cartItems.map((item) => ({
            name: item.title,
            unit_amount: { currency_code: "USD", value: (item.salePrice || item.price).toFixed(2) },
            quantity: item.quantity.toString(),
          })),
        },
      ],
      application_context: {
        return_url: "https://fashion-store-pearl.vercel.app/shop/paypal-return",
        cancel_url: "https://fashion-store-pearl.vercel.app/shop/paypal-cancel",
      },
    });

    // Execute request
    const orderResponse = await client().execute(request);
    const approvalURL = orderResponse.result.links.find((link) => link.rel === "approve").href;

    // Save order in DB
    const newOrder = new Order({
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
    });

    await newOrder.save();

    res.status(201).json({ success: true, approvalURL, orderId: newOrder._id });
  } catch (error) {
    console.error("Error in createOrder:", error);
    res.status(500).json({ success: false, message: "Error creating PayPal order", error });
  }
};

// CAPTURE PAYPAL PAYMENT (v2 API)
const capturePayment = async (req, res) => {
  try {
    const { orderId, orderToken } = req.body;

    if (!orderId || !orderToken) {
      return res.status(400).json({ success: false, message: "Payment info missing!" });
    }

    const request = new paypal.orders.OrdersCaptureRequest(orderToken);
    request.requestBody({});

    const capture = await client().execute(request);

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = capture.result.id;

    // Update stock
    for (let item of order.cartItems) {
      const product = await Product.findById(item.productId);
      if (!product) continue;

      product.totalStock -= item.quantity;
      await product.save();
    }

    // Delete cart
    await Cart.findByIdAndDelete(order.cartId);
    await order.save();

    res.status(200).json({ success: true, message: "Payment captured successfully", data: order });
  } catch (error) {
    console.error("Error in capturePayment:", error);
    res.status(500).json({ success: false, message: "Payment capture failed", error });
  }
};

// GET ORDERS
const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId });
    if (!orders.length) return res.status(404).json({ success: false, message: "No orders found" });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};

// GET ORDER DETAILS
const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching order details" });
  }
};

module.exports = {
  createOrder,
  capturePayment,
  getAllOrdersByUser,
  getOrderDetails,
};
