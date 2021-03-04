import React, { useContext } from 'react';
import { headerContext } from '../../../contexts/HeaderContext';
import './SignInForm.css';

const SignInForm = () => {
    const {openSignInFormModal} = useContext(headerContext);
    return (
        <div className="sign-in__form">
            <span onClick={() => openSignInFormModal()}>Sign in</span>
        </div>
    );
};

export default SignInForm;

