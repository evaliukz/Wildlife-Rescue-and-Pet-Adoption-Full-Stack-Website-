import { React, useState } from "react";
import { Button } from "react-bootstrap";
import TinderCard from "react-tinder-card";
import PetDetail from "./PetDetail";

import "./FindPets.css";
import "./PetDetail.css";
import 'bootstrap/dist/css/bootstrap.css';

var saved = [];
const FindPets = () => {
  const [animalInfo, setanimalInfo] = useState([]);
  const [zipCode, setZipCode] = useState("");
  const [type, setType] = useState("");
  const [show, setShow] = useState(false);


  const getAnimalInfo = () => {
    fetch("/findpets", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        zipCode, type,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setanimalInfo(data);
      });
  };
  const swiped = (direction, pet) => {
    if (direction == "right") {
      saved.push(pet);
      console.log("saved: ", saved);
    }
    else {

    }


  };
  
const onSwipe = (direction) => {
  console.log('You swiped: ' + direction)
}

const onCardLeftScreen = (myIdentifier) => {
  console.log(myIdentifier + ' left the screen')
}

const outOfFrame = (name) => {
  console.log(name + "left the screen!");
};

const showSaved = () => {
  console.log("triggered");
  setShow(true);
}

  return (
    <div>
      <div>
        <div>
        <input
          id="zipInput"
          type="text"
          placeholder="zipCode"
          onChange={(e) => setZipCode(e.target.value)}
          value={zipCode}
        />
         <select id="Type" value={type}  onChange={(e) => setType(e.target.value)}>
          <option value="cat">Pet type</option>
          <option value="cat">Cat</option>
          <option value="dog">Dog</option>
          <option value="rabbit">Rabbit</option>
        </select>
        <Button id="petSelect" variant="primary" type="submit" onClick={() => getAnimalInfo()}>
          Try my luck
        </Button>
        <Button id="showSaved" variant="primary" type="submit" onClick={() => showSaved()}>
          My saved
        </Button>
        </div>
        <div id="movingImages">
          <img id="cat1" src="/cat1.png"/>
          <img id="cat2" src="/cat2.png"/>
          <img id="cat3" src="/cat3.png"/>
          <img id="dog1" src="/dog1.png"/>
          <img id="dog2" src="/dog2.png"/>
          <img id="dog3" src="/dog3.png"/>
        </div>
        <div className="tinderCards">
          <div className="tinderCards_cardContainer">
            {animalInfo.map((pet) => (

              <TinderCard
                className="swipe"
                key={pet.pet_id}
                preventSwipe={["up", "down"]}
                onSwipe={(dir) => swiped(dir, pet)}
                onCardLeftScreen={() => outOfFrame(pet.petname)}
              >
                <div
                  style={{ backgroundImage: `url(${pet.photos.split(", {")[0].substring(211, 297)})` }}
                  className="card">
                  <h3>Name: {pet.petname} Gender: {pet.gender}</h3>
                </div>
              </TinderCard>
            ))}
          </div>
        </div>
      </div>

      {saved ? (
            <PetDetail id="selectedPetsList"
              show={show}
              data={saved}
              onHide={() => setShow(false)}
            />
     ) : null} 


    </div>
  );
};

export default FindPets;