import React, { useContext, useEffect, useState } from 'react';
import { buyHistoryContext } from '../../contexts/BuyHistoryContext';
import './BuyHistory.css';


const BuyHistory = () => {

  const { buyHistoryData } = useContext(buyHistoryContext);

  return (
    <>
    {buyHistoryData.length ? <div className="buy-history-section">
    {buyHistoryData.map(item => (
      <div key={item.id} className="buy-history__inner">
        <div className="buy-history__item">
          <div className="buy-history__date">
            Date: {item.Date}
          </div>
          <div className="buy-history__name">
            Name: {item.BuyerName}
          </div>
          <div className="buy-history__email">
            Email: {item.BuyerEmail}
          </div>
          <div className="buy-history__quantity">
            Quantity: {item.BuyerQuantity}
          </div>
          <div className="buy-history__payment">
            Payment: {item.BuyerPayment}$
          </div>
          <div className="buy-history__product-name">
            ProductName: {item.ProductName}
          </div>
        </div>
      </div>
    ))}
  </div> : <div className="empty-history">Seems nothing is here</div>}
    </>
  );
};

export default BuyHistory;