import React, { useReducer } from 'react';
import axios from 'axios';
import { API_COMMENTS } from '../helpers/constants';
import { useAuth } from '../contexts/AuthContext';

export const commentsContext = React.createContext();

const INIT_STATE = {
    productsComments: []
}

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "GET_COMMENT": return {
            ...state,
            productsComments: action.payload,
        }
        default: return state;
    }
}

const CommentsContextProvider = ({ children }) => {
    const { currentUser } = useAuth();

    const [state, dispatch] = useReducer(reducer, INIT_STATE);

    const setDataComments = async (commentId, comment) => {
        const productComments = {
            commentId,
            ...comment,
            userName: currentUser.name,
            date:new Date().toLocaleString()
        }
        await axios.post(`${API_COMMENTS}`, productComments)
        getDataComments(commentId);
    }

    const getDataComments = async (commentId) => {
        const { data } = await axios(`${API_COMMENTS}?commentId=${commentId}`)
        dispatch({
            type: "GET_COMMENT",
            payload: data
        })
    }
    
    return (
        <commentsContext.Provider value={{
            productsComments: state.productsComments,
            setDataComments,
            getDataComments
        }}>
            {children}
        </commentsContext.Provider>
    )
}

export default CommentsContextProvider;