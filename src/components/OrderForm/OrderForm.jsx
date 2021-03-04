import './OrderForm.css';
import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useAuth } from '../../contexts/AuthContext';
import { auth } from '../../firebase';
import { dataBase } from '../../firebase';
import { shoppingCartContext } from '../../contexts/ShoppingCartContext';


const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
        backgroundColor: 'lightgrey'
    },
}));

export default function OrderForm(props) {
    const { clearFirestoreCart } = useContext(shoppingCartContext);
    const { currentUser } = useAuth();
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const productName = props.productForCart.map(item => {
        return item.title
    })
        useEffect(() => {
            auth.onAuthStateChanged(user => {
                if (user) {
                    const date = new Date();
                    const time = date.getTime();
                    dataBase.collection('Buyer-Info ' + user.uid).add({
                        BuyerName: currentUser.name,
                        BuyerEmail: currentUser.email,
                        BuyerAddress: currentUser.deliveryAdress,
                        BuyerPayment: props.totalPrice,
                        BuyerQuantity: props.totalQuantity,
                        Date: new Date().toLocaleString(),
                        ProductName: productName
                    })
                }
            })
            orderSubmit();
        }, []);

    const orderSubmit = () => {

    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <Button className="order-btn" aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
                Procced To Order
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Typography className={classes.typography}>
                    <span className="order-form">
                        <span className="order-form-inner">
                            <span className="order-form-inner-wrapper">
                                <span className="order-title">Order Info</span>
                                <span className="order-item">
                                    <span>Name: {currentUser?.name}</span>
                                </span>
                                <span className="order-item">
                                    <span>Email: {currentUser?.email}</span>
                                </span>
                                <span className="order-item">
                                    <span>Cell No: {currentUser?.cell}</span>
                                </span>
                                <span className="order-item">
                                    <span>Country: {currentUser?.country}</span>
                                </span>
                                <span className="order-item">
                                    <span>Delivery: {currentUser?.deliveryAdress}</span>
                                </span>
                                <span className="order-item">
                                    <span>Name:</span>
                                    {props.productForCart.map(item => (
                                        <span key={item.id} className="order-name">{item.title}</span>
                                    ))}
                                </span>
                                <span className="order-item">
                                    <span>Total QTY: {props.totalQuantity}</span>
                                </span>
                                <span className="order-item">
                                    <span>Price to Pay: {props.totalPrice} $</span>
                                </span>
                                <span
                                    onClick={() => {
                                        orderSubmit();
                                        clearFirestoreCart();
                                    }}
                                    className="submit-order__btn">Submit</span>
                            </span>
                        </span>
                    </span>
                </Typography>
            </Popover>
        </div>
    );
}


