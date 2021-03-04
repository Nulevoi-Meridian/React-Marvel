import React, { useContext, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './FocusOnSelect.css';
import { productsContext } from "../../../contexts/ProductsContext";
import { Link } from 'react-router-dom';

export default function FocusOnSelect() {
  const { getLatestData, latestProduct } = useContext(productsContext);

  useEffect(() => {
    getLatestData();
  }, []);

  const settings = {
    focusOnSelect: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 500,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <Slider {...settings}>
      {latestProduct.map(item => (
        <Link to={`details/${item.id}`} key={item.id}>
        <div className="latest-card">
          <div className="latest-card__front">
            <img className="latest-img" src={item.imageLatest} alt="" />
            <p className="latest-title">{item.title}</p>
          </div>
        </div>
        </Link>
      ))}
    </Slider>

  );
}