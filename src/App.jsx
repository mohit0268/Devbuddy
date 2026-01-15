import {Provider} from 'react-redux'
import Login from "./components/Login";
import Body from "./Body";
import Profile from "./components/Profile";
import Connections from './components/Connections';
import Requests from './components/Requests'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import appStore from '../utils/appStore';
import Feed from './components/Feed';
import Signup from './components/Signup';


function App() {
  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/requests" element={<Requests />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </Provider>
     
    </>
  );
}


export default App;
