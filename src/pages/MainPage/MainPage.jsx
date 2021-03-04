import React from 'react';
import MainProductSection from '../../components/MainProductSection/MainProductSection';
import NewHeroesSection from '../../components/NewHeroesSection/NewHeroesSection';
import SliderSection from '../../components/SliderSection/SliderSection';
import './MainPage.css';

const MainPage = () => {
    return (
        <div className="background-color">
        <SliderSection />
        <NewHeroesSection />
        <MainProductSection />
        </div>
    );
};

export default MainPage;