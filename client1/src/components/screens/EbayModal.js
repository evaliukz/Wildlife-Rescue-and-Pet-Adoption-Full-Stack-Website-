import React from "react";
import { Button, Modal, Card, CardGroup } from "react-bootstrap";
import "./EbayCard.css";
const EbayModal = ({ show, data, onHide }) => {
  return (
    <div>
      <Modal
        show={show}
        onHide={onHide}
        animation="true"
        dialogClassName="modal-80w"
      >
        <Modal.Header closeButton>
          <Modal.Title>Choose Your Product!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CardGroup>
            {data.map((item) => {
              return (
                <Card style={{ width: "50rem" }} className="ebayCard">
                  <Card.Img
                    variant="top"
                    src={item.img_url}
                    rounded="true"
                    style={{
                      height: "290px",
                      width: "90%",
                      bordeRadius: "10px",
                      marginLeft: "auto",
                      marginRight: "auto",
                      boxShadow:
                        "0 4px 4px 0 rgba(0, 0, 0, 0.6), 0 6px 6px 5px rgba(0, 0, 0, 0.5)",
                    }}
                  />
                  <Card.Body>
                    <Card.Title>
                      {item.category_name}
                      <br />
                      {item.item_name.substring(0, 50) + "..."}
                    </Card.Title>
                    <Card.Text>{"$" + item.pricing}</Card.Text>
                    <a
                      style={{ display: "table-cell" }}
                      href={item.buy_url}
                      target="_blank"
                    >
                      Buy!
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
