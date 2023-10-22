import { Route, Routes } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Home from './components/Home';
import Post from './components/Post';


function App() {
  return (
    <div className="App">
      
      {/* <Home /> */}

      <Routes>
        <Route path='' element={<Landing />} />
        <Route path='/home' element={<Home />} />
        <Route path='/post/:id' element={<Post />} />
      </Routes>
    </div>
  );
}

export default App;
