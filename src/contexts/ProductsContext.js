import React, { useReducer } from 'react';
import axios from 'axios';
import { API_PRODUCTS } from '../helpers/constants';
import { API_COMPARE } from '../helpers/constants';

export const productsContext = React.createContext();

const INIT_STATE = {
    products: [],
    productDetails: [],
    editModalFormStatus: false,
    editProduct: null,
    latestProduct: [],
    compareProduct: [],
    favoritesProducts: null,
    recentlyViewed: null,
    count: 0
}

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "GET_PRODUCT_DATA": return {
            ...state,
            products: action.payload
        }    
        case "GET_PRODUCT_DETAILS": return {
            ...state,
            productDetails: action.payload
        }
        case "OPEN_EDIT_FORM_MODAL": return {
            ...state,
            editModalFormStatus: true
        }
        case "CLOSE_EDIT_FORM_MODAL": return {
            ...state,
            editModalFormStatus: false
        }
        case "EDIT_PRODUCT": return {
            ...state,
            editProduct: action.payload
        }  
        case "GET_LATEST": return {
            ...state,
            latestProduct: action.payload
        }       
        case "GET_PRODUCTS_COUNT": return {
            ...state,
            count: action.payload
        }
        case "GET_DATA_FOR_COMPARE": return {
            ...state,
            compareProduct: action.payload
        }
        case "GET_PRODUCT_FOR_FAVORITES": return {
            ...state,
            favoritesProducts: action.payload
        }
        case "GET_PRODUCT_FOR_RECENTLY_VIEWED": return {
            ...state,
            recentlyViewed: action.payload
        }
        default: return state;
    }
}

const ProductsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE);

    //Забираем данные с инпутов и помещаем в базу
    const setProductData = async (newProduct) => {
        await axios.post(API_PRODUCTS, newProduct)
        getProductData(`${API_PRODUCTS}`);
    }

    //Получаем актуальные данные из базы, для отображения
    const getProductData = async (newUrl) => {
        const { data, headers } = await axios(newUrl)
        dispatch({
            type: "GET_PRODUCT_DATA",
            payload: data
        })
        dispatch({
            type: "GET_PRODUCTS_COUNT",
            payload: parseInt(headers["x-total-count"])
        })
    }    

    //Удаляем данные из базы
    const deleteProduct = async (productId) => {
        await axios.delete(`${API_PRODUCTS}/${productId}`);
        getProductData(`${API_PRODUCTS}`);
    }

    //Получаем id по клику на ссылку Learn more
    const getDetails = async (productId) => {
        const { data } = await axios(`${API_PRODUCTS}/${productId}`);
        dispatch({
            type: "GET_PRODUCT_DETAILS",
            payload: data
        })
    }

    //Открываем модальное окно для редактирования
    const openEditFormModal = () =>{
        dispatch({
            type: "OPEN_EDIT_FORM_MODAL",
        })
    }

    //Получаем id по клику на кнопку редактирования и вытаскиваем нужный объект
    const getEditId = async (productId) => {
        const { data } = await axios(`${API_PRODUCTS}/${productId}`);
        dispatch({
            type: "EDIT_PRODUCT",
            payload: data
        })
    }

    //Получаем отредактированный объект и помещаем в базу данных
    const editedProductData = async (editedItem) => {
        await axios.patch(`${API_PRODUCTS}/${editedItem.id}`, editedItem)
        getProductData(`${API_PRODUCTS}`);

        dispatch({
            type: "CLOSE_EDIT_FORM_MODAL"
        })
    }

     //Получаем объект для отображения в новинках
    const getLatestData = async () => {
        const { data } = await axios(API_PRODUCTS);
        const newItem = data.filter(item => {
            if(item?.latest) {
                return item;
            }
        })
        dispatch ({
            type: "GET_LATEST",
            payload: newItem
        })
    }   
    
    //Получаем объект для сравнения
    const getCompare = async (product) => {
        await axios.post(`${API_COMPARE}`, product);
    }

    //Получаем данные для отображения в сравнении
    const setCompare = async () => {
        const { data } = await axios(`${API_COMPARE}`);
        dispatch ({
            type: "GET_DATA_FOR_COMPARE",
            payload: data
        })
    }
     //Очищаем сравнение
     const deleteCompare = async (productId) => {
        await axios.delete(`${API_COMPARE}/${productId}`);
        setCompare();
    }

    //Получаем данные для отображения в избранном
    const getProductForFavorites = ({ title, image, price, id }) => {
        dispatch({
            type: "GET_PRODUCT_FOR_FAVORITES",
            payload: {
                title,
                image,
                price,
                id
            }
        })
    }

     //Получаем данные для отображения в недавно просмотренных товарах
     const getRecentlyViewed = ({ title, image, price, id }) => {
        dispatch({
            type: "GET_PRODUCT_FOR_RECENTLY_VIEWED",
            payload: {
                title,
                image,
                price,
                id
            }
        })
    }

    return (
        <productsContext.Provider value={{
            products: state.products,
            count: state.count,
            productDetails: state.productDetails,
            editModalFormStatus: state.editModalFormStatus,
            editProduct: state.editProduct,
            latestProduct: state.latestProduct,
            compareProduct: state.compareProduct,
            favoritesProducts: state.favoritesProducts,
            recentlyViewed: state.recentlyViewed,
            setProductData,
            getProductData,
            getDetails,
            deleteProduct,
            openEditFormModal,
            getEditId,
            editedProductData,
            getLatestData,
            getCompare,
            setCompare,
            deleteCompare,
            getProductForFavorites,
            getRecentlyViewed
        }}>
            {children}
        </productsContext.Provider>
    )
}

export default ProductsContextProvider;