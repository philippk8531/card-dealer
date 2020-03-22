import React, { Component } from 'react';
import Axios from 'axios';
import { v4 as uuid } from 'uuid';
import Card from './Card';
import './Deck.css';

const API_BASE_URL = 'https://deckofcardsapi.com/api/deck';

class Deck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deckID: '',
            deck: []
        };
        this.drawCard = this.drawCard.bind(this);
    }

    async componentDidMount() {
        const url = `${API_BASE_URL}/new/shuffle`;
        const { data } = await Axios.get(url);
        this.setState({ deckID: data.deck_id });
    }

    async drawCard() {
        const url = `${API_BASE_URL}/${this.state.deckID}/draw/`;
        try {
            const { data } = await Axios.get(url);
            if (!data.success) {
                throw new Error('no new cards');
            }
            const newCard = {
                img: data.cards[0].images.png,
                id: uuid()
            };
            this.setState(curState => ({
                deck: [ ...curState.deck, newCard ]
            }));
        } catch (err) {
            alert(err);
        }
    }

    render() {
        return (
            <div className="Deck">
                <h1 className="Deck-title">⯁ Card Dealer ⯁</h1>
                <h2 className="Deck-title subtitle">
                    ⯁ A little demo with react ⯁
                </h2>
                {this.state.deckID !== '' ? (
                    <button
                        className="Deck-btn"
                        onClick={this.drawCard}
                    >
                        Gimme a Card
                    </button>
                ) : (
                    'LOADING'
                )}
                <div className="Deck-cards">
                    {this.state.deck.map(card => (
                        <Card img={card.img} key={card.id} />
                    ))}
                </div>
            </div>
        );
    }
}

export default Deck;
