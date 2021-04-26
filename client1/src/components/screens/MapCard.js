import React from "react";
import { Card, Button } from "react-bootstrap";
const MapCard = ({ pic, name, url }) => {
  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={pic} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <a style={{ display: "table-cell" }} href={url} target="_blank">
            More information
          </a>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MapCard;
