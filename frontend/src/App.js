import { BrowserRouter,Route,Routes } from 'react-router-dom';
import './App.css';
import Login from './component/auth/Login';
import Home from './pages/Home';
function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={   <Login/>}/>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </BrowserRouter>

    </>
  );
}

export default App;
