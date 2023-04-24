import React from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './components/Home'
import Container from './components/Container'
import Notify from './components/Notify'
import Archive from './components/Archive'
import Mirror from './components/Mirror'
import Hacker from './components/Hacker'
import Group from './components/Group'
import Todays from './components/Todays'
import FourHundredFour from './components/FourHundredFour'
import Location from './components/Location'
import BestHackers from './components/BestHackers'
import BestGroups from './components/BestGroups'
import {Route,Routes} from 'react-router-dom';
import Statistics from './components/Statistics'
import Contact from './components/Contact'

function App() {
  return (
    <Container>
    <div className='w-full h-screen '>
     <Header /> 
      <div className='flex gap-4 min-h-full'>
        <Routes>
          <Route path="/" element={<Home/>} exact />
          <Route path="/best-hackers/:page?" element={<BestHackers/>}/>
          <Route path="/location/:location/:page?" element={<Location/>}/>
          <Route path="/best-groups/:page?" element={<BestGroups/>}/>
          <Route path="/archive/:page?" element={<Archive/>}/>
          <Route path="/todays/:page?" element={<Todays/>}/>
          <Route path="/hacker/:nick/:page?" element={<Hacker/>}/>
          <Route path="/group/:group/:page?" element={<Group/>}/>
          <Route path="/notify" element={<Notify/>}/>
          <Route path="/mirror/:id" element={<Mirror/>}/>
          <Route path="/statistics" element={<Statistics/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path='*' element={<FourHundredFour/>} />
        </Routes>
      </div>
      <Footer />
    </div>
  </Container>
  )
}

export default App