import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './SliderSection.css';
import { Carousel } from 'react-bootstrap';

//Импорт изображений
import firstSlide from '../../assets/img/slider-section/slider1.png';
import secondtSlide from '../../assets/img/slider-section/slider2.png';
import thirdtSlide from '../../assets/img/slider-section/slider3.png';
import fourthSlide from '../../assets/img/slider-section/slider4.png';

const SliderSection = () => {
    return (
        <div className="slider-section">
            <Carousel>
                <Carousel.Item interval={8000}>
                    <img
                        className="d-block"
                        src={firstSlide}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        {/* <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={8000}>
                    <img
                        className="d-block w-100"
                        src={secondtSlide}
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        {/* <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={8000}>
                    <img
                        className="d-block w-100"
                        src={thirdtSlide}
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h3></h3>
                        <p></p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={8000}>
                    <img
                        className="d-block w-100"
                        src={fourthSlide}
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h3></h3>
                        <p></p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
};

export default SliderSection;