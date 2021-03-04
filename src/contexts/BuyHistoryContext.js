import React, { useEffect, useReducer } from 'react';
import { dataBase } from '../firebase';
import { auth } from '../firebase';

export const buyHistoryContext = React.createContext();

const INIT_STATE = {
  buyHistoryData: []
}

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "SET_BUY_HISTORY": return {
      ...state,
      buyHistoryData: action.payload
    }
    default: return state;
  }
}

const BuyHistoryContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  //Получаем данные истории покупок
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        dataBase.collection('Buyer-Info ' + user.uid).onSnapshot((querySnapshot) => {
          const item = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
          }))
          getBuyerHistory(item)
        })
      }
    })

  }, []);

  //Помещаем товар в state истории покупок
  const getBuyerHistory = (data) => {
    dispatch({
      type: "SET_BUY_HISTORY",
      payload: data
    })
  }
  return (
    <buyHistoryContext.Provider value={{
      buyHistoryData: state.buyHistoryData
    }}>
      {children}
    </buyHistoryContext.Provider>
  )
}

export default BuyHistoryContextProvider;