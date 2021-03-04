import React from 'react';
import './Footer.css';

// Импорт изображений
import logo from '../../assets/img/footer/captain-america-logo.png';
import shield from '../../assets/img/footer/shield.jpg';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';


const Footer = () => {
    return (
        <div className="footer-section">
            <div className="footer-inner">
                <div className="footer-inner-logo">
                    <img src={logo} alt="" width="100%"/>
                </div>
                <div className="footer-inner-shield">
                    <img src={shield} alt="" width="100%"/>
                </div>
                <div className="footer-inner-adress">
                    <span>Marvel Entertainment, LLC</span>
                    <span>1290 Avenue of the Americas</span>
                    <span>New York, NY 10104</span>
                </div>
                <div className="footer-inner-social">
                    <p>Follow US</p>
                    <span>
                        <a href="https://twitter.com/marvel" target="_blank"><TwitterIcon /></a>
                        <a href="http://instagram.com/marvel" target="_blank"><InstagramIcon /></a> 
                        <a href="http://youtube.com/marvel" target="_blank"><YouTubeIcon /></a> 
                    </span>    
                </div>
            </div>
        </div>
    );
};

export default Footer;