import React, { Suspense, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { MenuProvider } from './context/MenuContext';
import Hoteldetails from './views/CmsPages/Hotel/Hotel details/Hoteldetails';
import Amenities from './views/CmsPages/Hotel/Amenities/Amenities';
import RoomType from './views/CmsPages/Hotel/RoomType/Roomtype';

const Layout =  React.lazy(() => import('./views/layout/index'));
const Dashboard = React.lazy(() => import('./views/Dashboard/index'));
const PackageDashboard = React.lazy(() => import('./views/PackagePages/PackageDashboard/index'));
const Package = React.lazy(() => import('./views/PackagePages/packages/index'));
const Login = React.lazy(() => import('./views/Login/index'));
const HotelType = React.lazy(() => import('./views/CmsPages/Hotel/HotelType/index'));

const isAuthenticated = () => {
  // Replace this with real authentication check logic
 // return Cookies.get('isAuthenticated') === "true";
 return true;
};
const PrivateRoute = ({ element, path }) => {
  return isAuthenticated() ? element : <Navigate to="/" />;
};
function App() {
  return (
    <MenuProvider>
    <Router>
      <Suspense>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/" element={<PrivateRoute element={<Layout />} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/packageDashboard" element={<PackageDashboard />} />
            <Route path="/package" element={<Package />} />
            <Route path="/hotelType" element={<HotelType />} />
            <Route path="/hotel" element={<Hoteldetails />} />
            <Route path="/Amenities" element={<Amenities/>} />
            <Route path="/RoomType" element={<RoomType/>} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
    </MenuProvider>
  );
}

export default App;
