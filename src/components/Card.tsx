import { useState } from 'preact/hooks'

import { ColumnProps } from './Board'

export type CardProps = {
  label: string
  column: string
}

const changeColumnIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M21.92 11.62a1 1 0 0 0-.21-.33l-4-4a1 1 0 1 0-1.42 1.42l2.3 2.29H5.41l2.3-2.29a1 1 0 1 0-1.42-1.42l-4 4a1 1 0 0 0-.21.33a1 1 0 0 0 0 .76a1 1 0 0 0 .21.33l4 4a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42L5.41 13h13.18l-2.3 2.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l4-4a1 1 0 0 0 .21-.33a1 1 0 0 0 0-.76"
    ></path>
  </svg>
)

const pencilIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="1.13em" height="1em" viewBox="0 0 576 512">
    <path
      fill="currentColor"
      d="m402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0m162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2M384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5"
    ></path>
  </svg>
)

export default function Card(props: CardProps & { columns: ColumnProps[]; updateCard: (newCard: CardProps) => void }) {
  const { label, column, columns, updateCard } = props
  const [showColumnDropdown, setShowColumnDropdown] = useState(false)
  const [editMode, setEditMode] = useState(false)

  return (
    <div class="card">
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
          />
        ) : (
          label
        )}
        <button onClick={() => setEditMode(!editMode)}>{pencilIcon}</button>
      </h4>
      <button
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
    </div>
  )
}
