import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Login from './pages/user/Login';
import Register from './pages/user/Register';
import Home from './pages/Home';
import EditDog from './pages/dogs/EditDog';
import User from './pages/user/User';
import AddDog from './pages/dogs/AddDog';
import AddWalk from './pages/walks/AddWalk';
import EditWalk from './pages/walks/EditWalk';

const App = () => {
  return <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />} >
        <Route index element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='dogs/edit' element={<EditDog />} />
        <Route path='walks/edit' element={<EditWalk />} />
        <Route path='users/:id' element={<User />} />
        <Route path='users/:userId/add-dog' element={<AddDog />} />
        <Route path='users/:userId/add-walk' element={<AddWalk />} />
      </ Route>
    </Routes>
  </BrowserRouter>
}
export default App
