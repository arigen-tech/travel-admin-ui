import React, { Suspense, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { MenuProvider } from './context/MenuContext';
import Hoteldetails from './views/CmsPages/Hotel/Hotel details/index';
import Amenities from './views/CmsPages/Hotel/Amenities/index';
import RoomType from './views/CmsPages/Hotel/RoomType/index';
import Hotelsettings from './views/CmsPages/Hotel/HotelSettings/index';
import Mealplan from './views/CmsPages/Hotel/Mealplan/index';
import Facilities from './views/CmsPages/Hotel/Facilities/index';
import Similarhotel from './views/CmsPages/Hotel/SimilarHotel/index';
import Inclusions from './views/PackagePages/PackageMaster/Inclusion/index';
import Exclusions from './views/PackagePages/PackageMaster/Exclusions/index';
import Policy from './views/PackagePages/PackageMaster/Policy/index';
import Tagcategory from './views/PackagePages/PackageMaster/TagCategory/index';
import Tag from './views/CmsPages/Home/Tag/index';
import Tagwisepackage from './views/PackagePages/PackageMaster/TagWisePackage/index';
import Rooms from './views/CmsPages/Hotel/Rooms';
import Facilitycategory from './views/CmsPages/Hotel/FacilityCategory';



// import Addpage from './views/CmsPages/Home/AddPage';
// import Manageservices from './views/CmsPages/Home/Manage Services';
// import Activities from './views/CmsPages/Destination/Activities';
// import Destinationhotel from './views/CmsPages/Destination/DestinationHotel';
// import Destinationpackages from './views/CmsPages/Destination/DestinationPackages';
// import Destination from './views/CmsPages/Home/Destination';


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
            <Route path="/Inclusions" element={<Inclusions/>} />
            <Route path="/Exclusions" element={<Exclusions/>} />
            <Route path="/Policy" element={<Policy/>} />
            <Route path="/Tagcategory" element={<Tagcategory/>} />
            <Route path="/Tag" element={<Tag/>} />
            <Route path="/Tagwisepackage" element={<Tagwisepackage/>} />
            <Route path="Facilitycategory" element={<Facilitycategory/>} />


             {/* <Route path="/AddPage" element={<Addpage/>} />
            <Route path="/ManageServices" element={<Manageservices/>} />
            <Route path="/Activities" element={<Activities/>} /> 
             <Route path="/Destinationhotel" element={<Destinationhotel/>} />
            <Route path="/Destinationpackages" element={<Destinationpackages/>} /> 
             <Route path="/Destination" element = {<Destination/>} />
  */}

          </Route>
        </Routes>
      </Suspense>
    </Router>
    </MenuProvider>
  );
}

export default App;
