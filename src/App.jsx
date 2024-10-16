import './App.css'
import Home from './Pages/Home/Home'
import Root from './Routes/Root'
import SignUp from './Pages/SignUp/SignUp'
import Products from './Pages/Products/Products'
import SignIn from './Pages/Login/Login';
import Categories from './Pages/Categories/Categories'
import NotFound from './Components/NotFound'
import Cart from './Pages/Cart/Cart';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <> <Home /> <Categories height={20} /></>,
      },
      {
        path: '/signin',
        element: <SignIn />
      },
      {
        path: '/signup',
        element: <SignUp />
      }, {
        path: '/products',
        element: <Products />
      }, {
        path: 'products/category/:id',
        element: <Products />
      },
      {
        path: '/cart',
        element: <Cart />
      }, {
        path: 'categories',
        element: <Categories />
      }, 
      {
        path: '*',
        element: <NotFound />
      }
    ],
  },
]);

function App() {


  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  )
}

export default App
