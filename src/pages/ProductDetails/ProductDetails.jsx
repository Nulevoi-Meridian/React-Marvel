import React, { useContext, useEffect } from 'react';
import './ProductDetails.css';
import { productsContext } from '../../contexts/ProductsContext';
import ImageSlider from "react-image-comparison-slider";
import ProductDetailsRange from '../../components/ProductDetailsRange/ProductDetailsRange';
import Comments from '../../components/Comments/Comments';
import { Link } from 'react-router-dom';
import RecentlyViewed from '../../components/RecentlyViewed/RecentlyViewed';

const ProductDetails = (props) => {
    const { productDetails, getDetails } = useContext(productsContext);

    useEffect(() => {
        getDetails(props.match.params.id);
    }, []);

    return (
        <>
            <div className="product-details">
                    <Link to="/"><div className="back-to-main">Back To Main</div></Link>
                    <div className="product-details__header">
                        <div className="header__top-image">
                            <ImageSlider
                                showPlaceholder={true}
                                sliderInitialPosition={0.98}
                                sliderColor='white'
                                handleColor='black'
                                leftLabelText={productDetails.title}
                                rightLabelText={productDetails.team}
                                image1={productDetails.imageDetail1}
                                image2={productDetails.imageDetail2}
                            />
                        </div>
                        <div className="header__description">
                            {/* <p>{productDetails.detailDescription}</p> */}
                            <ProductDetailsRange productDetails={productDetails} />
                        </div>
                    </div>
                    <div className="comments-section">
                        <Comments id={props.match.params.id} />
                    </div>
                    <div className="recently-viewed-section">
                        <RecentlyViewed />
                    </div>
            </div>
        </>
    );
};

export default ProductDetails;