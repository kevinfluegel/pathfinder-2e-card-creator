import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import { Card, CardProps } from "./Card";
import CardCreationForm from "./CardCreationForm";
import {
  DocumentDuplicateIcon,
  PencilIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { v4 } from "uuid";
import { Button } from "./Button";
import { TextInput } from "./TextInput";

function Creation() {
  const [cards, setCards] = useState<CardProps[] | undefined>(undefined);

  const [editableCard, setEditableCard] = useState<CardProps | null>(null);
  const [isCopy, setIsCopy] = useState<boolean>(false);

  useEffect(() => {
    if (cards) return;
    const jsonCards = localStorage.getItem("cards");
    if (!jsonCards) {
      setCards([]);
      return;
    }
    setCards(JSON.parse(jsonCards));
  }, [cards]);

  useEffect(() => {
    if (!cards) return;
    localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);

  const reversedCards = useMemo(() => {
    return cards ? [...cards].reverse() : [];
  }, [cards]);

  const deleteCard = useCallback(
    (idx: number) => () => {
      setCards(
        reversedCards
          .filter((_, i) => {
            return i !== idx;
          })
          .reverse()
      );
    },
    [reversedCards]
  );

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(
      localStorage.getItem("cards") ||
        "Du scheinst keine Karten erstellt zu haben"
    );
  }, []);

  const editCard = useCallback(
    (idx: number) => () => {
      if (cards) setEditableCard(reversedCards[idx]);
    },
    [cards, reversedCards]
  );

  const copyCard = useCallback(
    (idx: number) => () => {
      if (cards) setEditableCard({ ...reversedCards[idx], id: v4() });
      setIsCopy(true);
    },
    [cards, reversedCards]
  );

  const handleSubmit = useCallback(
    (card) => {
      const currentCards = cards ? [...cards] : [];
      if (editableCard) {
        if (!isCopy) {
          const editedCardIndex = currentCards.findIndex(
            ({ id }) => id === card.id
          );

          currentCards[editedCardIndex] = { ...card };
          setCards(currentCards);
        }
        setEditableCard(null);
      } else {
        card.id = v4();
        setCards([...currentCards, card]);
      }
    },
    [cards, editableCard, isCopy]
  );

  const reverse = useCallback(() => {
    if (cards) setCards([...cards].reverse());
  }, [cards]);

  return (
    <>
      <div className="print:hidden text-2xl ">
        <div className="flex flex-row gap-2 ml-3 m-4">
          <Button onClick={reverse}>Reverse</Button>
          <Button onClick={copyToClipboard}>{`Copy Cards to Clipboard`}</Button>
        </div>
        <CardCreationForm
          onSubmit={handleSubmit}
          overwriteState={editableCard}
          isEditing={!isCopy}
        />
      </div>
      <div className="flex flex-row flex-wrap gap-4">
        {reversedCards.map((card, index) => (
          <div className="flex flex-row" key={card.id}>
            <Card {...card} />
            <div className="flex flex-col bg-gray-600 p-2 rounded-br-md rounded-tr-md h-max text-white print:hidden">
              <button className="h-8 w-8" onClick={deleteCard(index)}>
                <XCircleIcon />
              </button>
              <button className="h-8 w-8" onClick={editCard(index)}>
                <PencilIcon />
              </button>
              <button className="h-8 w-8" onClick={copyCard(index)}>
                <DocumentDuplicateIcon />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Creation;
