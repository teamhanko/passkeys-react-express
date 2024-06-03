import './App.css'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Dashboard from './pages/dashboard';

import { Toaster } from "@/components/ui/sonner"
import Mfa from './pages/mfa';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="mfa" element={<Mfa />} />
      {/* <Route path="protected" element={<PrivateRoute unauthorizedMessage='Please authenticate to access this page'><Protected /></PrivateRoute>} /> */}
    </Route>
  )
)

function App() {
  return (
    <>
      <div>
        <RouterProvider router={router} />
        <Toaster />
      </div>
    </>
  )
}

export default App
