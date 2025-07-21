import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/HomePage/HomePage'
import Contact from './pages/ContactPage/ContactPage'
import Snav from './components/Navbar/Navbar'
import Sfooter from './components/Footer/Footer'
import CollectionPages from './pages/CollectionPages/CollectionPages.jsx';
import StoryPage from './pages/StoryPage/StoryPage.jsx'
import AdminPage from './pages/AdminPage/AdminPage.jsx'

function App() {
  return (
    <Router>
      <Snav/>
      <main>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/Contact" element={<Contact/>}/>
          <Route path="/collection" element={<CollectionPages />} />
          <Route path="/storypage" element={<StoryPage />} />
          <Route path="/adminpage" element={<AdminPage />} />
        </Routes>
      </main>
      <Sfooter/>
    </Router>
  )
}

export default App