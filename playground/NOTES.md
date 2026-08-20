# FE-05 Accessibility Notes

## Components Built

I built three interactive components from scratch using React and TypeScript:

* Modal dialog
* Tabs
* Disclosure

I did not use a component library for these implementations. I followed the WAI-ARIA Authoring Practices patterns and tested the components using the keyboard.

## Comparison with shadcn/ui

After installing shadcn/ui and inspecting its generated Dialog and Tabs components, I found several differences between my implementation and the shadcn version.

### 1. Focus and keyboard management

My Modal manually finds focusable elements and implements the focus trap using `querySelectorAll`, `Tab`, and `Shift + Tab`. I also manually return focus to the trigger when the modal closes.

The shadcn Dialog uses the Base UI Dialog primitive:

`DialogPrimitive.Root` and `DialogPrimitive.Popup`

This delegates much of the dialog's focus management and keyboard interaction behavior to the underlying accessibility primitive instead of requiring me to implement all of that behavior myself.

### 2. Dialog structure and close behavior

My Modal is implemented as a single component with a normal Close button.

The shadcn Dialog separates the functionality into reusable primitives such as `DialogTrigger`, `DialogContent`, `DialogClose`, `DialogTitle`, and `DialogDescription`. It also provides an accessible name for its icon-only close button using visually hidden text.

This gives developers more reusable pieces while keeping the accessibility behavior built into the underlying primitive.

### 3. Tabs keyboard interaction

My Tabs implementation manually handles `ArrowRight`, `ArrowLeft`, `Home`, and `End`, and I manually manage the roving `tabIndex` so that only the active tab is in the normal tab order.

The shadcn Tabs component uses the Base UI Tabs primitive. The primitive handles the tab interaction pattern, allowing the generated component to remain mostly concerned with styling and composition.

## What I Learned

Building the components myself helped me understand that accessibility is not only about adding ARIA attributes. Interactive components also need correct keyboard behavior, focus management, and relationships between controls and their content.

I also learned that component libraries such as shadcn/ui can provide accessibility behavior through underlying primitives. This reduces the amount of accessibility logic developers need to implement and maintain themselves, but understanding the underlying patterns is still important so that the generated components can be reviewed properly.

## Keyboard Testing

### Modal

* Tab: tested
* Shift + Tab: tested
* Escape: tested
* Focus returns to the trigger after closing: tested

### Tabs

* Arrow Right: tested
* Arrow Left: tested
* Home: tested
* End: tested

### Disclosure

* Enter: tested
* Space: tested
* Expanded/collapsed state is communicated with `aria-expanded`
