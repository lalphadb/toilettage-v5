import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Philosophie from './components/Philosophie'
import Services from './components/Services'
import Tarifs from './components/Tarifs'
import Galerie from './components/Galerie'
import Equipe from './components/Equipe'
import Contact from './components/Contact'
import PolitiqueConfidentialite from './components/PolitiqueConfidentialite'
import fbLogo from './assets/facebook-logo.png'

const FacebookFloat = () => (
  <a
    href="https://www.facebook.com/lacstcharles"
    target="_blank"
    rel="noopener noreferrer"
    title="Suivez-nous sur Facebook"
    style={{
      position: 'fixed',
      bottom: '28px',
      right: '28px',
      zIndex: 999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      background: '#fff',
      boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'pointer',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'scale(1.1)'
      e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)'
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'scale(1)'
      e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.15)'
    }}
  >
    <img
      src={fbLogo}
      alt="Facebook"
      style={{ width: '28px', height: '28px', display: 'block' }}
    />
  </a>
)

const MainPage = () => (
  <>
    <Hero />
    <Philosophie />
    <Services />
    <Tarifs />
    <Galerie />
    <Equipe />
    <Contact />
  </>
)

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
          </Routes>
        </main>
        <Footer />
        <FacebookFloat />
      </div>
    </BrowserRouter>
  )
}

export default App
