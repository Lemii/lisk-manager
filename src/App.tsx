import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { toast } from 'react-toastify';

import Routes from './routes';

import Header from './components/Header';
import Footer from './components/Footer';

toast.configure({
  draggable: false,
  position: 'bottom-center',
  closeOnClick: true
});

export default function App() {
  return (
    <Router>
      <Header />
      <Routes />
      <Footer />
    </Router>
  );
}
