import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import BorrowerLogin from './BorrowerLogin.jsx';
import Home from './Home.jsx';
import Search from './Search.jsx';
import BorrowerAccount from './BorrowerAccount.jsx';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<BorrowerLogin />} />
        <Route path="/search" element={<Search />} />
        <Route path="/account" element={<BorrowerAccount />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;