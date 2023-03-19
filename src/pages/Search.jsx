import React, { useEffect, useState } from "react";

import {
  getFirestore,
  doc,
  getDocs,
  collection,
  where,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase";
import ListingItem from "../components/ListingItem";
import { useLocation } from "react-router";

const Search = () => {
  const [search, setSearch] = useState({});

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let querySearch = useQuery();
  let matched = querySearch.get("brand");
//   console.log(">>", matched);

    useEffect(() => {
        async function fetchListings() {
            try {

                const listingsRef = collection(db, "listings");
             
                const q = query(
                    listingsRef,
                    where("offer", "==", true),
                    orderBy("timestamp", "desc"),
                   
                );

                const querySnap = await getDocs(q)
                

                const listings = [];
                querySnap.forEach((doc) => {
                    return listings.push({
                        id: doc.id,
                        data: doc.data(),
                    });
                   
                });
         
// console.log(listings)

    

listings.filter((item )=> {
    item.data.brand.includes('V')})
   
    

                setSearch(listings);
            } catch (error) {
                console.log(error);
            }
        }
        // console.log('>>>>>>>>>>',search);
        fetchListings();
    }, []);
  
  return (
    <div className="container">
          {search && search.length > 0 && (
        <div>
          <h2 className="title-offer-sale-rent">Recent offers</h2>

          <ul
            className="ul-listings"
            style={{
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
            }}
          >
            {search.map((listing) => (
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
  );
};

export default Search;

// import {
//     collection,
//     getDocs,
//     orderBy,
//     query,
//     where,
// } from "firebase/firestore";

// import { Link, useLocation, useSearchParams } from "react-router-dom";
// import ListingItem from "../components/ListingItem";
// import { db } from "../firebase";

// const Search = () => {
//     const [data, setData] = useState({});

// const useQuery = () => {

//     return new URLSearchParams(useLocation().search)
// };
// let querySearch = useQuery()
// let search = querySearch.get('brand')
// console.log('>>', search);

// useEffect(() => {
// db.collection('listings').on('value', (snapshot)=>{
//     if (snapshot.val() !== null){
//         setData({...snapshot.val()})
//           console.log(data);
//     }else{
//         setData({})

//     }

// },);

// const searchData = () => {
//     db.querySearch('listings').orderBy('brand').equalTo(search).on("value", (snapshot) => {

//         if (snapshot.val()) {
//             const data = snapshot.val()
//             setData(data)
//             console.log(data)
//         }
//     })
// }

//  async function fetchListings() {
//             try {
//                 const listingsRef = collection(db, "listings");

//                 const q = query(
//                     listingsRef,
//                     where("offer", "==", true),
//                     orderBy("timestamp", "desc"),
//                 );

//                 const querySnap = await getDocs(q);
//                 const listings = [];

//                 querySnap.forEach((doc) => {
//                     console.log(doc);
//                     return listings.push({
//                         id: doc.id,
//                         data: doc.data(),
//                     });

//                 });

//              setData(listings);

//             } catch (error) {
//                 console.log(error);
//             }

//         }
//

//     return (
//         <>
//             <div>
//                 <h2>Search Results 2</h2>
//                 {/* {search && search.length > 0 && (
//                     <div>
//                         <h2 className="title-offer-sale-rent">Recent offers</h2>
//                         <Link to="/offers">
//                             <p className="sub-title">Show more offers</p>
//                         </Link>
//                         <ul
//                             className="ul-listings"
//                             style={{
//                                 display: "flex",
//                                 justifyContent: "space-around",
//                                 flexWrap: "wrap",
//                             }}
//                         >
//                             {search.map((listing) => (
//                                 <ListingItem
//                                     key={listing.id}
//                                     listing={listing.data}
//                                     id={listing.id}
//                                 />
//                             ))}
//                         </ul>
//                     </div>
//                 )} */}
//             </div>
//         </>
//     );
// };

// export default Search;
