import { faker } from '@faker-js/faker'

import Board from './components/Board'

const columns = [
  {
    label: 'Good 👍',
    id: 'good',
  },
  {
    label: 'Bad 👎',
    id: 'bad',
  },
  {
    label: 'Actions 📋',
    id: 'actions',
  },
  {
    label: 'Ideas 💡',
    id: 'ideas',
  },
]

const cards = [...Array(10)].map(() => ({
  label: faker.git.commitMessage(),
  column: faker.helpers.arrayElement(columns.map((column) => column.id)),
}))

export function App() {
  return (
    <>
      <Board columns={columns} initialCards={cards} />
    </>
  )
}
