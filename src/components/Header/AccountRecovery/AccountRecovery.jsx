import React, { useContext, useRef, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import './AccountRecovery.css';
import { headerContext } from '../../../contexts/HeaderContext';

//Импорт изображений
import closeIcon from '../../../assets/icon/header/close-icon.svg';
import signUpLogo from '../../../assets/img/header/sign-up-in-logo.png'


const AccountRecovery = () => {
    const { 
        recoveryModalstatus, 
        closeAccountRecovery, 
        openSignInFormModal,
     } = useContext(headerContext);

    const emailRef = useRef();
    const { resetPassword } = useAuth();
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setMessage('')
            setError('');
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage('Verification code was sended on your email')
        } catch {
            setError('Enter a valid email');
        }
        setLoading(false);
    }

    return (
        <>
            {recoveryModalstatus ? <div className="recovery-modal">
                <div className="recovery-modal-inner">
                    <div className="recovery-modal__close-icon">
                        <img onClick={() => {
                            closeAccountRecovery();
                            setMessage('');
                            }} src={closeIcon} alt="" />
                    </div>
                    <div className="recovery-logo">
                        <img src={signUpLogo} alt="" />
                    </div>
                    <div className="recovery-inp">
                        <span>Account recovery</span>
                        {error && <div className="email-error">{error}</div>}
                        {message && <div className="verification-code">{message}</div>}
                        <input type="email"
                            className="recovery-mail"
                            placeholder="Email Address"
                            ref={emailRef}
                            required
                        />
                    </div>
                    <div className="recovery-btn">
                        <button type="submit" onClick={handleSubmit}>Reset Password</button>
                    </div>
                    <div className="recovery-end">
                        <span onClick={() => {
                            openSignInFormModal();
                            closeAccountRecovery();
                            setError('');
                            setMessage('');
                        }}>Back to Sign In</span>
                    </div>
                </div>
            </div> : null}
        </>

    );
};

export default AccountRecovery;