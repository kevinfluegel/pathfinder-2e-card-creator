import React, { useEffect, useState } from "react";
import "./App.css";
import { Card, CardProps } from "./Card";

function Print() {
  const [cards, setCards] = useState<CardProps[] | undefined>(undefined);

  useEffect(() => {
    if (cards) return;
    const jsonCards = localStorage.getItem("cards");
    if (!jsonCards) {
      setCards([]);
      return;
    }
    setCards(JSON.parse(jsonCards));
  }, [cards]);

  return (
    <table className="gap-4">
      <tbody>
        <tr>
          {cards?.map((card) => (
            <td className="inline-block" key={card.id}>
              <Card {...card} />
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}

export default Print;
