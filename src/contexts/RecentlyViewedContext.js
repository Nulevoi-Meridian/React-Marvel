import React, { useContext, useEffect } from 'react';
import { productsContext } from './ProductsContext';

export const recentlyViewedContext = React.createContext();

const RecentlyViewedContextProvider = ({ children }) => {
    const { recentlyViewed } = useContext(productsContext);

    
    //Добавляем  товар в недавно просмотренное
    useEffect(() => {
      if (!localStorage.getItem('recentlyViewed')) {
        localStorage.setItem('recentlyViewed', '[]');
      }
      const cart = JSON.parse(localStorage.getItem('recentlyViewed'));
          if (recentlyViewed) {
            cart.push({
                ...recentlyViewed,
                cartId:Date.now()})
              localStorage.setItem('recentlyViewed', JSON.stringify(cart))
          }else return;
    }, [recentlyViewed])
    
    return (
        <recentlyViewedContext.Provider value={{
        }}>
            {children}
        </recentlyViewedContext.Provider>
    )
}

export default RecentlyViewedContextProvider;