import React, { useReducer } from 'react';
import axios from 'axios';

export const headerContext = React.createContext();

const INIT_STATE = {
    signInFormModalStatus: false,
    signUpFormModalStatus: false,
    recoveryModalstatus: false
}

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "OPEN_SIGN_IN_FORM_MODAL": return {
            ...state,
            signInFormModalStatus: true
        }
        case "CLOSE_SIGN_IN_FORM_MODAL": return {
            ...state,
            signInFormModalStatus: false
        }
        case "OPEN_SIGN_UP_FORM_MODAL": return {
            ...state,
            signUpFormModalStatus: true
        }
        case "CLOSE_SIGN_UP_FORM_MODAL": return {
            ...state,
            signUpFormModalStatus: false
        }
        case "OPEN_RECOVERY_FORM_MODAL": return {
            ...state,
            recoveryModalstatus: true
        }
        case "CLOSE_RECOVERY_FORM_MODAL": return {
            ...state,
            recoveryModalstatus: false
        }
        default: return state;
    }
}

const HeaderContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE)

    const openSignInFormModal = () => {
        dispatch({
            type: "OPEN_SIGN_IN_FORM_MODAL",
        })
    }

    const closeSignInFormModal = () => {
        dispatch({
            type: "CLOSE_SIGN_IN_FORM_MODAL"
        })
    }

    const openSignUpFormModal = () => {
        dispatch({
            type: "OPEN_SIGN_UP_FORM_MODAL",
        })
    }

    const closeSignUpFormModal = () => {
        dispatch({
            type: "CLOSE_SIGN_UP_FORM_MODAL"
        })
    }
    
    const openAccountRecovery = () => {
        dispatch({
            type: "OPEN_RECOVERY_FORM_MODAL"
        })
    }

    const closeAccountRecovery = () => {
        dispatch({
            type: "CLOSE_RECOVERY_FORM_MODAL"
        })
    }

    return (
        <headerContext.Provider value = {{
            signInFormModalStatus: state.signInFormModalStatus,
            signUpFormModalStatus: state.signUpFormModalStatus,
            recoveryModalstatus: state.recoveryModalstatus,
            openSignInFormModal,
            closeSignInFormModal,
            openSignUpFormModal,
            closeSignUpFormModal,
            openAccountRecovery,
            closeAccountRecovery
        }}>
            {children}
        </headerContext.Provider>
    )
}

export default HeaderContextProvider;