import React from 'react';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    collection,
    getDocs,
    limit,
    orderBy,
    query,
    startAfter,
    where,
} from "firebase/firestore";
import { db } from "../firebase";
import SpinnerComp from "../components/SpinnerComp";
import ListingItem from "../components/ListingItem";
import { Button } from 'react-bootstrap';

export default function Offers() {
    const [listings, setListings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [lastFetchedListing, setLastFetchListing] = useState(null);
    useEffect(() => {
        async function fetchListings() {
            try {
                const listingRef = collection(db, "listings");
                const q = query(
                    listingRef,
                    where("offer", "==", true),
                    orderBy("timestamp", "desc"),
                    limit(6)
                );
                const querySnap = await getDocs(q);
                const lastVisible = querySnap.docs[querySnap.docs.length - 1];
                setLastFetchListing(lastVisible);
                const listings = [];
                querySnap.forEach((doc) => {
                    return listings.push({
                        id: doc.id,
                        data: doc.data(),
                    });
                });
                setListings(listings);
                setLoading(false);
            } catch (error) {
                toast.error("Could not fetch listing");
            }
        }
        fetchListings();
    }, []);

    async function onFetchMoreListings() {
        try {
            const listingRef = collection(db, "listings");
            const q = query(
                listingRef,
                where("offer", "==", true),
                orderBy("timestamp", "desc"),
                startAfter(lastFetchedListing),
                limit(4)
            );
            const querySnap = await getDocs(q);
            const lastVisible = querySnap.docs[querySnap.docs.length - 1];
            setLastFetchListing(lastVisible);
            const listings = [];
            querySnap.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data(),
                });
            });
            setListings((prevState) => [...prevState, ...listings]);
            setLoading(false);
        } catch (error) {
            toast.error("Could not fetch listing");
        }
    }
    return (
        <div className="">
            <h1 style={{ textAlign: 'center', margin: '30px' }}>Offers</h1>
            {loading ? (
                <SpinnerComp />
            ) : listings && listings.length > 0 ? (
                <>
                    <ul style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                        {listings.map((listing) => (
                            <ListingItem
                                key={listing.id}
                                id={listing.id}
                                listing={listing.data}
                            />
                        ))}
                    </ul>
                    {lastFetchedListing && (
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button variant="outline-secondary"
                                style={{ width: '30%' }}
                                onClick={onFetchMoreListings}
                            >
                                Load more
                            </Button>
                        </div>
                    )}
                </>
            ) : (
                <p>There are no current offers</p>
            )}
        </div>
    );
}