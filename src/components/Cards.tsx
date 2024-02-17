import { useAutoAnimate } from '@formkit/auto-animate/preact'

import { ColumnProps } from './Board'
import Card, { CardProps } from './Card'

type CardsProps = {
  cards: CardProps[]
  updateCard: (oldCard: CardProps, newCard: CardProps | null) => void
  columns: ColumnProps[]
}

export default function Cards({ cards, updateCard, columns }: CardsProps) {
  const [animationParent] = useAutoAnimate()

  return (
    <div class="cards" ref={animationParent}>
      {cards.map((card) => (
        <Card key={card.label} updateCard={updateCard} {...card} columns={columns} />
      ))}
    </div>
  )
}
