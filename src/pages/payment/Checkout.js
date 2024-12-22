import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { resetCart } from "../../redux/orebiSlice";
import axios from "axios"; // Đảm bảo bạn đã cài axios
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Checkout = () => {
  const products = useSelector((state) => state.orebiReducer.products); // Lấy giỏ hàng từ Redux
  const userInfo = useSelector((state) => state.orebiReducer.userInfo); // Lấy thông tin người dùng từ Redux
  const [totalAmt, setTotalAmt] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(0);
  const [formData, setFormData] = useState({
    name: userInfo?.username || "",
    phone: userInfo?.phone || "",
    address: userInfo?.address || "",
    paymentMethod: "cash", // Mặc định chọn phương thức thanh toán là tiền mặt
  });

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;


  useEffect(() => {
    let price = 0;
    products.forEach((item) => {
      price += item.price * item.quantity;
    });
    setTotalAmt(price);

    // Tính phí vận chuyển
    if (price <= 200) {
      setShippingCharge(30);
    } else if (price <= 400) {
      setShippingCharge(25);
    } else {
      setShippingCharge(20);
    }
  }, [products]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Tạo dữ liệu đơn hàng để gửi lên API
    const orderData = {
      userId: userInfo?._id, // Sử dụng userId từ Redux
      products: products.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      })),
      amount: totalAmt + shippingCharge,
      address: formData.address,
      paymentMethod: formData.paymentMethod,
    };

    try {
      // Gửi dữ liệu đến API để tạo đơn hàng
      const response = await axios.post(apiUrl + "/api/v1/orderr", orderData);
      console.log("Order created successfully:", response.data);

      dispatch(resetCart());
      // Chuyển hướng đến trang xác nhận thanh toán hoặc trang cảm ơn
      navigate("/order-success");
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };


  return (
    <div className="max-w-container mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold text-center mb-6">Checkout</h1>

      {/* Form thông tin người dùng */}
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Billing Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-lg font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required={!userInfo.name} // Nếu đã có tên trong Redux, không yêu cầu nhập
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-lg font-medium">
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required={!userInfo.phone} // Nếu đã có số điện thoại trong Redux, không yêu cầu nhập
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-lg font-medium">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required={!userInfo.address} // Nếu đã có địa chỉ trong Redux, không yêu cầu nhập
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Phương thức thanh toán */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
            <div className="flex gap-6">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="cash"
                  name="paymentMethod"
                  value="cash"
                  checked={formData.paymentMethod === "cash"}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor="cash" className="text-lg font-medium">
                  Cash on Delivery
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="radio"
                  id="creditCard"
                  name="paymentMethod"
                  value="creditCard"
                  checked={formData.paymentMethod === "creditCard"}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor="creditCard" className="text-lg font-medium">
                  Credit Card
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="radio"
                  id="paypal"
                  name="paymentMethod"
                  value="paypal"
                  checked={formData.paymentMethod === "paypal"}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor="paypal" className="text-lg font-medium">
                  PayPal
                </label>
              </div>
            </div>
          </div>

          {/* Thông tin đơn hàng */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            <div>
              <p className="flex justify-between font-medium text-lg mb-2">
                Subtotal: <span>${totalAmt}</span>
              </p>
              <p className="flex justify-between font-medium text-lg mb-2">
                Shipping: <span>${shippingCharge}</span>
              </p>
              <p className="flex justify-between font-semibold text-xl">
                Total: <span>${totalAmt + shippingCharge}</span>
              </p>
            </div>
          </div>

          {/* Nút gửi thông tin và tiến hành thanh toán */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-primeColor text-white py-2 px-6 rounded-lg hover:bg-black duration-300"
            >
              Proceed to Payment
            </button>
          </div>
        </form>
      </div>

      {/* Link trở về trang giỏ hàng */}
      <div className="text-center mt-6">
        <Link to="/cart" className="text-lg text-primeColor hover:underline">
          Back to Cart
        </Link>
      </div>
    </div>
  );
};

export default Checkout;
