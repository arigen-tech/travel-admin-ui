import React, { Suspense, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { MenuProvider } from './context/MenuContext';
import Hoteldetails from './views/CmsPages/Hotel/Hotel details/Hoteldetails';
import Amenities from './views/CmsPages/Hotel/Amenities/Amenities';
import RoomType from './views/CmsPages/Hotel/RoomType/Roomtype';
import Hotelsettings from './views/CmsPages/Hotel/HotelSettings/Hotelsettings';
import Rooms from './views/CmsPages/Hotel/Rooms/Rooms';
import Mealplan from './views/CmsPages/Hotel/Mealplan/Mealplan';
import Facilities from './views/CmsPages/Hotel/Facilities/Facilities';
import Similarhotel from './views/CmsPages/Hotel/SimilarHotel/Similarhotel';
import Visadetails from './views/CmsPages/Visa/Visadetails/Visa';
import Inclusions from './views/PackagePages/PackageMaster/Inclusion/Inclusions';
import Exclusions from './views/PackagePages/PackageMaster/Exclusions/Exclusion';
import Policy from './views/PackagePages/PackageMaster/Policy/Policy';
import Tagcategory from './views/PackagePages/PackageMaster/TagCategory/Tagcategory';

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
            <Route path="/Hotelsettings" element={<Hotelsettings/>} />
            <Route path="/Rooms" element={<Rooms/>} />
            <Route path="/mealPlan" element={<Mealplan/>} />
            <Route path="/facilities" element={<Facilities/>} />
            <Route path="Similarhotel" element={<Similarhotel/>} />
            <Route path="/Visa" element={<Visadetails/>} />
            <Route path="/Inclusions" element={<Inclusions/>} />
            <Route path="/Exclusions" element={<Exclusions/>} />
            <Route path="/Policy" element={<Policy/>} />
            <Route path="/Tagcategory" element={<Tagcategory/>} />
 

          </Route>
        </Routes>
      </Suspense>
    </Router>
    </MenuProvider>
  );
}

export default App;
