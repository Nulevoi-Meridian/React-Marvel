import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import { API_PRODUCTS } from '../helpers/constants';
import { dataBase } from '../firebase';
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

    //Отправляем данные товара в базу (firestore)
    const addProductToBase = ({ image, price, title }) => {
        const shoppingCartProduct = {
            image,
            price,
            title,
            quantity: 1,
            descriptionCart: 'Model + comics + poster'
        }
            if (currentUser) {
                dataBase.collection('UserShoppingCart ' + currentUser.uid).add(
                    shoppingCartProduct
                )
            }
    }

    //Получаем все товары для отображения в корзине
    useEffect(() => {
        if (currentUser) {
            dataBase.collection('UserShoppingCart ' + currentUser.uid).onSnapshot((querySnapshot) => {
                const item = querySnapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }))
                dispatch({
                    type: "ADD_PRODUCT_TO CART",
                    payload: item
                })
            })
        }
    }, [currentUser])

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
            if (currentUser) {
                dataBase.collection('UserShoppingCart ' + currentUser.uid).doc(productId).delete();
            }
    }

    //Очищаем корзину на firestore после оплаты
    const clearFirestoreCart = async () => {
            if (currentUser) {
                const data = await dataBase.collection('UserShoppingCart ' + currentUser.uid).get()
                data.docs.map(item => {
                    dataBase.collection('UserShoppingCart ' + currentUser.uid).doc(item.id).delete()
                })
            }
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