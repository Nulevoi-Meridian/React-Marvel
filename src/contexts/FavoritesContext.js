import React, { useContext, useEffect } from 'react';
import { productsContext } from './ProductsContext';

export const favoritesContext = React.createContext();

const FavoritesContextProvider = ({ children }) => {
    const { favoritesProducts } = useContext(productsContext);

    
    //Добавляем  товар в избранное
    useEffect(() => {
      if (!localStorage.getItem('favoritesProducts')) {
        localStorage.setItem('favoritesProducts', '[]');
      }
      const cart = JSON.parse(localStorage.getItem('favoritesProducts'));
          if (favoritesProducts) {
            cart.push({
                ...favoritesProducts,
                cartId:Date.now()})
              localStorage.setItem('favoritesProducts', JSON.stringify(cart))
          }else return;
    }, [favoritesProducts])
    
    return (
        <favoritesContext.Provider value={{
        }}>
            {children}
        </favoritesContext.Provider>
    )
}

export default FavoritesContextProvider;