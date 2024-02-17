import { useState } from 'preact/hooks'

import { sortCards } from '../helpers/sortCards'
import { CardProps } from './Card'
import Cards from './Cards'

export type ColumnProps = {
  label: string
  id: string
}

type BoardProps = {
  columns: ColumnProps[]
  initialCards: CardProps[]
}

export default function Board({ columns, initialCards }: BoardProps) {
  const [cards, setCards] = useState<CardProps[]>(initialCards.sort(sortCards))

  return (
    <div class="board">
      {columns.map((column) => (
        <div class="column">
          <h3 class="column-label">
            {column.label}
            <button
              class="button light"
              onClick={() => {
                setCards([
                  ...cards,
                  {
                    label: '',
                    column: column.id,
                    votes: [],
                  },
                ])
              }}
              aria-label={`Add card to column ${column.label}`}
            >
              +
            </button>
          </h3>
          <Cards cards={cards} setCards={setCards} columnId={column.id} columns={columns} />
        </div>
      ))}
    </div>
  )
}
