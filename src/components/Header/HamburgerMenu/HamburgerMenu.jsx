import React, { useState } from 'react';
import SignInForm from '../SignInForm/SignInForm';
import SignUpForm from '../SignUpForm/SignUpForm';
import './HamburgerMenu.css';
import { useAuth } from '../../../contexts/AuthContext';
import LogInUser from '../LogInUser/LogInUser';

const HamburgerMenu = () => {
    const [burgerMenuActive, setBurgerMenuActive] = useState(false);
    const { currentUser } = useAuth();
    return (
        <div className="burger-menu">
            <div className={burgerMenuActive ? 'burger-btn open' : 'burger-btn'}
                onClick={() => setBurgerMenuActive(!burgerMenuActive)}>
                <span />
            </div>
            <div className={burgerMenuActive ? 'burger-inner active' : 'burger-inner'}
                onClick={() => setBurgerMenuActive(false)}
            >  
                <div className="burger-item">
                    <div className={burgerMenuActive ? 'burger-auth active' : 'burger-auth'}>
                        {currentUser?.user !== null ? <LogInUser /> :
                            <>
                                <SignInForm />
                                <SignUpForm />
                            </>
                        }
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default HamburgerMenu;