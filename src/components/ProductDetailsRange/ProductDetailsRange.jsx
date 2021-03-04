import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './ProductDetailsRange.css';

const ProductDetailsRange = ({ productDetails }) => {
    return (
        <div className="circular-progress">
            <div className="circular-progress__column1">
                <div className="circular-progress__item">
                    <CircularProgressbar
                        value={productDetails?.strenght}
                        maxValue={10}
                        text={`${productDetails?.strenght}`}
                        styles={{
                            path: {
                                stroke: '#fb7600'
                            },
                            root: {
                                stroke: 'white'
                            }
                        }}
                    />
                    <span className="circular-progress__title">Strenght</span>
                </div>
                <div className="circular-progress__item">
                    <CircularProgressbar
                        value={productDetails?.speed}
                        maxValue={10}
                        text={`${productDetails?.speed}`}
                        styles={{
                            path: {
                                stroke: 'brown'
                            },
                            root: {
                                stroke: 'white'
                            }
                        }}
                    />
                    <span className="circular-progress__title">Speed</span>
                </div>
                <div className="circular-progress__item">
                    <CircularProgressbar
                        value={productDetails?.fighting}
                        maxValue={10}
                        text={`${productDetails?.fighting}`}
                        styles={{
                            path: {
                                stroke: 'red'
                            },
                            root: {
                                stroke: 'white'
                            }
                        }}
                    />
                    <span className="circular-progress__title">Fighting Skills</span>
                </div>
            </div>
            <div className="circular-progress__column2">
                <div className="circular-progress__item">
                    <CircularProgressbar
                        value={productDetails?.intelligence}
                        maxValue={10}
                        text={`${productDetails?.intelligence}`}
                        styles={{
                            path: {
                                stroke: 'blue'
                            },
                            root: {
                                stroke: 'white'
                            }
                        }}
                    />
                    <span className="circular-progress__title">Intelligence</span>
                </div>
                <div className="circular-progress__item">
                    <CircularProgressbar
                        value={productDetails?.energy}
                        maxValue={10}
                        text={`${productDetails?.energy}`}
                        styles={{
                            path: {
                                stroke: 'purple'
                            },
                            root: {
                                stroke: 'white'
                            }
                        }}
                    />
                    <span className="circular-progress__title">Energy</span>
                </div>
                <div className="circular-progress__item">
                    <CircularProgressbar
                        value={productDetails?.durability}
                        maxValue={10}
                        text={`${productDetails?.durability}`}
                        styles={{
                            path: {
                                stroke: 'green'
                            },
                            root: {
                                stroke: 'white'
                            }
                        }}
                    />
                    <span className="circular-progress__title">Durability</span>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsRange;