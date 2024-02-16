import { useState } from 'preact/hooks'

import Card, { CardProps } from './Card'

export type ColumnProps = {
  label: string
  id: string
}

type BoardProps = {
  columns: ColumnProps[]
  initialCards: CardProps[]
}

export default function Board({ columns, initialCards }: BoardProps) {
  const [cards, setCards] = useState<CardProps[]>(initialCards)

  const updateCard = (oldCard: CardProps, newCard: CardProps) => {
    const filteredCards = cards.filter((card) => card !== oldCard)
    filteredCards.push(newCard)
    setCards(filteredCards)
  }

  return (
    <div class="board">
      {columns.map((column) => (
        <div class="column">
          <h3 class="column-label">
            {column.label}
            <button>+</button>
          </h3>
          <div>
            {cards
              .filter((card) => card.column === column.id)
              .map((card) => (
                <Card updateCard={(newCard: CardProps) => updateCard(card, newCard)} {...card} columns={columns} />
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}
