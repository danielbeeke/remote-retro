import { useState } from 'preact/hooks'

import { changeColumnIcon, deleteIcon, pencilIcon } from '../icons'
import { ColumnProps } from './Board'

export type CardProps = {
  label: string
  column: string
}

export default function Card(
  props: CardProps & { columns: ColumnProps[]; updateCard: (newCard: CardProps | null) => void }
) {
  const { label, column, columns, updateCard } = props
  const [showColumnDropdown, setShowColumnDropdown] = useState(false)
  const [editMode, setEditMode] = useState(label === '')

  return (
    <div class="card">
      <header class="card-header">
        <h4 class="card-label">
          {editMode ? (
            <input
              value={label}
              onChange={(event) => {
                updateCard({
                  ...props,
                  label: (event.target as HTMLInputElement).value,
                })
              }}
              onBlur={() => setEditMode(false)}
            />
          ) : (
            label
          )}
        </h4>
        <button
          class="card-button"
          aria-label={`Edit card with the label: "${label}"`}
          onClick={() => setEditMode(!editMode)}
        >
          {pencilIcon}
        </button>
        <button
          class="card-button"
          aria-label={`Change column of card with the label: "${label}"`}
          onClick={() => {
            setShowColumnDropdown(!showColumnDropdown)
          }}
        >
          {changeColumnIcon}
        </button>
        {showColumnDropdown ? (
          <div>
            {columns.map(({ id, label }) => (
              <button
                onClick={() => {
                  updateCard({
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
          class="card-button"
          aria-label={`Delete card with the label: "${label}"`}
          onClick={() => {
            const confirmed = confirm(`Are you sure you want to delete "${label}"?`)
            if (confirmed) updateCard(null)
          }}
        >
          {deleteIcon}
        </button>
      </header>
    </div>
  )
}
