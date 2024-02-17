import { useState } from 'preact/hooks'

import { sortCards } from '../helpers/sortCards'
import { CardProps } from './Card'
import Cards from './Cards'

export type ColumnProps = {
  label: string
  id: string
  color: string
}

type BoardProps = {
  columns: ColumnProps[]
  initialCards: CardProps[]
}

export default function Board({ columns, initialCards }: BoardProps) {
  const [cards, setCards] = useState<CardProps[]>(initialCards.sort(sortCards))

  const updateCard = (oldCard: CardProps, newCard: CardProps | null) => {
    setCards((cards) => {
      const filteredCards = cards.filter((card) => card.id !== oldCard.id)
      if (newCard) filteredCards.push(newCard)
      return filteredCards
    })
  }

  return (
    <div class="board">
      {columns.map((column) => (
        <div class="column" style={`--color: ${column.color};`}>
          <h3 class="column-label">
            {column.label}
            <button
              class="button light"
              onClick={() => {
                setCards([
                  {
                    label: '',
                    id: self.crypto.randomUUID(),
                    column: column.id,
                    votes: [],
                  },
                  ...cards,
                ])
              }}
              aria-label={`Add card to column ${column.label}`}
            >
              +
            </button>
          </h3>
          <Cards
            key={column.id}
            cards={cards.filter((card) => card.column === column.id).sort(sortCards)}
            updateCard={updateCard}
            columns={columns}
          />
        </div>
      ))}
    </div>
  )
}
