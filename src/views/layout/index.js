import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import Sidebar  from '../../components/sidebar/sidebar';
const Layout = () => {
    return(
      <div className="container-scroller">
          <Sidebar />
          <div className="container-fluid page-body-wrapper px-0">
            <Header />
            <div className="main-panel">

                  <Outlet />
            <Footer />
            </div>
          </div>
        </div>
    );
}
export default Layout;