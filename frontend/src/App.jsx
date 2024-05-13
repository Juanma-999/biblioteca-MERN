import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Login from './pages/user/Login';
import Register from './pages/user/Register';
import Home from './pages/Home';
import EditDog from './pages/dogs/EditDog';
import User from './pages/user/User';
import AddDog from './pages/dogs/AddDog';

const App = () => {
  return <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />} >
        <Route index element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='edit' element={<EditDog />} />
        <Route path='users/:id' element={<User />} />
        <Route path='users/:userId/add-dog' element={<AddDog />} />
      </ Route>
    </Routes>
  </BrowserRouter>
}
export default App
