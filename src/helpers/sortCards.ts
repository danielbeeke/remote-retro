import { CardProps } from '../components/Card'

export const sortCards = (a: CardProps, b: CardProps) => {
  if (a.votes.length !== b.votes.length) {
    return b.votes.length - a.votes.length
  }
  if (a.label === '') return -1000
  if (b.label === '') return 1000
  return a.label.localeCompare(b.label)
}
