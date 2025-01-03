import React, { useContext, useState, useEffect } from 'react';
import { MenuContext } from '../../context/MenuContext';
import './sidebar.css';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const url = location.pathname;
  const path = url.split('/');
  const [activeItem, setActiveItem] = useState(path[1] || 'dashboard');
  const { activeMenu } = useContext(MenuContext);

  useEffect(() => {
    setActiveItem(path[1] || 'dashboard');
  }, [url]);

  // Helper function to determine active status
  const isActive = (itemPath) => activeItem === itemPath;

    return(
        <>
          {/* partial:partials/_sidebar.html */}
          <nav className="sidebar sidebar-offcanvas" id="sidebar">
            <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
              <Link className="sidebar-brand brand-logo" to="/dashboard">
                {/* <img src="assets/images/logo.png" alt="logo" /> */}
                <h3>HOLIDAY</h3>
              </Link>
              <Link className="sidebar-brand brand-logo-mini" to="/">
                <img src="assets/images/logo.png" alt="logo" />
              </Link>
            </div>
            {(activeMenu === 'cms' || activeMenu === '') && (
            <ul className="nav" id="cms-nav">

              <li className="nav-item nav-category">
                <span className="nav-link">Navigation</span>
              </li>
              <li className={`nav-item menu-items ${isActive('dashboard') ? 'active' : ''}`}>
                <Link to="/dashboard"  className="nav-link" >
                  <span className="menu-icon">
                    <i className="mdi mdi-speedometer" />
                  </span>
                  <span className="menu-title">Dashboard</span>
                </Link>
              </li>
        {/* Home Section */}
        <li className="nav-item menu-items">
            <a className="nav-link" data-bs-toggle="collapse" href="#home" aria-expanded="false" aria-controls="home">
              <span className="menu-icon">
                <i className="mdi mdi-home" />
              </span>
              <span className="menu-title">Home</span>
              <i className="menu-arrow" />

            </a>
            <div className="collapse" id="home">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"><Link className="nav-link" href="#">Special Packages</Link></li>
                <li className="nav-item"><Link className="nav-link" href="#">Banner</Link></li>
                <li className="nav-item"><Link className="nav-link" href="#">Destination</Link></li>
                <li className="nav-item"><Link className="nav-link" href="#">Offers</Link></li>
                <li className="nav-item"><Link className="nav-link" href="#">Tag</Link></li>
                <li className="nav-item"><Link className="nav-link" href="#">Blogs</Link></li>
                <li className="nav-item"><Link className="nav-link" href="#">Testimonial</Link></li>
                <li className="nav-item"><Link className="nav-link" href="#">Add Page</Link></li>
                <li className="nav-item"><Link className="nav-link" href="#">Manage Services</Link></li>
                <li className="nav-item"><Link className="nav-link" href="#">Manage About Us</Link></li>
                <li className="nav-item"><Link className="nav-link" href="#">Manage Contact Us</Link></li>
                <li className="nav-item"><Link className="nav-link" href="#">Similar Packages</Link></li>
                <li className="nav-item"><Link className="nav-link" href="#">Home Page Setting</Link></li>
              </ul>
            </div>
          </li>

          {/* Transfers Section */}
          <li className="nav-item menu-items">
            <a className="nav-link" data-bs-toggle="collapse" href="#transfers" aria-expanded="false" aria-controls="transfers">
              <span className="menu-icon">
                <i className="mdi mdi-car-connected" />
              </span>
              <span className="menu-title">Transfers</span>
              <i className="menu-arrow" />
            </a>
            <div className="collapse" id="transfers">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"><Link className="nav-link" href="#">Transfer</Link></li>
                <li className="nav-item"><Link className="nav-link" href="#">Transfer Settings</Link></li>
                <li className="nav-item"><Link className="nav-link" href="#">Transfer Type</Link></li>
              </ul>
            </div>
          </li>

          {/* Hotels Section */}
          <li className="nav-item menu-items">
            <a className="nav-link" data-bs-toggle="collapse" href="#hotels" aria-expanded="false" aria-controls="hotels">
              <span className="menu-icon">
                <i className="mdi mdi-hotel" />
              </span>
              <span className="menu-title">Hotels</span>
              <i className="menu-arrow" />
            </a>
            <div className="collapse" id="hotels">
              <ul className="nav flex-column sub-menu">
              <li className={`nav-item ${isActive('Amenities') ? 'active' : ''}`}><Link className="nav-link" to="/Amenities">Amenities</Link></li>

                <li className="nav-item"><Link className="nav-link" href="#">Facilities</Link></li>
                <li className={`nav-item ${isActive('hotelType') ? 'active' : ''}`}><Link className="nav-link" to="/hotelType">Hotel Type</Link></li>
                <li className={`nav-item ${isActive('hotel') ? 'active' : ''}`}><Link className="nav-link" to="/hotel">Hotel</Link></li>
                <li className={`nav-item ${isActive('roomType') ? 'active' : ''}`}><Link className="nav-link" to="/roomType">Room Type</Link></li>

                <li className="nav-item"><Link className="nav-link" href="#">Rooms</Link></li>
                <li className="nav-item"><Link className="nav-link" href="#">Similar Hotel</Link></li>
                <li className="nav-item"><Link className="nav-link" href="#">Hotel Settings</Link></li>
                <li className="nav-item"><Link className="nav-link" href="#">Meal Plan</Link></li>
              </ul>
            </div>
          </li>

          {/* Visa Section */}
          <li className="nav-item menu-items">
            <a className="nav-link" data-bs-toggle="collapse" href="#visa" aria-expanded="false" aria-controls="visa">
              <span className="menu-icon">
                <i className="mdi mdi-passport" />
              </span>
              <span className="menu-title">Visa</span>
              <i className="menu-arrow" />
            </a>
            <div className="collapse" id="visa">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"><Link className="nav-link" href="#">Visa</Link></li>
                <li className="nav-item"><Link className="nav-link" href="#">Visa Type</Link></li>
                <li className="nav-item"><Link className="nav-link" href="#">Enter Type</Link></li>
              </ul>
            </div>
          </li>

          {/* Flight Section */}
          <li className="nav-item menu-items">
            <a className="nav-link" data-bs-toggle="collapse" href="#flight" aria-expanded="false" aria-controls="flight">
              <span className="menu-icon">
                <i className="mdi mdi-airplane" />
              </span>
              <span className="menu-title">Flight</span>
              <i className="menu-arrow" />
            </a>
            <div className="collapse" id="flight">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"><Link className="nav-link" href="#">Flight</Link></li>
                <li className="nav-item"><Link className="nav-link" href="#">Flight Settings</Link></li>
                <li className="nav-item"><Link className="nav-link" href="#">Popular Routes</Link></li>
              </ul>
            </div>
          </li>

          {/* CMS Settings Section */}
          <li className="nav-item menu-items">
            <a className="nav-link" data-bs-toggle="collapse" href="#cms-settings" aria-expanded="false" aria-controls="cms-settings">
              <span className="menu-icon">
                <i className="mdi mdi-settings" />
              </span>
              <span className="menu-title">CMS Setting</span>
              <i className="menu-arrow" />
            </a>
            <div className="collapse" id="cms-settings">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"><Link className="nav-link" href="#">Activity Settings</Link></li>
                <li className="nav-item"><Link className="nav-link" href="#">SEO Settings</Link></li>
                <li className="nav-item"><Link className="nav-link" href="#">Login Banner</Link></li>
                <li className="nav-item"><Link className="nav-link" href="#">News Letter</Link></li>
                <li className="nav-item"><Link className="nav-link" href="#">Footer Settings</Link></li>
              </ul>
            </div>
          </li>

          {/* Cruise Section */}
          <li className="nav-item menu-items">
            <a className="nav-link" data-bs-toggle="collapse" href="#cruise" aria-expanded="false" aria-controls="cruise">
              <span className="menu-icon">
                <i className="mdi mdi-ferry" />
              </span>
              <span className="menu-title">Cruise</span>
              <i className="menu-arrow" />
            </a>
            <div className="collapse" id="cruise">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"><Link className="nav-link" href="#">Cruise</Link></li>
                <li className="nav-item"><Link className="nav-link" href="#">Cruise Settings</Link></li>
              </ul>
            </div>
          </li>

          {/* Destination Section */}
          <li className="nav-item menu-items">
            <a className="nav-link" data-bs-toggle="collapse" href="#destination" aria-expanded="false" aria-controls="destination">
              <span className="menu-icon">
                <i className="mdi mdi-map-marker" />
              </span>
              <span className="menu-title">Destination</span>
              <i className="menu-arrow" />
            </a>
            <div className="collapse" id="destination">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"><Link className="nav-link" href="#">Activities</Link></li>
                <li className="nav-item"><Link className="nav-link" href="#">Destination Hotel</Link></li>
                <li className="nav-item"><Link className="nav-link" href="#">Destination Packages</Link></li>
                <li className="nav-item"><Link className="nav-link" href="#">Location</Link></li>
              </ul>
            </div>
          </li>

            </ul>
            )}
            {activeMenu === 'packages' && (
            <ul className="nav" id="packages-nav">
            <li className="nav-item nav-category">
                <span className="nav-link">Navigation</span>
              </li>
          <li className={`nav-item menu-items ${isActive('packageDashboard') ? 'active' : ''}`}>
                <Link to="/packageDashboard"  className="nav-link" >
                  <span className="menu-icon">
                    <i className="mdi mdi-speedometer" />
                  </span>
                  <span className="menu-title">Dashboard</span>
                </Link>
          </li>
          <li className={`nav-item menu-items ${isActive('package') ? 'active' : ''}`}>
            <Link to="/package" className="nav-link">
              <span className="menu-icon">
                <i className="mdi mdi-send" />
              </span>
              <span className="menu-title">Package</span>
            </Link>
          </li>

          <li className="nav-item nav-category">
            <span className="nav-link">Package Master</span>
          </li>
          <li className="nav-item menu-items">
            <Link to="/TagCategory" className="nav-link">
              <span className="menu-icon">
                <i className="mdi mdi-tag-multiple" />
              </span>
              <span className="menu-title">Tag Category</span>
            </Link>
          </li>
          <li className="nav-item menu-items">
            <Link to="/Inclusions" className="nav-link">
              <span className="menu-icon">
                <i className="mdi mdi-email" />
              </span>
              <span className="menu-title">Inclusions</span>
            </Link>
          </li>
          <li className="nav-item menu-items">
            <Link to="/Policy" className="nav-link">
              <span className="menu-icon">
                <i className="mdi mdi-email" />
              </span>
              <span className="menu-title">Policy</span>
            </Link>
          </li>
          <li className="nav-item menu-items">
            <Link to="/TagWisePackage" className="nav-link">
              <span className="menu-icon">
                <i className="mdi mdi-label" />
              </span>
              <span className="menu-title">Tag Wise Package</span>
            </Link>
          </li>
          <li className="nav-item menu-items">
            <Link to="/Exclusions" className="nav-link">
              <span className="menu-icon">
                <i className="mdi mdi-check" />
              </span>
              <span className="menu-title">Exclusions</span>
            </Link>
          </li>
            </ul>
        )}
          </nav>
        </>
    );
}
export default Sidebar;