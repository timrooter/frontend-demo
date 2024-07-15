import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/context/AuthContext';
import PrivateRoute from './components/misc/PrivateRoute';
import Navbar from './components/misc/Navbar';
import Home from './components/home/Home';
import Login from './components/home/Login';
import Signup from './components/home/Signup';
import ExchangeRatesPage from "./components/home/ExchangeRatesPage";
import Wallet from "./components/user/Wallet";
import Transactions from "./components/user/Transactions";
import Transfer from "./components/user/Transfer";
import QRRequest from "./components/user/QRRequest";
import ScanQR from "./components/user/ScanQR";
import ConfirmTransaction from "./components/user/ConfirmTransaction";
import TransactionSuccess from "./components/user/TransactionSuccess";
import TransactionsList from "./components/user/TransactionsList";
import UserBankCard from "./components/user/UserBankCard";

function App() {
  return (
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/exchange-rates' element={<ExchangeRatesPage />} />
              <Route path='/wallet' element={<PrivateRoute><Wallet /></PrivateRoute>} /> {/* Добавляем маршрут */}
              <Route path='/transactions' element={<PrivateRoute><Transactions /></PrivateRoute>} />
              <Route path='/transactions/transfer' element={<PrivateRoute><Transfer /></PrivateRoute>} />
              <Route path='/transactions/qr-request' element={<PrivateRoute><QRRequest/></PrivateRoute>} />
              <Route path='/transactions/success' element={<PrivateRoute><TransactionSuccess/></PrivateRoute>} />
              <Route path='/transactions/scan-qr' element={<PrivateRoute><ScanQR /></PrivateRoute>} />
              <Route path='/transactions/history' element={<PrivateRoute><TransactionsList /></PrivateRoute>} />
            <Route path='/transactions/card' element={<PrivateRoute><UserBankCard /></PrivateRoute>} />
            <Route path='/confirm-transaction' element={<ConfirmTransaction />} />
              <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </AuthProvider>
  );
}

export default App;
