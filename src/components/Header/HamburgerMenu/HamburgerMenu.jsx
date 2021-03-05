import React, { useState } from 'react';
import SignInForm from '../SignInForm/SignInForm';
import SignUpForm from '../SignUpForm/SignUpForm';
import './HamburgerMenu.css';
import { useAuth } from '../../../contexts/AuthContext';
import LogInUser from '../LogInUser/LogInUser';
import { Link } from '@material-ui/core';

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
                <div className="burger-item" onClick={(e) => e.stopPropagation()}>
                    <div className={burgerMenuActive ? 'burger-auth active' : 'burger-auth'}>
                        <div className="auth-from">
                            {currentUser?.user !== null ? <LogInUser /> :
                                <>
                                    <SignInForm />
                                    <SignUpForm />
                                </>
                            }
                        </div>
                        <Link className="to-shopping-cart" to="/shopping-cart"><div className="burger-cart">Cart</div></Link>
                        <Link className="to-favorites" to="/favorites"><div className="burger-cart">Favorites</div></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HamburgerMenu;