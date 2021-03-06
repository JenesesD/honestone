import React, { useContext } from "react";
import { DeckContext } from "../../DataStore/DeckContext";
import Card from "../LeftPane/Card";

export default function MyDecks(props) {
  const [cardsInDeck] = useContext(DeckContext);
  return (
    <React.Fragment>
      {cardsInDeck.map(card => (
        <Card key={card.id} card={card} />
      ))}
    </React.Fragment>
  );
}
