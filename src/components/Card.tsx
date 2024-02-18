import { useState } from 'preact/hooks'

import { currentUser, maxVotesPerCardPerPerson, maxVotesPerCategoryPerPerson } from '../app'
import { changeColumnIcon, deleteIcon, pencilIcon } from '../icons'
import { ColumnProps } from './Board'

export type CardProps = {
  label: string
  column: string
  votes: string[]
  id: string
  categoryVotes?: number
}

export default function Card(
  props: CardProps & { columns: ColumnProps[]; updateCard: (oldCard: CardProps, newCard: CardProps | null) => void }
) {
  const { label, columns, column, votes, categoryVotes, updateCard } = props
  const [showColumnDropdown, setShowColumnDropdown] = useState(false)
  const [deletionCandidate, setDeletionCandidate] = useState(false)
  const [editMode, setEditMode] = useState(label === '')

  const highlight = editMode || showColumnDropdown || deletionCandidate

  const ownVotes = votes.filter((voter) => voter === currentUser).length

  return (
    <div
      onClick={(event) => {
        const isButton =
          (event.target as HTMLElement).nodeName === 'BUTTON' || (event.target as HTMLElement).closest('.button')
        if (isButton) return

        const newVotes =
          ownVotes === maxVotesPerCardPerPerson || categoryVotes === maxVotesPerCategoryPerPerson
            ? votes.filter((voter) => voter !== currentUser)
            : [...votes, currentUser]

        updateCard(props, {
          ...props,
          votes: newVotes,
        })
      }}
      class={`card ${highlight ? 'highlight' : ''} ${editMode ? 'edit-mode' : ''}`}
    >
      <header class="card-header">
        <input
          class="card-label-input"
          value={label}
          ref={(input) => input && input.focus()}
          onChange={(event) => {
            updateCard(props, {
              ...props,
              label: (event.target as HTMLInputElement).value,
            })
          }}
          onBlur={() => setEditMode(false)}
        />

        {editMode ? null : <h4 class="card-label">{label}</h4>}

        <button
          class="button"
          aria-label={`Edit card with the label: "${label}"`}
          onClick={() => {
            setEditMode(!editMode)
          }}
        >
          {pencilIcon}
        </button>
        <button
          class="button"
          aria-label={`Change column of card with the label: "${label}"`}
          onClick={() => {
            setShowColumnDropdown(!showColumnDropdown)
          }}
        >
          {changeColumnIcon}
        </button>
        {showColumnDropdown ? (
          <div class="card-column-dropdown">
            {columns.map(({ id, label }) => (
              <button
                class={`button block ${id === column ? 'active' : ''}`}
                onClick={() => {
                  updateCard(props, {
                    ...props,
                    column: id,
                  })
                  setShowColumnDropdown(false)
                }}
              >
                {label}
              </button>
            ))}
          </div>
        ) : null}
        <button
          class="button"
          aria-label={`Delete card with the label: "${label}"`}
          onClick={() => {
            setDeletionCandidate(true)

            setTimeout(() => {
              // TODO replace with a nice looking dialog
              const confirmed = confirm(`Are you sure you want to delete "${label}"?`)
              if (confirmed) updateCard(props, null)
              setDeletionCandidate(false)
            })
          }}
        >
          {deleteIcon}
        </button>
      </header>
      <div class="card-votes">
        {votes.map((voter) => (
          <div class={`card-vote ${voter === currentUser ? 'own-vote' : ''}`}>
            <span class="card-vote-voter">{voter}</span>
          </div>
        ))}
        {ownVotes === maxVotesPerCardPerPerson || categoryVotes === maxVotesPerCategoryPerPerson ? (
          <em class="vote-text">- Remove your votes</em>
        ) : (
          <em class="vote-text">+ Add a vote (max {maxVotesPerCardPerPerson})</em>
        )}
      </div>
    </div>
  )
}
