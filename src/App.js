import React from 'react';
import Table from './components/Table';
import swlogo from './swlogo.png';
import './App.css';

function App() {
  return (
    <div className="app">
      <header>
        <img src={ swlogo } alt="star wars logo" className="project-logo" />
      </header>
      <section className="app-section">
        <Table />
      </section>
    </div>
  );
}

export default App;
