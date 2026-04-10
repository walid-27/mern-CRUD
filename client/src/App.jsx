// import { useState } from 'react'
import Home from "./home"
import AddPrdct from './AddPrdct'
import UpdatePrdct from "./UpdatePrdct"
import {Route, BrowserRouter, Routes} from "react-router-dom"
function App() {
  return (
   <BrowserRouter>
   <Routes>
  <Route path='/home' element={<Home></Home>}></Route>
   <Route path='/add-product' element={<AddPrdct></AddPrdct>}></Route>
    <Route path='/update-product' element={<UpdatePrdct></UpdatePrdct>}></Route>

   </Routes>
   </BrowserRouter>
  )
}

export default App
