import React, { useContext } from 'react';
import { headerContext } from '../../../contexts/HeaderContext';
import './SignUpForm.css';

const SignUpForm = () => {
    const {openSignUpFormModal} = useContext(headerContext);
    return (
        <div className="sign-up__form">
            <span onClick={() => openSignUpFormModal()}>Sign up</span>
        </div>
    );
};

export default SignUpForm;