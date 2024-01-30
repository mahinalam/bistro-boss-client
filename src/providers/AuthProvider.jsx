import React, { createContext, useEffect, useState } from 'react';
export const AuthContext = createContext(null)
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase-config';
import { GoogleAuthProvider } from "firebase/auth";
import axios from 'axios';
const googleProvider = new GoogleAuthProvider()
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isLoading, setIsLoading] = useState(true)




    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const handleGoogleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    };

    //TODO: make loading dynamic

    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            console.log('currentUser', currentUser)
            if (currentUser && currentUser?.email) {
                axios.post(`${import.meta.env.VITE_API_URL}/jwt`, { email: currentUser.email })
                    .then(res => {
                        const token = res.data.token;
                        if (token) {
                            localStorage.setItem('access-token', token)
                            setLoading(false)
                            setIsLoading(false)
                        }
                    })
            }
            else {
                localStorage.removeItem('access-token')
                setLoading(false)
                setIsLoading(true)
            }


        })

        return () => {
            return unsubscribe()
        }
    }, [])





    const authInfo = {
        user,
        createUser,
        signIn,
        updateUserProfile,
        loading,
        setLoading,
        handleGoogleSignIn,
        logOut,
        isLoading

    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;