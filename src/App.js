import './App.css';
import AuthContextProvider from './contexts/AuthContext';
import HeaderContextProvider from './contexts/HeaderContext';
import ProductsContextProvider from './contexts/ProductsContext';
import ShoppingCartContextProvider from './contexts/ShoppingCartContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './Routes';
import CommentsContextProvider from './contexts/CommentsContext';
import FavoritesContextProvider from './contexts/FavoritesContext';
import BuyHistoryContextProvider from './contexts/BuyHistoryContext';
import RecentlyViewedContextProvider from './contexts/RecentlyViewedContext';

function App() {
  return (
    <AuthContextProvider>
      <BuyHistoryContextProvider>
        <ShoppingCartContextProvider>
          <CommentsContextProvider>
            <ProductsContextProvider>
              <FavoritesContextProvider>
                <RecentlyViewedContextProvider>
                  <HeaderContextProvider>
                    <Routes />
                  </HeaderContextProvider>
                </RecentlyViewedContextProvider>
              </FavoritesContextProvider>
            </ProductsContextProvider>
          </CommentsContextProvider>
        </ShoppingCartContextProvider>
      </BuyHistoryContextProvider>
    </AuthContextProvider>
  );
}

export default App;
