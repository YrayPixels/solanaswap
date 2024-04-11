import logo from './logo.svg';
import './App.css';
import './style.css';

import HomePage from './pages/homepage';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
// import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { useMemo } from 'react';


function App() {
  // const wallets = useMemo(
  //   () => [
  //     new SolflareWalletAdapter(),
  //     new PhantomWalletAdapter(),
  //   ],
  //   []
  // );

  return (
    <RouterProvider router={router} />
  );
}

export default App;
