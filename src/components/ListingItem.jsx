import "./ListingItem.scss";
import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Moment from 'react-moment'
import 'moment-timezone'
import { MdEdit, MdLocationOn } from "react-icons/md";
import { FaTrash } from "react-icons/fa";


export default function ListingItem({ listing, id, onEdit, onDelete }) {

    return (
        <li className="li">
            <Card fluid="md" className="card-container">
                <Link className='content' to={`/category/${listing.type}/${id}`}>
                    <Col className="image-container">
                        <img
                            src={listing.imgUrls[0]}
                            alt={listing.name}
                            loading="lazy"
                            className="img"
                        />
                    </Col>
              
                    <Moment fromNow className="moment" >{listing.timestamp.toDate().toString()}</Moment>
                   
                </Link>
                <Col style={{ padding: '5px' }}>
                    <div style={{ display: 'flex' }}>
                        <MdLocationOn style={{ marginTop: '20px', color: 'green' }}>
                        </MdLocationOn>
                        <p className="address truncate">
                            {listing.fuel}
                        </p>
                    </div>
                    <p className="card-title">{listing.brand}</p>
                    {/* <p style={{ color: '#457b9d', fontWeight: '500' }}>
                        $
                        {listing.offer
                            ? listing.price
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            : listing.regularPrice
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        {listing.type === "rent" && " / Month"}
                    </p> */}
                    <div style={{ display: 'flex' }}>
                        <div >
                            <p style={{ marginRight: '15px', color: '#29526b', fontWeight: '500' }}>
                                {listing.month} / {listing.year}
                               
                            </p>
                        </div>
                        <div>
                            <p className="" style={{ color: '#29526b', fontWeight: '500' }}>
                                {listing.color}
                            </p>
                        </div>
                        <div>
                            {onEdit && (
                                <MdEdit
                                    style={{ position: 'absolute', right: '50px', marginRight: '5px', cursor: 'pointer' }}
                                    className="editIcon"
                                    onClick={() => onEdit(listing.id)}
                                />
                            )}
                            {onDelete && (
                                <FaTrash
                                    style={{ position: 'absolute', right: '10px', marginRight: '5px', color: 'red', cursor: 'pointer' }}
                                    className="deleteIcon"
                                    onClick={() => onDelete(listing.id)}
                                />
                            )}
                        </div>
                    </div>

                </Col>
            </Card>
        </li>
    )
}
