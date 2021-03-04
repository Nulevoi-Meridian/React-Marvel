import React, { useState, useEffect } from 'react';
import './RecentlyViewed.css';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const RecentlyViewed = () => {
  const { currentUser } = useAuth();

  let recentlyViewedList = JSON.parse(localStorage.getItem('recentlyViewed'));
  const [recentlyViewedData, setRecentlyViewedData] = useState(recentlyViewedList);

  useEffect(() => {
    
  }, [recentlyViewedData])
  
  if(currentUser?.user === null) {
    localStorage.setItem('recentlyViewed', '[]');
  }
  
  return (
    <div className="recently-viewed-section">
      <div className="container">
        <div className="recently-viewed-section__inner">
          {recentlyViewedData?.map(item => (
            <div key={item.cartId} className="recently-viewed-section__list-item">
              <div className="favorites-logo-title">MARVEL</div>
              <div className="favorites-item__img">
                <img src={item.image} width="100%" alt="Coming Soon" />
              </div>
              <div className="favorites-item__description">
                <div className="favorites-description__title">
                  <span>{item.title}</span>
                </div>
                <div className="favorites-item__link">
                  <Link to={`${item.id}`}
                  >Learn more</Link>
                </div>
              </div>
              <div className="favorites-item__actions">
                <div className="favorites-item__price">
                  <span>{item.price} $</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentlyViewed;