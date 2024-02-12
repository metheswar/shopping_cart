import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import AddProduct from './Components/AddProduct';
import AdminProducts from './Components/AdminProducts';
import ShoppingPage from './Components/ShoppingPage';
import Cart from './Components/Cart';
import { useContext } from 'react';
import Context from './Store/Context';
import EditProduct from './Components/EditProduct';
function App() {
  const {isUserChecked, setIsUserChecked,isAdminChecked, setIsAdminChecked} = useContext(Context)
  return (
<>
<Router>
  <Routes>

    <Route path='/' element={<Home />} />
    {isAdminChecked && <Route path='/addProduct' element={<AddProduct />} />}
    {isAdminChecked && <Route path='/adminProducts' element={<AdminProducts />} />}
    {isAdminChecked && <Route path='/editProduct' element={<EditProduct />} />}
    <Route path='/shop' element={<ShoppingPage />} />
    <Route path='/cart' element={<Cart />} />
   <Route path='/*' element={<Home />} />
  </Routes>
</Router>
</>
  );
}

export default App;
