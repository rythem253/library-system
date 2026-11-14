import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import BorrowerLogin from './BorrowerLogin.jsx';
import Home from './Home.jsx';
import Search from './Search.jsx';
import BorrowerAccount from './BorrowerAccount.jsx';

// Librarian pages
import LibrarianLogin from './librarian/LibrarianLogin.jsx';
import LibrarianLayout from './librarian/LibrarianLayout.jsx';
import Dashboard from './librarian/Dashboard.jsx';
import Inventory from './librarian/Inventory.jsx';
import ItemForm from './librarian/ItemForm.jsx';
import Loans from './librarian/Loans.jsx';
import OverdueLoans from './librarian/OverdueLoans.jsx';
import Borrowers from './librarian/Borrowers.jsx';
import Fines from './librarian/Fines.jsx';
import Wishlist from './librarian/Wishlist.jsx';
import ItemDetails from './ItemDetails.jsx';
import Checkout from './Checkout.jsx';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/login" element={<BorrowerLogin />} />
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/account" element={<BorrowerAccount />} />
        <Route path="/item-details" element={<ItemDetails />}/>
        <Route path="/checkout" element={<Checkout/>} />

        {/* Librarian pages */}
        <Route path="/librarian/login" element={<LibrarianLogin />} />
        <Route path="/librarian" element={<LibrarianLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="items/new" element={<ItemForm />} />
          <Route path="items/:itemId/edit" element={<ItemForm />} />
          <Route path="loans" element={<Loans />} />
          <Route path="loans/overdue" element={<OverdueLoans />} />
          <Route path="borrowers" element={<Borrowers />} />
          <Route path="fines" element={<Fines />} />
          <Route path="wishlist" element={<Wishlist />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
