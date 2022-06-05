import Home from './components/Home'
import Bin from './components/Bin';

import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'



const App = () => {
  return (
    <Router>
     <div>
       <Link to="/">home</Link>/
     </div>

     <Routes>
       <Route path="bins/view/:url" element={<Bin />} />
       <Route path="/" element={<Home />} />
     </Routes>

     <div>
       <i>Created by Ainaa and Lawrence.</i>
     </div>
   </Router>
  )
}

export default App;

/*
Notes 

Components
- Create a componenent for header
- Create a component for each bin 
  - within the bin, there would many requests (request component)

Routes
- Home 
- Bins View Route
*/