import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const express = require('express');
const cors = require('cors'); // Importa el paquete cors
const app = express();

app.use(cors()); // Usa el middleware de CORS
app.use(express.json()); // Middleware para parsear JSON

// Rutas de ejemplo
app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
