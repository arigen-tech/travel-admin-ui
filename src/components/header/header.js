import React, { useContext } from 'react';
import { MenuContext } from '../../context/MenuContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './header.css';

const Header = () => {
  const { setActiveMenu } = useContext(MenuContext);
  const { activeMenu } = useContext(MenuContext);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path) => currentPath === path;


  const handleToggle = () => {
    document.body.classList.toggle('sidebar-icon-only');
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/');
  }

    return(
        <>
            {/* partial:partials/_navbar.html */}
    <nav className="navbar p-0 fixed-top d-flex flex-row">
      <div className="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center">
        <Link className="navbar-brand brand-logo-mini" to="/dashboard">
        <h3>HOLIDAY</h3>
        </Link>
      </div>
      <div className="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
        <button
        id='toggle-button'
          className="navbar-toggler navbar-toggler align-self-center"
          type="button"
          data-toggle="minimize"
          onClick={handleToggle}
        >
          <span className="mdi mdi-tune" />
        </button>
        <ul className="navbar-nav w-100 top-nav">{console.log('activeMenu===', activeMenu)}
            <li className={`nav-item nav-settings d-none d-lg-block ${activeMenu === 'cms' ? 'active' : ''}`}>
                <Link className="nav-link" to="/dashboard" id="cms-nav" onClick={() => setActiveMenu('cms')}>
                    <i className="mdi mdi-desktop-mac" /> <span>CMS</span>
                </Link>
            </li>
            <li className={`nav-item nav-settings d-none d-lg-block ${activeMenu === 'packages' ? 'active' : ''}`}>
                <Link className="nav-link" to="/packageDashboard" id="packages-nav" onClick={() => setActiveMenu('packages')}>
                    <i className="mdi mdi-view-grid" /> Packages
                </Link>
            </li>
            <li className={`nav-item nav-settings d-none d-lg-block ${isActive('/leads') ? 'active' : ''}`}>
                <Link className="nav-link" to="/leads">
                    <i className="mdi mdi-view-grid" /> Leads
                </Link>
            </li>
            <li className={`nav-item nav-settings d-none d-lg-block ${isActive('/settings') ? 'active' : ''}`}>
                <Link className="nav-link" to="/settings">
                    <i className="mdi mdi-view-grid" /> Settings
                </Link>
            </li>
            <li className={`nav-item nav-settings d-none d-lg-block ${isActive('/customer') ? 'active' : ''}`}>
                <Link className="nav-link" to="/customer">
                    <i className="mdi mdi-view-grid" /> Customer
                </Link>
            </li>
        </ul>
        <ul className="navbar-nav navbar-nav-right header-dropdowns">
          <li className="nav-item nav-settings d-none d-lg-block">
            <a className="nav-link" href="#">
              <i className="mdi mdi-view-grid" />
            </a>
          </li>
          <li className="nav-item dropdown border-left">
            <a
              className="nav-link count-indicator dropdown-toggle"
              id="messageDropdown"
              href="#"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="mdi mdi-email" />
              <span className="count bg-success" />
            </a>
            <div
              className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
              aria-labelledby="messageDropdown"
            >
              <h6 className="p-3 mb-0">Messages</h6>
              <div className="dropdown-divider" />
              <a className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <img
                    src="assets/images/faces/face4.jpg"
                    alt="image"
                    className="rounded-circle profile-pic"
                  />
                </div>
                <div className="preview-item-content">
                  <p className="preview-subject ellipsis mb-1">
                    Mark send you a message
                  </p>
                  <p className="text-muted mb-0"> 1 Minutes ago </p>
                </div>
              </a>
              <div className="dropdown-divider" />
              <a className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <img
                    src="assets/images/faces/face2.jpg"
                    alt="image"
                    className="rounded-circle profile-pic"
                  />
                </div>
                <div className="preview-item-content">
                  <p className="preview-subject ellipsis mb-1">
                    Cregh send you a message
                  </p>
                  <p className="text-muted mb-0"> 15 Minutes ago </p>
                </div>
              </a>
              <div className="dropdown-divider" />
              <a className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <img
                    src="assets/images/faces/face3.jpg"
                    alt="image"
                    className="rounded-circle profile-pic"
                  />
                </div>
                <div className="preview-item-content">
                  <p className="preview-subject ellipsis mb-1">
                    Profile picture updated
                  </p>
                  <p className="text-muted mb-0"> 18 Minutes ago </p>
                </div>
              </a>
              <div className="dropdown-divider" />
              <p className="p-3 mb-0 text-center">4 new messages</p>
            </div>
          </li>
          <li className="nav-item dropdown border-left">
            <a
              className="nav-link count-indicator dropdown-toggle"
              id="notificationDropdown"
              href="#"
              data-bs-toggle="dropdown"
            >
              <i className="mdi mdi-bell" />
              <span className="count bg-danger" />
            </a>
            <div
              className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
              aria-labelledby="notificationDropdown"
            >
              <h6 className="p-3 mb-0">Notifications</h6>
              <div className="dropdown-divider" />
              <a className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-dark rounded-circle">
                    <i className="mdi mdi-calendar text-success" />
                  </div>
                </div>
                <div className="preview-item-content">
                  <p className="preview-subject mb-1">Event today</p>
                  <p className="text-muted ellipsis mb-0">
                    Just a reminder that you have an event today
                  </p>
                </div>
              </a>
              <div className="dropdown-divider" />
              <a className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-dark rounded-circle">
                    <i className="mdi mdi-settings text-danger" />
                  </div>
                </div>
                <div className="preview-item-content">
                  <p className="preview-subject mb-1">Settings</p>
                  <p className="text-muted ellipsis mb-0"> Update dashboard </p>
                </div>
              </a>
              <div className="dropdown-divider" />
              <a className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-dark rounded-circle">
                    <i className="mdi mdi-link-variant text-warning" />
                  </div>
                </div>
                <div className="preview-item-content">
                  <p className="preview-subject mb-1">Launch Admin</p>
                  <p className="text-muted ellipsis mb-0"> New admin wow! </p>
                </div>
              </a>
              <div className="dropdown-divider" />
              <p className="p-3 mb-0 text-center">See all notifications</p>
            </div>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link"
              id="profileDropdown"
              href="#"
              data-bs-toggle="dropdown"
            >
              <div className="navbar-profile">
                <img
                  className="img-xs rounded-circle"
                  src="assets/images/faces/face15.jpg"
                  alt=""
                />
                <p className="mb-0 d-none d-sm-block navbar-profile-name">
                  User Name
                </p>
                <i className="mdi mdi-menu-down d-none d-sm-block" />
              </div>
            </a>
            <div
              className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
              aria-labelledby="profileDropdown"
            >
              <h6 className="p-3 mb-0">Profile</h6>
              <div className="dropdown-divider" />
              <a className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-dark rounded-circle">
                    <i className="mdi mdi-settings text-success" />
                  </div>
                </div>
                <div className="preview-item-content">
                  <p className="preview-subject mb-1">Settings</p>
                </div>
              </a>
              <div className="dropdown-divider" />
              <a className="dropdown-item preview-item" onClick={handleLogout}>
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-dark rounded-circle">
                    <i className="mdi mdi-logout text-danger" />
                  </div>
                </div>
                <div className="preview-item-content">
                  <p className="preview-subject mb-1">Log out</p>
                </div>
              </a>
              <div className="dropdown-divider" />
              <p className="p-3 mb-0 text-center">Advanced settings</p>
            </div>
          </li>
        </ul>
        <button
          className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
          type="button"
          data-toggle="offcanvas"
          onClick={handleToggle}
        >
          <span className="mdi mdi-format-line-spacing" />
        </button>
      </div>
    </nav>
        </>
    );
}
export default Header;
