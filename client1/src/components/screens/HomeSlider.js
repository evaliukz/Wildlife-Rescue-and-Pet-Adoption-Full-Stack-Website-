import React, { Component } from "react";
import data from "./HomeSlidersData";
import Card from "./HomeSliderCard";
import "../../css/templatemo_style.css";

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
      <div className='body'>
        <div className='body'>
          <section>
            <h1>
              {" "}
              “The Earth is a fine place and worth fighting for.” —Ernest
              Hemingway{" "}
            </h1>
          </section>
          <section>
            <button
              className='button1'
              onClick={() => this.prevProperty()}
              disabled={property.index === 0}
            />

            <button
              className='button2'
              onClick={() => this.nextProperty()}
              disabled={property.index === data.properties.length - 1}
            />
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
