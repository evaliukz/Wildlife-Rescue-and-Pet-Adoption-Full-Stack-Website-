import { React, useState } from "react";
import { Button } from "react-bootstrap";
import TinderCard from "react-tinder-card";
import "./FindPets.css";
const FindPets = () => {
  const [animalInfo, setanimalInfo] = useState([]);
  const [zipCode, setZipCode] = useState("");
  const getAnimalInfo = () => {
    console.log("send zipcode");
    fetch("/findpets", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        zipCode,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setanimalInfo(data);
      });
  };
  const swiped = (direction, nameToDelete) => {
    console.log("removing:" + nameToDelete);
  };

  const outOfFrame = (name) => {
    console.log(name + "left the screen!");
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="zipCode"
          onChange={(e) => setZipCode(e.target.value)}
          value={zipCode}
        />
        <Button variant="primary" type="submit" onClick={() => getAnimalInfo()}>
          Submit
        </Button>
        <div className="tinderCards">
          <div className="tinderCards_cardContainer">
            {animalInfo.map((pet) => (
              <TinderCard
                className="swipe"
                key={pet.pet_id}
                preventSwipe={["up", "down"]}
                onSwipe={(dir) => swiped(dir, pet.petname)}
                onCardLeftScreen={() => outOfFrame(pet.petname)}
              >
                {console.log(pet.photos)}
                <div
                  style={{ backgroundImage: `url(${pet.photos[0].small})` }}
                  className="card"
                >
                  <h3>{pet.petname}</h3>
                </div>
              </TinderCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindPets;
