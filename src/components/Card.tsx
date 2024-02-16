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

  const highlight = editMode || showColumnDropdown

  return (
    <div class={`card ${highlight ? 'highlight' : ''} ${editMode ? 'edit-mode' : ''}`}>
      <header class="card-header">
        <input
          class="card-label-input"
          value={label}
          ref={(input) => input && input.focus()}
          onChange={(event) => {
            updateCard({
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
                class="button block"
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
          class="button"
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
