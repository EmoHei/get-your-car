import React from 'react';
import "./Profile.scss";

import { getAuth, updateProfile } from "firebase/auth";
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    orderBy,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { AiFillCar } from "react-icons/ai";
import { useEffect } from "react";
import ListingItem from "../components/ListingItem";
import { Form, Button, Container, FormControl } from 'react-bootstrap';

export default function Profile() {
    const auth = getAuth();
    const navigate = useNavigate();
    const [changeDetail, setChangeDetail] = useState(false);
    const [listings, setListings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
    });

    const { name, email } = formData;
    function onLogout() {
        auth.signOut();
        navigate("/");
    }

    function onChange(e) {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    }
    async function onSubmit() {
        try {
            if (auth.currentUser.displayName !== name) {
                //update display name in firebase auth
                await updateProfile(auth.currentUser, {
                    displayName: name,
                });

                // update name in the firestore
                const docRef = doc(db, "users", auth.currentUser.uid);
                await updateDoc(docRef, {
                    name,
                });
            }
            toast.success("Profile details updated");
        } catch (error) {
            toast.error("Could not update the profile details");
        }
    }
    useEffect(() => {
        async function fetchUserListings() {
            const listingRef = collection(db, "listings");
            const q = query(
                listingRef,
                where("userRef", "==", auth.currentUser.uid),
                orderBy("timestamp", "desc")
            );
            const querySnap = await getDocs(q);
            let listings = [];
            querySnap.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data(),
                });
            });
            setListings(listings);
            setLoading(false);
        }
        fetchUserListings();
    }, [auth.currentUser.uid]);

    // Delete
    async function onDelete(listingID) {
        if (window.confirm("Are you sure you want to delete ?")) {
            await deleteDoc(doc(db, "listings", listingID));
            const updatedListings = listings.filter(
                (listing) => listing.id !== listingID
            );
            setListings(updatedListings);
            toast.success("Successfully deleted");
        }
    }
    // Edit
    function onEdit(listingID) {
        navigate(`/edit-listing/${listingID}`);
    }
    return (
        <>
            <Container className="form-section">
                <h1 className='title'>My Profile</h1>
                <div className='form-container'>
                    <Form>
                     
                        <Form.Group className="mb-3" id="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <FormControl

                                type="text"
                                id='name'
                                value={name}
                                disabled={!changeDetail}
                                onChange={onChange}
                                style={{ backgroundColor: changeDetail ? "rgb(250, 220, 220)" : 'white' }}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" id="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                id='email'
                                value={email}
                                className="name-input"
                                disabled={!changeDetail} />
                        </Form.Group>
                        <Form.Group className="mb-3 edit-sign-out-form-group" id="formBasicEmail">
                            <Form.Label>Do you want to change your name?
                                <span onClick={() => {
                                    changeDetail && onSubmit()
                                    setChangeDetail((prevState) => !prevState)
                                }}
                                >
                                    {changeDetail ? ' Apply-change' : ' Edit'}
                                </span>
                            </Form.Label>
                            <p style={{ marginBottom: '8px' }} onClick={onLogout}>Sign Out</p>
                        </Form.Group>
                     
                        <Button
                            variant="primary"
                            type="submit"
                            className='sell-rent-btn' >
                            <Link className='rent-sell-link' to="/create">
                                <AiFillCar className='car-icon' />
                                Sell or rent your car
                            </Link>
                        </Button>
                    </Form>
                </div>
            </Container>
            {!loading && listings.length > 0 && (
                <>
                    <h2 style={{ textAlign: 'center' }}>My Listings</h2>

                    <ul style={{ display: "flex", justifyContent: 'center', flexWrap: "wrap", padding: '0' }}>
                        {listings.map((listing) => (
                            <ListingItem
                                className="item"
                                key={listing.id}
                                id={listing.id}
                                listing={listing.data}
                                onDelete={() => onDelete(listing.id)}
                                onEdit={() => onEdit(listing.id)}
                            />
                        ))}
                    </ul>
                </>
            )}

        </>

    )
}
