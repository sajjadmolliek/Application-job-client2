import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider,} from "react-router-dom";
import './index.css'
import Routes from './Routes/Router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={Routes} />
    <ToastContainer />
  </React.StrictMode>,
)
