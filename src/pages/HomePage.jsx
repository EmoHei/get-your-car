import React, { useEffect, useState } from 'react';
import './HomePage.scss'
import {
  collection,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import { Link } from "react-router-dom";
import ListingItem from "../components/ListingItem";
import Slider from "../components/Slider";
import { db } from "../firebase";

export default function Home() {
  // Offers
  const [offerListings, setOfferListings] = useState(null);
  useEffect(() => {
    async function fetchListings() {
      try {
        // get reference
        const listingsRef = collection(db, "listings");
        console.log(listingsRef)
        // create the query
        const q = query(
          listingsRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(4)
        );
       // execute the query
        const querySnap = await getDocs(q);
    
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setOfferListings(listings);

      } catch (error) {
        console.log(error);
      }
    }
    fetchListings();
  }, []);
  // Cars for rent
  const [rentListings, setRentListings] = useState(null);
  useEffect(() => {
    async function fetchListings() {
      try {
        // get reference
        const listingsRef = collection(db, "listings");
        // create the query
        const q = query(
          listingsRef,
          where("type", "==", "rent"),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        // execute the query
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setRentListings(listings);

      } catch (error) {
        console.log(error);
      }
    }
    fetchListings();
  }, []);
  // Cars for sell
  const [saleListings, setSaleListings] = useState(null);
  useEffect(() => {
    async function fetchListings() {
      try {
        // get reference
        const listingsRef = collection(db, "listings");
        // create the query
        const q = query(
          listingsRef,
          where("type", "==", "sell"),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        // execute the query
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setSaleListings(listings);

      } catch (error) {
        console.log(error);
      }
    }
    fetchListings();
  }, []);
  return (
    <div>
    
      <Slider />
      <div>
        {offerListings && offerListings.length > 0 && (
          <div>

            <h2 className='title-offer-sale-rent'>Recent offers</h2>
            <Link to="/offers">
              <p className='sub-title'>
                Show more offers
              </p>
            </Link>
            <ul style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
              {offerListings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div>
            <h2 className="title-offer-sale-rent">Cars for rent</h2>
            <Link to="/category/rent">
              <p className='sub-title'>
                Show more Cars for rent
              </p>
            </Link>
            <ul className=""
              style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}
            >
              {rentListings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className='title-offer-sale-rent'>Cars for sale</h2>
            <Link to="/category/sale">
              <p className='sub-title'>
                Show more Cars for sale
              </p>
            </Link>
            <ul style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
              {saleListings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );

}  

