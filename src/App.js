import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import AddProduct from './Components/AddProduct';
import AdminProducts from './Components/AdminProducts';
import ShoppingPage from './Components/ShoppingPage';
function App() {
  return (
<>
<Router>
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/addProduct' element={<AddProduct />} />
    <Route path='/adminProducts' element={<AdminProducts />} />
    <Route path='/shop' element={<ShoppingPage />} />
  </Routes>
</Router>
</>
  );
}

export default App;
