import React from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Button from 'react-bootstrap/Button';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router';


export default function GoogleAuthBtnComp() {
    const navigate = useNavigate()
    async function onGoogleClick() {
        try {
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            // Before register user i the db- check if user already exist
            const docRef = doc(db, 'users', user.uid);
            // check if user already exist
            const docSnap = await getDoc(docRef);
            //if not..
            if (!docSnap.exists()) {
                await setDoc(docRef, {
                    name: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp(),

                });
            }
            navigate('/')
            toast.success('You have register successful with Google account')
        } catch (error) {
            toast.error("Could not authorize with Google")
        }
    }
    return (
        <div>
            <Button
                variant="primary"
                //  !! Important: type must be 'button' Not 'submit'
                type="button"
                className="google-btn"
                onClick={onGoogleClick}>
                <span className="google-icon"><FcGoogle /></span>
                Continue with Google
            </Button>
        </div>
    )
}