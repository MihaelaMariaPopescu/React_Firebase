import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import {ProtectedRoute} from './components/ProtectedRoute';

import PrivateRoute from './PrivateRoute';
import { Navigation } from './components/navigation';
import Discover from "./pages/Discover";
import MySongs from "./pages/MySongs";
import SignIn from "./pages/SignIn";
import AddSong from "./pages/AddSong";

function App() {

  return (
    <div>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route index element={<Discover />} />
          <Route path='/Discover' element={<Discover />} />

          {/* <Route element={ <PrivateRoute />}> */}
              <Route path='/AddSong' element={<AddSong />} />
              <Route path='/MySongs' element={<MySongs />} />
          {/* </Route> */}

          <Route path='/SignIn' element={<SignIn />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
