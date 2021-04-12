import { Button } from "react-bootstrap";
import React, { useState } from "react";

const Ebay = () => {
  const [petID, setpetID] = useState("");
  const [categoryID, setcategoryID] = useState("");
  const [itemInfo, setitemInfo] = useState([]);
  const ebayItems = () => {
    console.log(petID);
    console.log(categoryID);
    fetch("/ebay", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        petID,
        categoryID,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setitemInfo(data);
      });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="pet ID"
        onChange={(e) => setpetID(e.target.value)}
        value={petID}
      />
      <input
        type="text"
        placeholder="category ID"
        onChange={(e) => setcategoryID(e.target.value)}
        value={categoryID}
      />

      <Button variant="primary" type="submit" onClick={() => ebayItems()}>
        Submit
      </Button>

      <div>
        {itemInfo.map((item) => {
          return (
            <div>
              <div>
                <img src={item.img_url} />
              </div>
              <div>
                {item.item_name} {item.pricing}
              </div>
              <div>
                <a
                  style={{ display: "table-cell" }}
                  href={item.buy_url}
                  target="_blank"
                >
                  Buy
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Ebay;
