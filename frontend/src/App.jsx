import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Login from './pages/user/Login';
import Register from './pages/user/Register';

const App = () => {
  return <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>
  </BrowserRouter>
}
export default App
