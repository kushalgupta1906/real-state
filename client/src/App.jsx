import { BrowserRouter, Routes,Route } from 'react-router-dom'
//import React from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import SignIN from './pages/SignIN'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import About from './pages/About'
import PrivateRoute from './components/PrivateRoute'
import { createListing } from '../../backend/controllers/listing.controller'
import CreateListing from './pages/CreateListing'
import UpdateListing from './pages/UpdateListing'
import Listing from './pages/Listing';
import Search from './pages/Search'


function App() {
  return (
    <BrowserRouter>
        <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIN />} />
        <Route path='/sign-up' element={<SignUp />} /> 
        <Route path='about' element={<About />} />
        <Route path='/search' element={<Search/>} />
        <Route path='/listing/:listingId' element={<Listing/>}/>
        <Route  element={<PrivateRoute/>} >
            <Route path='/profile' element={<Profile />} />
            <Route path='/create-listing' element={<CreateListing/>}/>
            <Route path='/update-listing/:listingId' element={<UpdateListing/>}/>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
