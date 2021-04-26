import React from "react";
import { Button, Modal, Card, CardGroup } from "react-bootstrap";

const EbayModal = ({ show, data, onHide }) => {
  return (
    <div>
      <Modal
        show={show}
        onHide={onHide}
        animation="true"
        dialogClassName="modal-90w"
      >
        <Modal.Header closeButton>
          <Modal.Title>Choose Your Pet!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CardGroup>
            {data.map((item) => {
              return (
                <Card style={{ width: "50rem" }}>
                  <Card.Img
                    variant="top"
                    src={item.img_url}
                    rounded
                    style={{
                      height: "290px",
                      width: "90%",
                      "border-radius": "8px",
                      marginLeft: "auto",
                      marginRight: "auto",
                      boxShadow:
                        "0 4px 4px 0 rgba(0, 0, 0, 0.6), 0 6px 6px 5px rgba(0, 0, 0, 0.5)",
                    }}
                  />
                  <Card.Body>
                    <Card.Title>{item.item_name}</Card.Title>
                    <Card.Text>{item.pricing}</Card.Text>
                    <a
                      style={{ display: "table-cell" }}
                      href={item.buy_url}
                      target="_blank"
                    >
                      More...
                    </a>
                  </Card.Body>
                </Card>
              );
            })}
          </CardGroup>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EbayModal;
