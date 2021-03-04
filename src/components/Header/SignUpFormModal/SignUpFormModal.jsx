import React, { useContext, useRef, useState } from 'react';
import './SignUpFormModal.css';
import closeIcon from '../../../assets/icon/header/close-icon.svg';
import signUpLogo from '../../../assets/img/header/sign-up-in-logo.png';
import { headerContext } from '../../../contexts/HeaderContext';
import { useAuth } from '../../../contexts/AuthContext';

const SignUpFormModal = () => {
    const { 
        signUpFormModalStatus,
        closeSignUpFormModal,
        openSignInFormModal
    } = useContext(headerContext);

    const emailRef = useRef();
    const passwordRef = useRef();
    const firstNameRef = useRef();
    const passwordConfirmRef = useRef();
    const { signUp } = useAuth();
    const [error, setError] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [passwordLenghtError, setPasswordLenghtError] = useState('');
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(passwordRef.current.value.length < 6) {
            return setPasswordLenghtError('For password use 6 characters or more');    
        }else if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return (setError('Passwords didn’t match'), setPasswordLenghtError(false));
        }
        try{
            setLoading(true);
            await signUp(
                emailRef.current.value, 
                passwordRef.current.value, 
                firstNameRef.current.value);
            closeSignUpFormModal();
        } catch {}
        setLoading(false);
        
    }

    return (
        <>
            {signUpFormModalStatus ?
                <div className="sign-up__modal">
                    <div className="sign-up__modal-inner">
                        <div className="sign-up__close-icon">
                            <img onClick={() => {
                                closeSignUpFormModal()
                                setError('')
                                }} src={closeIcon} alt="" />
                        </div>
                        <div className="sign-up__modal-logo">
                            <img src={signUpLogo} alt="" />
                        </div>
                        <div className="sign-up__modal-title">
                            <h2>CREATE YOUR ACCOUNT</h2>
                        </div>
                        <div className="sign-up__modal-inp">
                            <input type="text" 
                                className="up-inp__name" 
                                placeholder="Name"
                                ref={firstNameRef}
                                required
                            />
                            <input type="email" 
                                className="up-inp__mail" 
                                placeholder="Email Address" 
                                ref={emailRef}
                                required
                            />
                            {errorEmail && <div className="email-error">{errorEmail}</div>}
                            <div className="password-section">
                            {error && <div className="password-error">{error}</div>}
                            <input type="password" 
                                className="up-inp__pass" 
                                placeholder="Password"
                                ref={passwordRef} 
                                required
                            />
                            <input type="password" 
                                className="up-inp__confirm-pass" 
                                placeholder="Password Confirmation" 
                                ref={passwordConfirmRef} 
                                required
                            />
                            </div>
                            {
                                passwordLenghtError ? 
                                passwordLenghtError && <div className="password-length-error">{passwordLenghtError}</div> : 
                                <div className="sign-up__notification">Use 6 or more characters with a mix of letters, numbers & symbols</div>
                            }
                            
                        </div>
                        <div className="sign-up__modal-btn">
                            <button type="submit" onClick={handleSubmit}>CREATE ACCOUNT</button>
                        </div>
                        <div className="sign-up__modal-end">
                            <span onClick={() => {{
                                openSignInFormModal();
                                closeSignUpFormModal();
                                setError('');
                                setPasswordLenghtError('');
                                setErrorEmail('');
                            }}}>Already have an account? Sign In</span>
                        </div>
                    </div>
                </div> : null}
        </>
    );
};

export default SignUpFormModal;