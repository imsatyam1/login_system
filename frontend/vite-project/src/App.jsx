import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Home'
import Login from './Login';
import Signup from './Signup';
import "./App.css"

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
