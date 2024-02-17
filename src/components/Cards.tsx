import { useAutoAnimate } from '@formkit/auto-animate/preact'
import { StateUpdater } from 'preact/hooks'

import { sortCards } from '../helpers/sortCards'
import { ColumnProps } from './Board'
import Card, { CardProps } from './Card'

type CardsProps = {
  cards: CardProps[]
  setCards: StateUpdater<CardProps[]>
  columnId: string
  columns: ColumnProps[]
}

export default function Cards({ cards, setCards, columnId, columns }: CardsProps) {
  const [animationParent] = useAutoAnimate()

  const updateCard = (oldCard: CardProps, newCard: CardProps | null) => {
    const filteredCards = cards.filter((card) => card !== oldCard)
    if (newCard) filteredCards.push(newCard)
    filteredCards.sort(sortCards)
    setCards(filteredCards)
  }

  return (
    <div class="cards" ref={animationParent}>
      {cards
        .filter((card) => card.column === columnId)
        .map((card) => (
          <Card
            key={card.label}
            updateCard={(newCard: CardProps | null) => updateCard(card, newCard)}
            {...card}
            columns={columns}
          />
        ))}
    </div>
  )
}
