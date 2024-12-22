import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";
import axios from "axios"; // Thêm axios vào

const NewArrivals = () => {
  const [products, setProducts] = useState([]); // Lưu trữ danh sách sản phẩm
  const [loading, setLoading] = useState(true); // Trạng thái tải

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(apiUrl + "/api/v1/product"); // Gọi API để lấy sản phẩm
        setProducts(response.data); // Lưu dữ liệu vào state
      } catch (error) {
        console.error("Error fetching products:", error); // Xử lý lỗi nếu có
      } finally {
        setLoading(false); // Đặt trạng thái loading là false sau khi hoàn thành
      }
    };

    fetchProducts(); // Gọi hàm fetchProducts
  }, []);


  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  return (
    <div className="w-full pb-16">
      <Heading heading="New Arrivals" />
      {loading ? (
        <div>Loading...</div> // Hiển thị khi dữ liệu đang được tải
      ) : (
        <Slider {...settings}>
          {products.map((product) => (
            <div className="px-2" key={product._id}>
              <Product
                _id={product._id}
                img={apiUrl + product.img} // Giả sử API trả về trường image
                productName={product.productName} // Giả sử API trả về trường name
                price={product.price} // Giả sử API trả về trường price
                color={product.color} // Giả sử API trả về trường color
                badge={product.badge} // Giả sử API trả về trường badge
                des={product.des} // Giả sử API trả về trường description
              />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default NewArrivals;
