import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import MarvelChat from './components/MarvelChat/MarvelChat';
import AccountSettings from './pages/AccountSettings/AccountSettings';
import AdminPanel from './pages/AdminPanel/AdminPanel';
import BuyHistory from './pages/BuyHistory/BuyHistory';
import Favorites from './pages/Favorites/Favorites';
import MainPage from './pages/MainPage/MainPage';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import ShoppingCart from './pages/ShoppingCart/ShoppingCart';
import ChatIcon from '@material-ui/icons/Chat';

const Routes = () => {
    const [openChat, setOpenChat] = useState(false);

    const handleClick = () => {
        setOpenChat(!openChat)
    }
    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <Route exact path="/" component={MainPage} />
                <Route exact path="/admin" component={AdminPanel} />
                <Route exact path="/details/:id" component={ProductDetails} />
                <Route exact path="/shopping-cart" component={ShoppingCart} />
                <Route exact path="/favorites" component={Favorites} />
                <Route exact path="/personalinfo" component={AccountSettings} />
                <Route exact path="/buyhistory" component={BuyHistory} />
            </Switch>
            <ChatIcon 
                onClick={() => handleClick()}
                style={{position: 'fixed', top: '150', right: '15', cursor: 'pointer'}} />
            {openChat ? <MarvelChat/> : null}
            <Footer />
        </BrowserRouter>
    );
};

export default Routes;