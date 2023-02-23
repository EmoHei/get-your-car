import React from "react";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { Button, Form } from "react-bootstrap";

export default function Contact({ userRef, listing }) {
    const [carOwner, setCarOwner] = useState(null);
    const [message, setMessage] = useState("");
    useEffect(() => {
        async function getCarOwner() {
            const docRef = doc(db, "users", userRef); // userRef is In  Listing component <Contact>
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setCarOwner(docSnap.data());
            } else {
                toast.error("Could not get car owner data");
            }
        }
        getCarOwner();
    }, [userRef]);
    function onChange(e) {
        setMessage(e.target.value);
    }
    return (
        <>
            {carOwner !== null && (
                <div className="flex flex-col w-full">
                    <p>
                        Contact {carOwner.name} for the {listing.brand.toLowerCase()}
                    </p>
                    <div className="">
                        <Form.Control
                            as="textarea"
                            placeholder="Leave a message here"
                            style={{ height: '100px' }}
                            name="message"
                            id="message"
                            value={message}
                            onChange={onChange}
                            className=""
                        ></Form.Control>
                    </div>
                    <a
                        href={`mailto:${carOwner.email}?Subject=${listing.brand}&body=${message}`}
                    >
                        <Button
                            type="button"
                            style={{
                                marginTop: '20px'
                            }}
                        > Send Message</Button>
                    </a>
                </div>
            )}
        </>
    );
}
