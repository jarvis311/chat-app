
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Chat from './Components/Chat';
import Home from './Components/Home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/chatroom' element={<Chat/>}/>
      </Routes>
      
      
    </div>
  );
}

export default App;
