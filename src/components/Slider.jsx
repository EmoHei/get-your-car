import React from 'react';
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { db } from "../firebase";

import { useNavigate } from "react-router-dom";
import SpinnerComp from './SpinnerComp';
import { Carousel } from 'react-bootstrap';

export default function Slider() {
    const [listings, setListings] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchListings() {
            const listingsRef = collection(db, "listings");
            const q = query(listingsRef, orderBy("timestamp", "desc"), limit(5));
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
        fetchListings();
    }, []);
    if (loading) {
        return <SpinnerComp />;
    }
    if (listings.length === 0) {
        return <></>;
    }
    return (
        listings && (
            <>
                <Carousel
                    fade
                >
                    {listings.map(({ data, id }) => (
                        <Carousel.Item
                            key={id}
                            onClick={() => navigate(`/category/${data.type}/${id}`)}
                        >
                            <div
                                style={{
                                    background: `url(${data.imgUrls[0]})`,
                                    height: '400px',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover',
                                    position: 'relative'
                                }} >
                            </div>
                            <p
                                style={{
                                    position: 'absolute',
                                    top: '1px',
                                    color: '#f1faee',
                                    left: '2px',
                                    fontWeight: '600',
                                    maxWidth: '90%',
                                    backgroundColor: '#457b9d',
                                    padding: '5px 10px',
                                    borderBottomRightRadius: "20px",

                                }}
                            >{data.name}</p>
                            <p
                                style={{
                                    position: 'absolute',
                                    bottom: '-14px',
                                    color: '#f1faee',
                                    left: '2px',
                                    fontWeight: '700',
                                    maxWidth: '90%',
                                    backgroundColor: '#e63946',
                                    padding: '5px 10px',
                                    borderTopRightRadius: "20px",

                                }}
                            >${data.price.toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                {data.type === 'rent' ? " / month" : ""}
                            </p>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </>
        )
    );
}

