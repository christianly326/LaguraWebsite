import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Ensure Bootstrap JS is imported
import './App.css';
import './styles.css';
import Navbar from './components/Navbar';
import Exchange from './components/Exchange';
function App() {

  return (
    <>
    <Navbar />
    <Exchange />
    </>
  );
}

export default App;
