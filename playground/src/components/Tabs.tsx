import { useState, useRef } from 'react'

const TAB_ITEMS = [
  { id: 'one', label: 'One', content: 'Content for tab one.' },
  { id: 'two', label: 'Two', content: 'Content for tab two.' },
  { id: 'three', label: 'Three', content: 'Content for tab three.' },
]

export function Tabs() {
  const [activeId, setActiveId] = useState(TAB_ITEMS[0].id)
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  function selectTab(id: string) {
    setActiveId(id)
    tabRefs.current[id]?.focus()
  }

  function handleKeyDown(e: React.KeyboardEvent, index: number) {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      selectTab(TAB_ITEMS[(index + 1) % TAB_ITEMS.length].id)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      selectTab(TAB_ITEMS[(index - 1 + TAB_ITEMS.length) % TAB_ITEMS.length].id)
    } else if (e.key === 'Home') {
      e.preventDefault()
      selectTab(TAB_ITEMS[0].id)
    } else if (e.key === 'End') {
      e.preventDefault()
      selectTab(TAB_ITEMS[TAB_ITEMS.length - 1].id)
    }
  }

  return (
    <div>
      <div role="tablist" aria-label="Example tabs">
        <h1 className="text-4xl font-bold text-blue-600">
  Tailwind is working!
</h1>
        {TAB_ITEMS.map((tab, index) => (
          <button
            key={tab.id}
            ref={(el) => { tabRefs.current[tab.id] = el }}
            id={`tab-${tab.id}`}
            role="tab"
            aria-selected={activeId === tab.id}
            aria-controls={`panel-${tab.id}`}
            tabIndex={activeId === tab.id ? 0 : -1}
            onClick={() => selectTab(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            style={{ marginRight: '0.5rem' }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {TAB_ITEMS.map((tab) =>
        activeId === tab.id ? (
          <div
            key={tab.id}
            id={`panel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab.id}`}
            tabIndex={0}
            style={{ marginTop: '1rem' }}
          >
            {tab.content}
          </div>
        ) : null,
      )}
    </div>
  )
}