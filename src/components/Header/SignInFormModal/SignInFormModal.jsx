import React, { useContext, useRef, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { headerContext } from '../../../contexts/HeaderContext';
import './SignInFormModal.css';
import GoogleButton from 'react-google-button';

//Импорт изображений
import closeIcon from '../../../assets/icon/header/close-icon.svg';
import signUpLogo from '../../../assets/img/header/sign-up-in-logo.png'

const SignInFormModal = () => {
    const {
        signInFormModalStatus,
        closeSignInFormModal,
        openSignUpFormModal,
        openAccountRecovery
    } = useContext(headerContext);

    const emailRef = useRef();
    const passwordRef = useRef();
    const { signIn, signInWithGoogle } = useAuth();
    const [error, setError] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPass, setErrorPass] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {

        if (!emailRef.current.value && !passwordRef.current.value) {
            return (
                setErrorEmail('Enter email'),
                setErrorPass('Enter password')
            )
        }
        try {
            setErrorEmail('')
            setErrorPass('')
            setLoading(true);
            await signIn(emailRef.current.value, passwordRef.current.value);
            closeSignInFormModal();
        } catch {
            setError("Account doesn't exist");
        }
        setLoading(false);
    }

    return (
        <>
            {signInFormModalStatus ?
                <div className="sign-in__modal">
                    <div className="sign-in__modal-inner">
                        <div className="sign-in__close-icon">
                            <img onClick={() => {
                                closeSignInFormModal()
                                setError('')}} src={closeIcon} alt="" />
                        </div>
                        <div className="sign-in__modal-logo">
                            <img src={signUpLogo} alt="" />
                            <span>{error}</span>
                        </div>
                        <div className="sign-in__modal-inp">
                            <input type="email"
                                className="in-inp__mail"
                                placeholder="Email Address"
                                ref={emailRef}
                                required
                            />
                            <span>{errorEmail}</span>
                            <input type="password"
                                className="in-inp__pass"
                                placeholder="Password"
                                ref={passwordRef}
                                required
                            />
                            <p>{errorPass}</p>
                        </div>
                        <div className="sign-in__modal-btn">
                            <button type="submit" onClick={() => {
                                handleSubmit();
                                setError('');
                                }}>SIGN IN</button>
                        </div>
                        <div className="forgot-password" onClick={() => {
                            openAccountRecovery();
                            closeSignInFormModal();
                            setErrorEmail('');
                            setErrorPass('');
                            setError('');
                        }}>Forgot Password?</div>
                        <div className="sign-in__modal-end">
                            <span onClick={() => {
                                openSignUpFormModal();
                                closeSignInFormModal();
                                setErrorEmail('');
                                setErrorPass('');
                                setError('');
                            }}>CREATE AN ACCOUNT</span>
                        </div>
                        <GoogleButton type="light" onClick={() => {
                            signInWithGoogle();
                            closeSignInFormModal();
                            }} />
                    </div>
                </div>
                : null}
        </>
    );
};

export default SignInFormModal;