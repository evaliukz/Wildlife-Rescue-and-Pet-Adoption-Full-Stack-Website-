import { Button, Collapse } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import EbayModal from "./EbayModal";
import "./EbayCard.css";

const Ebay = () => {
  const [petID, setpetID] = useState("");
  const [categoryID, setcategoryID] = useState("");
  const [itemInfo, setitemInfo] = useState([]);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [show, setShow] = useState(false);

  // useEffect(() => {
  //   // console.log(petID);
  // }, [petID]);
  // useEffect(() => {
  //   // console.log(categoryID);
  // }, [categoryID]);
  // useEffect(() => {
  //   console.log(itemInfo);
  // }, [itemInfo]);

  const ebayItems = (p_id, c_id) => {
    console.log(p_id);
    console.log(c_id);
    fetch(`/ebay/${p_id}/${c_id}`, {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setitemInfo(data);
      });
  };

  const catData = [
    { pic: "1.1.png", petID: 1, cID: 1, name: "Cat Food" },
    { pic: "1.2.png", petID: 1, cID: 2, name: "Cat Treats" },
    { pic: "1.3.png", petID: 1, cID: 3, name: "Cat Collars" },
    { pic: "1.4.png", petID: 1, cID: 4, name: "Cat Flea Remedies" },
    { pic: "1.5.png", petID: 1, cID: 5, name: "Cat Furniture" },
    { pic: "1.6.png", petID: 1, cID: 6, name: "Cat Healthcare" },
    { pic: "1.7.png", petID: 1, cID: 7, name: "Cat Litter" },
    { pic: "1.8.png", petID: 1, cID: 8, name: "Cat Litter Boxes" },
    { pic: "1.9.png", petID: 1, cID: 9, name: "Cat Toys" },
  ];
  const dogData = [
    { pic: "2.1.png", petID: 2, cID: 1, name: "Dog Food" },
    { pic: "2.2.png", petID: 2, cID: 2, name: "Dog Treats" },
    { pic: "2.3.png", petID: 2, cID: 3, name: "Dog Collars" },
    { pic: "2.4.png", petID: 2, cID: 4, name: "Dog Flea Remedies" },
    { pic: "2.5.png", petID: 2, cID: 5, name: "Dog Furniture" },
    { pic: "2.6.png", petID: 2, cID: 6, name: "Dog Healthcare" },
    { pic: "2.7.png", petID: 2, cID: 7, name: "Dog bags" },
    { pic: "2.8.png", petID: 2, cID: 8, name: "Dog Grooming" },
    { pic: "2.9.png", petID: 2, cID: 9, name: "Dog Toys" },
  ];
  const rabbitData = [
    { pic: "3.1.png", petID: 3, cID: 1, name: "Rabbit Food" },
    { pic: "3.2.png", petID: 3, cID: 2, name: "Rabbit Treats" },
    { pic: "3.3.png", petID: 3, cID: 3, name: "Rabbit Carriers" },
    { pic: "3.5.png", petID: 3, cID: 5, name: "Rabbit Furniture" },
    { pic: "3.6.png", petID: 3, cID: 6, name: "Rabbit Healthcare" },
  ];

  const handelClick = async (pID, cID) => {
    setpetID(pID); //useState 设置pet ID
    setcategoryID(cID); //useState 设置 category ID
    ebayItems(); //根据 petID 和 categ ID 去数据库拿数据
    // if (itemInfo) {
    //   setShow(true); // useState 设置 True， 显示返回的数据到  modal 里
    // }
  };

  return (
    <div>
      {/* <Button
        variant="primary"
        onClick={() => {
          setpetID(1);
          setcategoryID(1);
          ebayItems();
        }}
      >
        Submit
      </Button> */}

      <div className="ebayaAnimals">
        <Button variant="outline-light">
          <img
            src="cat.png"
            onClick={() => {
              setOpen(!open);
              setOpen2(false);
              setOpen3(false);
            }}
            aria-expanded={open}
          />
        </Button>
        <Button variant="outline-light">
          <img
            src="dog.png"
            onClick={() => {
              setOpen2(!open2);
              setOpen(false);
              setOpen3(false);
            }}
            aria-expanded={open2}
          />
        </Button>
        <Button variant="outline-light">
          <img
            src="rabbit.png"
            onClick={() => {
              setOpen3(!open3);
              setOpen2(false);
              setOpen(false);
            }}
            aria-expanded={open3}
          />
        </Button>
      </div>
      <Collapse in={open}>
        <div className="ebayCategory">
          {catData.map((item) => {
            return (
              <Button variant="outline-warning" className="categoryCard">
                <img
                  className="c_card"
                  src={item.pic}
                  onClick={async () => {
                    ebayItems(item.petID, item.cID);
                    setShow(true);
                  }}
                />
                <p>{item.name}</p>
              </Button>
            );
          })}
        </div>
      </Collapse>
      <Collapse in={open2}>
        <div className="ebayCategory">
          {dogData.map((item) => {
            return (
              <Button variant="outline-success" className="categoryCard">
                <img
                  className="c_card"
                  src={item.pic}
                  onClick={async () => {
                    ebayItems(item.petID, item.cID);
                    setShow(true);
                  }}
                />
                <p>{item.name}</p>
              </Button>
            );
          })}
        </div>
      </Collapse>
      <Collapse in={open3}>
        <div className="ebayCategory">
          {rabbitData.map((item) => {
            return (
              <Button variant="outline-info" className="categoryCard">
                <img
                  className="c_card"
                  src={item.pic}
                  onClick={async () => {
                    ebayItems(item.petID, item.cID);
                    setShow(true);
                  }}
                />
                <p>{item.name}</p>
              </Button>
            );
          })}
        </div>
      </Collapse>
      <EbayModal
        show={show}
        data={itemInfo}
        onHide={() => {
          setShow(false);
        }}
      />
    </div>
  );
};

export default Ebay;
