import React, { useContext, useEffect } from 'react';
import './ShoppingCart.css';
import { shoppingCartContext } from '../../contexts/ShoppingCartContext';
import Fade from 'react-reveal/Fade';
import { dataBase } from '../../firebase';
import { auth } from '../../firebase';
import OrderFrom from '../../components/OrderForm/OrderForm';


//Импорт изображений
import cartEmptyImg from '../../assets/img/cart/empty-cart-bg.png';
import cartDeleteSvg from '../../assets/icon/cart/cart-delete.svg';
import unlimLogo from '../../assets/img/cart/unlim-logo.png';


const ShoppingCart = () => {
    const {
        productForCart,
        deleteProductCart,
    } = useContext(shoppingCartContext);
    
    let totalPrice = 0;
    if(productForCart.length !== 0) {
            productForCart?.map(item => {
                totalPrice += item.price * item.quantity
            })
        }   
    let totalQuantity = 0;
    if(productForCart.length !== 0) {
            productForCart?.map(item => {
                totalQuantity += +item.quantity
            })
        }   

    const getInpValue = (e) => {
        auth.onAuthStateChanged(user => {
            if (user) {
                dataBase.collection('UserShoppingCart ' + user.uid).doc(e.target.name).update({
                    quantity: e.target.value,
                })
            }
        })
    }

    return (
        <div className="shopping-cart">
            <div className="container">
                {productForCart.length !== 0 ?
                    <>
                        <div className="shopping-cart__title">YOUR CART</div>
                        <div className="shopping-cart__wrapper">
                            <div className="shopping-cart__inner">
                                {productForCart.map(item => (
                                    <Fade left key={item.id}>
                                        <div className="shopping-cart__start">
                                            <div className="shopping-cart__cart-section">
                                                <div className="cart-section__image">
                                                    <img src={item.image} alt="" width="100%" height="auto" />
                                                </div>
                                                <div className="cart-section__inner-item">
                                                    <div className="inner-item__description">{item.descriptionCart}</div>
                                                    <div className="inner-item__title">Name: {item.title}</div>
                                                    <div className="inner-item__select-quantity">
                                                        <select className="product-quantity"
                                                            name={item.id}
                                                            onChange={getInpValue}

                                                        >
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                        </select>
                                                    </div>
                                                    <div className="inner-item__del-btn">
                                                        <span className="cart-delete-btn"
                                                            onClick={() => deleteProductCart(item.id)}>
                                                            <img src={cartDeleteSvg} alt="" />
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="inner-item__quantity">Qty {item.quantity} x</div>
                                                <div className="inner-item__price">{item.price} $</div>
                                            </div>
                                        </div>
                                    </Fade>
                                ))}
                            </div>
                            <div className="shopping-cart-end">
                                <div className="shopping-cart-end__title">SUMMARY</div>
                                <div className="shopping-cart-end__total">
                                    <div className="total-quantity">
                                        <div className="total-title">TOTAL QTY</div>
                                        <div>{totalQuantity}</div>
                                    </div>
                                    <div className="total-price">
                                        <div className="total-title">TOTAL PRICE</div>
                                        <div>{totalPrice} $</div>
                                    </div>
                                </div>
                                <div className="pay-btn"><OrderFrom
                                    totalPrice={totalPrice}
                                    totalQuantity={totalQuantity}
                                    productForCart={productForCart} /></div>
                                <div className="unlim-logo">
                                    <img src={unlimLogo} alt="" width="100%" />
                                </div>
                            </div>
                        </div>
                    </>
                    :
                    <Fade top>
                        <div className="empty-cart__item">
                            <img src={cartEmptyImg} width="100%"></img>
                            <span>CART IS EMPTY</span>
                        </div>
                    </Fade>
                }
            </div>
        </div>
    );
};

export default ShoppingCart;