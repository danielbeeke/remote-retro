import { useState } from 'preact/hooks'

import { currentUser, maxVotesPerCategoryPerPerson } from '../app'
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
      {columns.map((column) => {
        const categoryCards = cards.filter((card) => card.column === column.id).sort(sortCards)

        const categoryVotes = categoryCards.flatMap((card) => card.votes.filter((user) => user === currentUser)).length

        return (
          <div class="column" style={`--color: ${column.color};`}>
            <h3 class="column-label">
              {column.label} <em class="max-votes">(max {maxVotesPerCategoryPerPerson} votes)</em>
              <button
                class="button light"
                onClick={() => {
                  setCards([
                    {
                      categoryVotes,
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
              cards={categoryCards}
              updateCard={updateCard}
              columns={columns}
              categoryVotes={categoryVotes}
            />
          </div>
        )
      })}
    </div>
  )
}
