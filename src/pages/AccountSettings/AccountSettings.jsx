import React, { useEffect, useState } from 'react';
import './AccountSettings.css';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import { dataBase } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';


const AccountSettings = () => {
    const { currentUser } = useAuth();

    const [modalOpen, setModalOpen] = useState(false);
    const [item, setItem] = useState('')

    const openModal = () => {
        setModalOpen(!modalOpen)
    }

    const getInpValue = (e) => {
        const newData = {
            ...item,
            [e.target.name]: e.target.value
        }
        setItem(newData);
    }

    const setOrderInfo = () => {
        auth.onAuthStateChanged(user => {
            if (user) {
                dataBase.collection('SignedUpUsersData').doc(user.uid).update({
                    cell: item.cell,
                    country: item.country,
                    deliveryAdress: item.delivery
                })
            }
        })
        setModalOpen(!modalOpen);
    }

    return (
        <>
            <div className="account-settings">
                <div className="container">
                    <div className="account-settings__inner">
                        <div className="account-settings__info">
                            <div className="account-settings__title">
                                <span>ACCOUNT and ORDER INFO</span>
                            </div>
                            <div className="account-settings__order">
                                <span>Name: {currentUser?.name}</span>
                            </div>
                            <div className="account-settings__order">
                                <span>Email: {currentUser?.email}</span>
                            </div>
                            <div className="account-settings__order">
                                <span>Cell No: {currentUser?.cell}</span>
                            </div>
                            <div className="account-settings__order">
                                <span>Country: {currentUser?.country}</span>
                            </div>
                            <div className="account-settings__order">
                                <span>Delivery Adress: {currentUser?.deliveryAdress}</span>
                            </div>
                            <div
                                onClick={openModal}
                                className="update-settings__btn"
                            >Update Info</div>
                            <Link to="/buyhistory"><div
                                className="buy-history"
                            >Buy history</div></Link>
                        </div>
                        {modalOpen ? <div className="account-settings__modal">
                            <div className="account-settings__modal-inner">
                                <input type="text"
                                    //   value={item.title}
                                    placeholder="Add Cell No"
                                    name="cell"
                                    onChange={getInpValue}
                                />
                                <input type="text"
                                    //   value={item.title}
                                    placeholder="Add Country"
                                    name="country"
                                    onChange={getInpValue}
                                />
                                <input type="text"
                                    //   value={item.title}
                                    placeholder="Delivery Adress"
                                    name="delivery"
                                    onChange={getInpValue}
                                />
                                <div
                                    onClick={setOrderInfo}
                                    className="updated-info"
                                >OK</div>
                            </div>
                        </div> : null}
                    </div>
                    <Link to="/"><div className="back-from-settings">Back To Main</div></Link>
                </div>
            </div>
        </>
    );
};

export default AccountSettings;