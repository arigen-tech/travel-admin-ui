import React, { useState } from "react";
import "./package.css";
import MultiStep from "react-multistep";
import Overview from "../../../components/MultistepForm/Overview";
import Itinerary from "../../../components/MultistepForm/Itinerary";
import TourGallery from "../../../components/MultistepForm/TourGallery";
import PackagePolicy from "../../../components/MultistepForm/PackagePolicy";
import Inclusion from "../../../components/MultistepForm/Inclusion";
import Pricing from "../../../components/MultistepForm/Pricing";

const Package = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showMultiStep, setShowMultiStep] = useState(false);
  const totalPages = 3;
  const totalProducts = 12;
  const [isActive, setIsActive] = useState(true);


  const data =[
    {
      "id": 1,
      "packageCode": "BR000101",
      "name": "Ladakh",
      "daysNights": "7 Days, 6 Nights",
      "validFrom": "26-Dec-2024",
      "validTo": "31-Dec-2024",
      "isActive": true
    },
    {
      "id": 2,
      "packageCode": "BR000102",
      "name": "Manali",
      "daysNights": "5 Days, 4 Nights",
      "validFrom": "01-Jan-2025",
      "validTo": "10-Jan-2025",
      "isActive": false
    },
    {
      "id": 3,
      "packageCode": "BR000103",
      "name": "Goa",
      "daysNights": "4 Days, 3 Nights",
      "validFrom": "15-Feb-2025",
      "validTo": "20-Feb-2025",
      "isActive": true
    },
    {
      "id": 4,
      "packageCode": "BR000104",
      "name": "Kerala",
      "daysNights": "6 Days, 5 Nights",
      "validFrom": "10-Mar-2025",
      "validTo": "17-Mar-2025",
      "isActive": false
    },
    {
      "id": 5,
      "packageCode": "BR000105",
      "name": "Rajasthan",
      "daysNights": "8 Days, 7 Nights",
      "validFrom": "01-Apr-2025",
      "validTo": "10-Apr-2025",
      "isActive": true
    }
  ];
  

  const handleSwitchChange = (e) => {
    setIsActive(e.target.checked);
  };
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="content-wrapper">
      <div className="row">
        <div className="col-12 grid-margin stretch-card">
          <div className="card form-card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="card-title">Add New Package</h4>
              <div>
                {!showMultiStep ? (
                  <div className="d-flex align-items-center">
                    <form class="d-inline-block serachform" role="search">
                      <div class="input-group searchinput">
                        <input
                          type="search"
                          class="form-control"
                          placeholder="Search"
                          aria-label="Search"
                          aria-describedby="search-icon"
                        />
                        <span class="input-group-text" id="search-icon">
                          <i class="mdi mdi-magnify"></i>
                        </span>
                      </div>
                    </form>
                    <button
                      type="button"
                      className="btn btn-success me-2"
                      onClick={() => setShowMultiStep(true)} // Show MultiStep form
                    >
                      <i className="mdi mdi-plus"></i> Create
                    </button>
                    <button type="button" className="btn btn-warning me-2">
                      <i className="mdi mdi-restore"></i> Recover
                    </button>
                    <button type="button" className="btn btn-info">
                      <i className="mdi mdi-filter"></i> Filter
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowMultiStep(false)} // Hide MultiStep form
                  >
                    <i className="mdi mdi-arrow-left"></i> Back
                  </button>
                )}
              </div>
            </div>
            <div className="card-body multistep">
              {!showMultiStep ? (
                <>
                  <div className="table-responsive packagelist">
                    <table className="table table-bordered table-hover align-middle">
                      <thead className="table-light">
                        <tr>
                          <th>S.No.</th>
                          <th>Package Code</th>
                          <th>Name</th>
                          <th>Days/Nights</th>
                          <th>Valid From</th>
                          <th>Valid To</th>
                          <th>Action</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((item, index) => (
                          <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.packageCode}</td>
                            <td>{item.name}</td>
                            <td>{item.daysNights}</td>
                            <td>{item.validFrom}</td>
                            <td>{item.validTo}</td>
                            <td>
                              <button className="btn btn-sm btn-outline-secondary">
                                ...
                              </button>
                            </td>
                            <td>
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={item.isActive}
                                  onChange={() => handleSwitchChange(item.id)}
                                />
                                <label className="form-check-label px-0">
                                  {item.isActive ? "Active" : "Deactivated"}
                                </label>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <nav className="d-flex justify-content-between align-items-center mt-3">
                    <div>
                      <span>
                        Page {currentPage} of {totalPages} | Total Products:{" "}
                        {totalProducts}
                      </span>
                    </div>
                    <ul className="pagination mb-0">
                      <li
                        className={`page-item ${
                          currentPage === 1 ? "disabled" : ""
                        }`}
                      >
                        <button className="page-link" onClick={handlePrevious}>
                          &laquo;
                        </button>
                      </li>
                      {[...Array(totalPages)].map((_, index) => (
                        <li
                          className={`page-item ${
                            currentPage === index + 1 ? "active" : ""
                          }`}
                          key={index}
                        >
                          <button
                            className="page-link"
                            onClick={() => setCurrentPage(index + 1)}
                          >
                            {index + 1}
                          </button>
                        </li>
                      ))}
                      <li
                        className={`page-item ${
                          currentPage === totalPages ? "disabled" : ""
                        }`}
                      >
                        <button className="page-link" onClick={handleNext}>
                          &raquo;
                        </button>
                      </li>
                    </ul>
                  </nav>
                </>
              ) : (
                <MultiStep
                  title="Order Workflow"
                  className="multistepform"
                  activeStep={0}
                  prevButton={{
                    title: (
                      <>
                        <i className="mdi mdi-arrow-left"></i> Back
                      </>
                    ),
                  }}
                  nextButton={{
                    title: (
                      <>
                        Save & Continue <i className="mdi mdi-arrow-right"></i>
                      </>
                    ),
                  }}
                >
                  <Overview title="Overview" />
                  <Itinerary title="Itinerary" />
                  <TourGallery title="TourGallery" />
                  <PackagePolicy title="PackagePolicy" />
                  <Inclusion title="Inclusion" />
                  <Pricing title="Pricing" />
                </MultiStep>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Package;
