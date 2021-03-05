import React, { useContext } from 'react';
import "./Header.css";
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';

//Импорт компонентов
import SignInFormModal from './SignInFormModal/SignInFormModal';
import SignUpFormModal from './SignUpFormModal/SignUpFormModal';
import HamburgerMenu from './HamburgerMenu/HamburgerMenu';
import SignInForm from './SignInForm/SignInForm';
import SignUpForm from './SignUpForm/SignUpForm';
import { useAuth } from '../../contexts/AuthContext';
import LogInUser from './LogInUser/LogInUser';
import AccountRecovery from './AccountRecovery/AccountRecovery';
import { shoppingCartContext } from '../../contexts/ShoppingCartContext';

// Импорт изображений
import logo from '../../assets/img/header/logo.png';
import favorites from '../../assets/icon/header/favorites.svg';
import cart from '../../assets/icon/header/shopping-cart.svg';

const Header = () => {
    const { productForCart } = useContext(shoppingCartContext);
    const { currentUser } = useAuth();

    return (
        <>
            <div className="header">
                <div className="header__inner">
                    <div className="header__logo">
                        <Link to="/"><img src={logo} alt="" /></Link>
                    </div>
                    <div className="header__title">
                        <span>Explore the Marvel Universe</span>
                        <span>Choose Your Own Hero</span>
                    </div>
                    <div className="header__end">
                        <div className="header-auth">
                            <SignInFormModal />
                            <SignUpFormModal />
                            <AccountRecovery />
                            {currentUser?.name || currentUser?.displayName ? <MediaQuery minWidth={769}>
                                <LogInUser /> </MediaQuery> :
                                <>
                                    <MediaQuery minWidth={769}>
                                        <SignInForm />
                                    </MediaQuery>

                                    <MediaQuery minWidth={769}>
                                        <SignUpForm />
                                    </MediaQuery>
                                </>}
                        </div>
                        <div className="end__favorites">
                            <Link to="/favorites"><img src={favorites} alt="" /></Link>
                        </div>
                        <div className="end__cart">
                            <Link to="/shopping-cart"><img src={cart} alt="" /></Link>
                            <span>{productForCart.length}</span>
                        </div>
                    </div>
                    <MediaQuery maxWidth={768}>
                        <HamburgerMenu>
                        </HamburgerMenu>
                    </MediaQuery>
                </div>{/*<!--/"header__inner"--> */}

                {/* <div className="header__nav">
                    <span>New Heroes</span>
                    <span>All Characters</span>
                    <span>Comics</span>
                    <span>Games</span>
                </div> */}
            </div>{/*<!--/header--> */}
        </>
    );
};

export default Header;