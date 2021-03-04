import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { API_PRODUCTS } from '../helpers/constants';
import { dataBase } from '../firebase';
import { auth } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

export const shoppingCartContext = React.createContext();

const INIT_STATE = {
    productForCart: []
}

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "ADD_PRODUCT_TO CART": return {
            ...state,
            productForCart: action.payload
        }
        case "CLEAR_CART": return {
            ...state,
            productForCart: action.payload
        }
        default: return state;
    }
}


const ShoppingCartContextProvider = ({ children }) => {
    const { currentUser } = useAuth();
    const [state, dispatch] = useReducer(reducer, INIT_STATE);

    //Получаем товар из db.json
    const getProductForCart = async (productId) => {
        const { data } = await axios(`${API_PRODUCTS}/${productId}`);
        addProductToBase(data);
    }

  
    // const userRef = firestore.collection('users').doc(currentUser.uid)

    // const historyRef = await userRef.collection('orderHistory').get()

    // const historyData = historyRef.docs.map(history => history.data())

    // const userRef = firestore.collection('users').doc(currentUser.uid)

    // const historyRef = await userRef.collection('orderHistory').get()

    // const historyData = historyRef.docs.map(history => history.data())


    //Отправляем данные товара в базу (firestore)
    const addProductToBase = ({ image, price, title }) => {
        const shoppingCartProduct = {
            image,
            price,
            title,
            quantity: 1,
            descriptionCart: 'Model + comics + poster'
        }
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                dataBase.collection('UserShoppingCart ' + user.uid).add(
                    shoppingCartProduct
                )
            }
        })
        return unsubscribe;
    }

    //Получаем все товары для отображения в корзине
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                dataBase.collection('UserShoppingCart ' + user.uid).onSnapshot((querySnapshot) => {
                    const item = querySnapshot.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id
                    }))
                    addProductToCart(item)
                })
            }
        })
    }, [])

    //Помещаем товар в state корзины
    const addProductToCart = (item) => {
        dispatch({
            type: "ADD_PRODUCT_TO CART",
            payload: item
        })
    }

    //Очищаем state корзины после logout
    useEffect(() => {
        if (currentUser?.user === null) {
            dispatch(({
                type: "CLEAR_CART",
                payload: []
            }))
        }
    }, [currentUser]);

    // Получаем товар из db.json для корзины из избранного
    const getProductFromFavorites = async (productId) => {
        const { data } = await axios(`${API_PRODUCTS}/${productId}`);
        addProductToBase(data);
    }

    //Удаляем карточку товара из корзины
    const deleteProductCart = (productId) => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                dataBase.collection('UserShoppingCart ' + user.uid).doc(productId).delete();
            }
        })
        return unsubscribe;
    }

    //Очищаем корзину на firestore после оплаты

    const clearFirestoreCart = async () => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const data = await dataBase.collection('UserShoppingCart ' + user.uid).get()
                console.log(data)
                data.docs.map(item => {
                    dataBase.collection('UserShoppingCart ' + user.uid).doc(item.id).delete()
                })
            }
        })
        return unsubscribe;
    }

    return (
        <shoppingCartContext.Provider value={{
            productForCart: state.productForCart,
            getProductForCart,
            deleteProductCart,
            getProductFromFavorites,
            clearFirestoreCart
        }}>
            {children}
        </shoppingCartContext.Provider>
    )
}

export default ShoppingCartContextProvider;