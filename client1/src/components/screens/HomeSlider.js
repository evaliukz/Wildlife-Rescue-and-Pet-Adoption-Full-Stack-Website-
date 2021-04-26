import React, { Component } from "react";
import data from "./HomeSlidersData";
import Card from "./HomeSliderCard";
import "../../App.css";

class HomeSlider extends Component {
  //constructor
  constructor(props) {
    super(props);
    this.state = {
      properties: data.properties,
      property: data.properties[0],
    };
  }
  //methods for the buttons
  nextProperty = () => {
    const newIndex = this.state.property.index + 1;
    this.setState({ property: data.properties[newIndex] });
  };

  prevProperty = () => {
    const newIndex = this.state.property.index - 1;
    this.setState({ property: data.properties[newIndex] });
  };

  //render
  render() {
    const { properties, property } = this.state;
    return (
      <div className='App'>
        <button
          onClick={() => this.prevProperty()}
          disabled={property.index === 0}
        >
          {" "}
          Prev{" "}
        </button>
        <button
          onClick={() => this.nextProperty()}
          disabled={property.index === data.properties.length - 1}
        >
          {" "}
          Next{" "}
        </button>

        <div className='page'>
          <section>
            <h1> “The Earth is a fine place and worth fighting for.” </h1>
            <h1>—Ernest Hemingway</h1>
          </section>

          <div className={`cards-slider active-slide-${property.index}`}>
            <div
              className='cards-slider-wrapper'
              style={{
                transform: `translateX(-${
                  property.index * (100 / properties.length)
                }%)`,
              }}
            >
              {properties.map((property) => (
                <Card key={property._id} property={property} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default HomeSlider;
