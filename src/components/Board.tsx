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

const sortCards = (a: CardProps, b: CardProps) => {
  if (a.label === '') return -1000
  if (b.label === '') return 1000
  return a.label.localeCompare(b.label)
}

export default function Board({ columns, initialCards }: BoardProps) {
  const [cards, setCards] = useState<CardProps[]>(initialCards.sort(sortCards))

  const updateCard = (oldCard: CardProps, newCard: CardProps | null) => {
    const filteredCards = cards.filter((card) => card !== oldCard)
    if (newCard) filteredCards.push(newCard)
    filteredCards.sort(sortCards)
    setCards(filteredCards)
  }

  return (
    <div class="board">
      {columns.map((column) => (
        <div class="column">
          <h3 class="column-label">
            {column.label}
            <button
              onClick={() => {
                setCards([
                  ...cards,
                  {
                    label: '',
                    column: column.id,
                  },
                ])
              }}
              aria-label={`Add card to column ${column.label}`}
            >
              +
            </button>
          </h3>
          <div>
            {cards
              .filter((card) => card.column === column.id)
              .map((card) => (
                <Card
                  updateCard={(newCard: CardProps | null) => updateCard(card, newCard)}
                  {...card}
                  columns={columns}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}
