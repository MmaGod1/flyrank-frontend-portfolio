import { Modal } from './components/Modal'
import { Tabs } from './components/Tabs'
import { Disclosure } from './components/Disclosure'

function App() {
  return (
    <main>
      <h1>FE-05: Accessible Component Fundamentals</h1>

      <section style={{ marginBottom: '3rem' }}>
        <h2>Modal</h2>
        <Modal />
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2>Tabs</h2>
        <Tabs />
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2>Disclosure</h2>
        <Disclosure />
      </section>
    </main>
  )
}

export default App
