import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import SingleProduct from "./pages/SingleProduct";
import 'bootstrap/dist/css/bootstrap.min.css';
import Categories from "./pages/Categories";
import Checkout from "./pages/Checkout";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index={true} element={<Home/>}/>
        <Route path={"/products"} element={<Product/>}/>
          <Route path={"/products/:id"} element={<SingleProduct/>}/>
          <Route path={"/categories/:id"} element={<Categories/>}/>
          <Route path={"/checkout"} element={<Checkout/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
