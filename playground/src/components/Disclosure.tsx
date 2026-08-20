import { useState } from 'react'

export function Disclosure() {
  const [expanded, setExpanded] = useState(false)

  return (
    <div>
      <button
        aria-expanded={expanded}
        aria-controls="disclosure-content"
        onClick={() => setExpanded((e) => !e)}
      >
        {expanded ? 'Hide' : 'Show'} details
      </button>

      <div id="disclosure-content" hidden={!expanded} style={{ marginTop: '0.5rem' }}>
        Disclosure content goes here.
      </div>
    </div>
  )
}