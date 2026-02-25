import React from "react";
import AppRoutes from "./routes/AppRoutes";
import {Toaster} from 'react-hot-toast';

export default function App() {
  return (
  <>
  <Toaster position="top-center" reverseOrder={false}/>
  <AppRoutes /> </>);
}
