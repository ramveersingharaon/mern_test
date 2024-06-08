import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import PrivateRoute from './components/Private/PrivateRoute';
import Profile from './components/Profile/Profile';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element = {<App/>}>
    <Route path='/' index={true} element ={<Home/>}/>
    <Route path='/login' element ={<Login/>}/>
    <Route path='/register'  element ={<Register/>}/>
                   {/* Private Route  */}
    <Route path='' element={<PrivateRoute/>}>
      <Route path='profile' element={<Profile/>}/>
    </Route>
  </Route>
))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
   <RouterProvider router={router}/>
    </React.StrictMode>
  </Provider>
);

