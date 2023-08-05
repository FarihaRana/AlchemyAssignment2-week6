import React from 'react';
import { createRoot } from "react-dom/client";
import { StateProvider } from './Shared';
import App from './App';
import './index.css';


const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
   <StateProvider>
    <App />
   </StateProvider>
   </React.StrictMode>
);