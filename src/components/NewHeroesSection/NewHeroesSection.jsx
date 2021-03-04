import React, { Component } from 'react';
import './NewHeroesSection.css';
import FocusOnSelect from './NewHeroSlider/FocusOnSelect';

const NewHeroesSection = () => {
    return (
        <div className="new-heroes">
            <div className="container">
                <div className="new-heroes__title">
                    <h2>New Heroes Arrived!!!</h2>
                </div>
                <div className="slider-wrapper">
                    <FocusOnSelect />
                </div>
            </div>
        </div>
    );
};

export default NewHeroesSection;