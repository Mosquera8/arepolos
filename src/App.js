import './App.css';
import React, {
  Component
} from 'react';
import GetProducts from './components/GetProducts'
import CrudApiProducto from './components/crud/CrudApiProducto';

function App() {
  return (
    <div className="App">
      <header className="App-header">
         <h1>Hola</h1>
      </header>
        <GetProducts />
        <CrudApiProducto/>
    </div>
  );
}

export default App;
