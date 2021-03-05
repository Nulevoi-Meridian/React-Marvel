import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import firebase from 'firebase/app';
import { dataBase } from '../firebase';

const authContext = React.createContext();

export function useAuth() {
    return useContext(authContext);
}

const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    
    //Регистрируем пользователя и помещаем имя в отдельную коллекцию
    const signUp = async (email, password, firstName) => {
        return await auth.createUserWithEmailAndPassword ( 
            email, 
            password,
            ).then((cred)=>{
                dataBase.collection('SignedUpUsersData').doc(cred.user.uid).set({
                    name: firstName,
                    email: email,
                    password: password,
                    uid: cred.user.uid
                })
            })
        }
        
        //Инициализация входа
        const signIn = async (email, password) => {
            return await auth.signInWithEmailAndPassword ( 
                email, 
                password
                );    
            }
            
            //LogOut текущего пользователя
            const logOut = async () => {
                return await auth.signOut();    
            }
            
            //Восстановление пароля
            const resetPassword = async (email) => {
                return await auth.sendPasswordResetEmail(email)
            }
            
            //Вход с помощью Google
            const signInWithGoogle = async () => {
                const provider = new firebase.auth.GoogleAuthProvider();
                const {user} = await auth.signInWithPopup(provider);
            }
            
            //Объединяем данные регистрации и имя пользователя в одну коллекцию
            useEffect(() => {
                const unsubscribe = auth.onAuthStateChanged(user => {
                    if(user) {
                        dataBase.collection('SignedUpUsersData').doc(user.uid).get().then(
                            snapshot => {
                                setCurrentUser({
                                    ...currentUser, 
                                    name: snapshot.data()?.name || user?.displayName,
                                    cell: snapshot.data()?.cell,
                                    country: snapshot.data()?.country,
                                    deliveryAdress: snapshot.data()?.deliveryAdress,
                                    email: user.email,
                                    uid: user.uid
                        })
                    }
                )
            } else {
                setCurrentUser({
                    user: null
                })
            } 
            setLoading(false);
        })
        return unsubscribe;
    }, []);


    const value = {
        currentUser,
        signUp,
        signIn,
        logOut,
        resetPassword,
        signInWithGoogle
    }

    return (
        <authContext.Provider value={value}>
            {!loading && children}
        </authContext.Provider>
    );
};

export default AuthContextProvider;