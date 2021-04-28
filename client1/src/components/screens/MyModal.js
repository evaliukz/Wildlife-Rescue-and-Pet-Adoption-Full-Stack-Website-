import React from "react";
import { Button, Modal, Card, CardGroup } from "react-bootstrap";

const MyModal = ({ show, data, onHide }) => {
  const getPicURL = (txt) => {
    if (txt === null) {
      return "noPic.png";
    }
    var t = txt.split(", {")[0].substring(112, 198);
    // var obj = JSON.parse(t);
    // console.log(t);
    return t;
  };
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
              var photo = getPicURL(item.photos);
              return (
                <Card style={{ width: "50rem" }}>
                  <Card.Img
                    variant="top"
                    src={photo}
                    rounded
                    style={{
                      height: "290px",
                      width: "90%",
                      borderRadius: "8px",
                      marginLeft: "auto",
                      marginRight: "auto",
                      boxShadow:
                        "0 4px 4px 0 rgba(0, 0, 0, 0.6), 0 6px 6px 5px rgba(0, 0, 0, 0.5)",
                    }}
                  />
                  <Card.Body>
                    <Card.Title>{item.petname}</Card.Title>
                    <Card.Text>
                      {item.description.substring(0, 60) + "..."}
                    </Card.Text>
                    <a
                      style={{ display: "table-cell" }}
                      href={item.url}
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

export default MyModal;
