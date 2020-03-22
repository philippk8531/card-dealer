import React, { Component } from 'react';
import './Card.css';

class Card extends Component {
    constructor(props) {
        super(props);
        let angle = Math.random() * 90 - 45;
        let xPos = Math.random() * 40 - 20;
        let yPos = Math.random() * 40 - 20;
        //transform: translate(10px, 20px) rotate(20deg);
        this._transform = `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`;
    }

    render() {
        return (
            <img
                className="Card"
                src={this.props.img}
                alt={this.props.img}
                width="200px"
                style={{ transform: this._transform }}
            />
        );
    }
}

export default Card;
