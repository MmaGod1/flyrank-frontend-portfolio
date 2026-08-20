import { useEffect, useRef, useState } from 'react'

export function Modal() {
  const [open, setOpen] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return

    const dialog = dialogRef.current
    if (!dialog) return

    const focusableElements = dialog.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )

    const firstFocusable = focusableElements[0]
    const lastFocusable = focusableElements[focusableElements.length - 1]

    firstFocusable?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        close()
        return
      }

      if (event.key !== 'Tab') return

      if (focusableElements.length === 0) {
        event.preventDefault()
        return
      }

      if (event.shiftKey && document.activeElement === firstFocusable) {
        event.preventDefault()
        lastFocusable?.focus()
      } else if (
        !event.shiftKey &&
        document.activeElement === lastFocusable
      ) {
        event.preventDefault()
        firstFocusable?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  function close() {
    setOpen(false)

    requestAnimationFrame(() => {
      triggerRef.current?.focus()
    })
  }

  return (
    <>
      <button ref={triggerRef} onClick={() => setOpen(true)}>
        Open modal
      </button>

      {open && (
        <>
          <div
            aria-hidden="true"
            onClick={close}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.4)',
            }}
          />

          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            style={{
              position: 'fixed',
              top: '20%',
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#fff',
              border: '1px solid #333',
              padding: '1rem',
              maxWidth: 320,
            }}
          >
            <h2 id="modal-title">Modal title</h2>

            <p>Modal content goes here.</p>

            <button onClick={close}>Close</button>
          </div>
        </>
      )}
    </>
  )
}