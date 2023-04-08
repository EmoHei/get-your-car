import "./ListingItem.scss";
import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import "moment-timezone";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

export default function ListingItem({ listing, id, onEdit, onDelete }) {
  return (
    <li className="li">
      <Card fluid="md" className="card-container">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Row>
            <Link className="content" to={`/category/${listing.type}/${id}`}>
              <Col className="image-container">
                <img
                  src={listing.imgUrls[0]}
                  alt={listing.name}
                  loading="lazy"
                  className="img"
                />
              </Col>

              <Moment fromNow className="moment">
                {listing.timestamp.toDate().toString()}
              </Moment>
            </Link>
          </Row>

          <Row>
            <p
              style={{
                color: "#457b9d",
                fontWeight: "500",
                maxWidth: "fit-content",
                marginTop: "20px",
              }}
            >
              $
              {listing.offer
                ? listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : listing.price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              {listing.type === "rent" && " / Month"}
            </p>
          </Row>
        </div>
        <Row>
          <p className="card-title">
            {listing.brand} {listing.model}
          </p>
        </Row>
        <Row>
          <p
            style={{ marginRight: "15px", color: "#29526b", fontWeight: "500" }}
          >
                     {listing.year} / {listing.kilometer} km /  {listing.color}
          </p>
        </Row>
        <Col style={{ padding: "5px" }}>
          <div style={{ display: "flex" }}>
            
            <div className="container-icons">
              {onEdit && (
                <MdEdit
                  style={{
                    position: "absolute",
                    right: "50px",
                    marginRight: "5px",
                    cursor: "pointer",
                  }}
                  className="editIcon"
                  onClick={() => onEdit(listing.id)}
                />
              )}
              {onDelete && (
                <FaTrash
                  style={{
                    position: "absolute",
                    right: "10px",
                    marginRight: "5px",
                    color: "red",
                    cursor: "pointer",
                  }}
                  className="deleteIcon"
                  onClick={() => onDelete(listing.id)}
                />
              )}
            </div>
          </div>
        </Col>
      </Card>
    </li>
  );
}
