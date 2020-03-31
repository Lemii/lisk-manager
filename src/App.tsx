import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { toast } from 'react-toastify';

import Routes from './routes';
import Header from './components/Header';
import Footer from './components/Footer';

import { PasswordContext } from './contexts';

toast.configure({
  draggable: false,
  position: 'bottom-center',
  closeOnClick: true,
  pauseOnFocusLoss: false
});

export default function App() {
  const [password, setPassword] = useState<string | null>(null);

  return (
    <PasswordContext.Provider value={{ password, update: setPassword }}>
      <Router>
        <Header />
        <Routes />
        <Footer />
      </Router>
    </PasswordContext.Provider>
  );
}
