import { faker } from '@faker-js/faker'

import Board from './components/Board'

const columns = [
  {
    label: 'Good 👍',
    id: 'good',
    color: 'green',
  },
  {
    label: 'Bad 👎',
    id: 'bad',
    color: 'red',
  },
  {
    label: 'Actions 📋',
    id: 'actions',
    color: 'blue',
  },
  {
    label: 'Ideas 💡',
    id: 'ideas',
    color: 'orange',
  },
]

const users = ['john', 'frank', 'amy', 'pieter']

const cards = [...Array(10)].map(() => ({
  label: faker.git.commitMessage(),
  column: faker.helpers.arrayElement(columns.map((column) => column.id)),
  votes: faker.helpers.arrayElements(users),
}))

export function App() {
  return (
    <>
      <Board columns={columns} initialCards={cards} />
    </>
  )
}
