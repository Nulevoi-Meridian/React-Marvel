import React, { useState, useEffect, useContext } from 'react';
import './Favorites.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { shoppingCartContext } from '../../contexts/ShoppingCartContext';
import { headerContext } from '../../contexts/HeaderContext';
import emptyFavoritesImg from '../../assets/img/favorites/emptyFavorites.jpg';
import Fade from 'react-reveal/Fade';

const Favorites = () => {
  const { openSignInFormModal } = useContext(headerContext);
  const { getProductFromFavorites } = useContext(shoppingCartContext);
  const { currentUser } = useAuth();

  let favoritesList = JSON.parse(localStorage.getItem('favoritesProducts'));
  const [favoritesProductsData, setFavoritesProductsData] = useState(favoritesList);

  useEffect(() => {
  }, [favoritesProductsData])

  const deleteFromFavorites = (itemId) => {
    favoritesList = favoritesList.filter(item => item.cartId !== itemId)
    localStorage.setItem('favoritesProducts', JSON.stringify(favoritesList))
    setFavoritesProductsData(favoritesList);
  }

  return (
    <div className="favorites-section">
      <div className="container">
        {favoritesProductsData.length !== 0 ? <div className="favorites-section__inner">
          {favoritesProductsData?.map(item => (
            <div key={item.cartId} className="favorites-section__list-item">
              <div className="favorites-logo-title">MARVEL</div>
              <div className="favorites-item__img">
                <img src={item.image} width="100%" alt="Coming Soon" />
              </div>
              <div className="favorites-item__description">
                <div className="favorites-description__title">
                  <span>{item.title}</span>
                </div>
                <div className="favorites-item__link">
                  <Link to={`details/${item.id}`}
                  >Learn more</Link>
                </div>
              </div>
              <div className="favorites-item__actions">
                <div className="favorites-item__price">
                  <span>{item.price} $</span>
                </div>
                <div className="favorites-item__add-to">
                  <div className="favorites-add-to__cart"
                    onClick={() => {
                      currentUser.user !== null ?
                        getProductFromFavorites(item.id)
                        && deleteFromFavorites(item.cartId)
                        : openSignInFormModal()
                    }}
                  >
                    <span>Add to Cart</span>
                  </div>
                  <div
                    onClick={() => deleteFromFavorites(item.cartId)}
                    className="favorites-delete">
                    <span>Delete</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div> :
          <Fade top>
            <div className="empty-favorites">
              <Link to="/"><img src={emptyFavoritesImg} width="100%" alt="" /></Link>
              <span className="empty-favorites__title">Favorites is Empty</span>
            </div>
          </Fade>
        }
      </div>

    </div>
  );
};

export default Favorites;
