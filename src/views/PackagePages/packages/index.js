import React, { useState, useEffect, useRef } from "react";
import "./package.css";
import MultiStep from "react-multistep";
import Overview from "../../../components/MultistepForm/Overview";
import Itinerary from "../../../components/MultistepForm/Itinerary";
import TourGallery from "../../../components/MultistepForm/TourGallery";
import PackagePolicy from "../../../components/MultistepForm/PackagePolicy";
import Inclusion from "../../../components/MultistepForm/Inclusion";
import Pricing from "../../../components/MultistepForm/Pricing";
import { getRequest, putRequest } from "../../../service/apiService.js";
import { PACKAGE } from "../../../config/apiConfig";
import Popup from "../../../components/popup/index";

const Package = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showMultiStep, setShowMultiStep] = useState(false);
  const [totalProducts, setTotalProducts] = useState(12);
  const [isActive, setIsActive] = useState(true);
  const [activeStatusChange, setActiveStatusChange] = useState(false);
  const [activeFormEdit, setActiveFormEdit] = useState(false);
  const [packageData, setPackageData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [popupMessage, setPopupMessage] = useState(null);
  const [editId, setEditId] = useState(null);
  const [newStatus, setNewStatus] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [itemName, setItemName] = useState("");
  const [newPackageId, setNewPackageId] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const resultsPerPage = 10;

  // References for each step component
  const overviewRef = useRef(null);
  const itineraryRef = useRef(null);
  const tourGalleryRef = useRef(null);
  const packagePolicyRef = useRef(null);
  const inclusionRef = useRef(null);
  const pricingRef = useRef(null);

  const showPopup = (message, type = "info") => {
    setPopupMessage({
      message,
      type,
      onClose: () => {
        setPopupMessage(null);
        if (type === "success") {
          window.location.reload();
        }
      },
    });
  };

  const handleNextStep = async () => {
    const stepRefs = {
      0: overviewRef,
      1: itineraryRef,
      2: tourGalleryRef,
      3: packagePolicyRef,
      4: inclusionRef,
      5: pricingRef
    };

    try {
      setLoading(true);
      const currentRef = stepRefs[currentStep];
      
      if (currentRef?.current?.handleSubmit) {
        try {
          const result = await currentRef.current.handleSubmit();
          if (result !== false) {
            setCurrentStep(prev => prev + 1);
            return true;
          }
          return false;
        } catch (error) {
          console.error("Form submission error:", error);
          showPopup(error.message || "An error occurred during submission", "error");
          return false;
        }
      } else {
        setCurrentStep(prev => prev + 1);
        return true;
      }
    } catch (error) {
      console.error("Step handling error:", error);
      showPopup("An error occurred while processing the step", "error");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handlePackageIdUpdate = (newId) => {
    setNewPackageId(newId);
    console.log("Received package ID in Parent:", newId);
  };

  const fetchPackageData = async () => {
    setLoading(true);
    try {
      const data = await getRequest(PACKAGE);
      if (data.status === 200 && Array.isArray(data.response)) {
        setPackageData(data.response);
        setTotalPages(Math.ceil(data.response.length / resultsPerPage));
        setTotalProducts(data.response.length);
      } else {
        console.error("Unexpected API response format:", data);
        setPackageData([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching Package data:", error);
      showPopup("Failed to fetch package data", "error");
      setPackageData([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackageData();
  }, []);

  const handleStatusChange = async (id, status, pkgName) => {
    setSelectedItem(id);
    setEditId(id);
    setNewStatus(status);
    setItemName(pkgName);
    setShowConfirmation(true);
  };

  const confirmStatusChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const status = newStatus ? "y" : "n";
      const response = await putRequest(
        `${PACKAGE}/status/${selectedItem}?status=${status}`
      );

      if (response.status === 200) {
        showPopup("Status updated successfully!", "success");
        await fetchPackageData();
        setShowConfirmation(false);
        setSelectedItem(null);
        setNewStatus(false);
      } else {
        showPopup(response?.message || "Failed to update status", "error");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      showPopup("An error occurred while updating the status", "error");
    } finally {
      setLoading(false);
    }
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

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    return packageData.slice(startIndex, endIndex);
  };

  return (
    <div className="content-wrapper">
      <div className="row">
        <div className="col-12 grid-margin stretch-card">
          <div className="card form-card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="card-title">
                {activeFormEdit ? "Update Package" : "Add New Package"}
              </h4>

              <div>
                {!showMultiStep && !activeFormEdit ? (
                  <div className="d-flex align-items-center">
                    <form className="d-inline-block serachform" role="search">
                      <div className="input-group searchinput">
                        <input
                          type="search"
                          className="form-control"
                          placeholder="Search"
                          aria-label="Search"
                        />
                        <span className="input-group-text">
                          <i className="mdi mdi-magnify"></i>
                        </span>
                      </div>
                    </form>
                    <button
                      type="button"
                      className="btn btn-success me-2"
                      onClick={() => setShowMultiStep(true)}
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
                    onClick={() => {
                      setShowMultiStep(false);
                      setActiveFormEdit(false);
                      setCurrentStep(0);
                    }}
                  >
                    <i className="mdi mdi-arrow-left"></i> Back
                  </button>
                )}
              </div>
            </div>

            <div className="card-body multistep">
              {!showMultiStep && !activeFormEdit ? (
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
                      {loading ? (
                        <tr>
                          <td colSpan="8" className="text-center">Loading...</td>
                        </tr>
                      ) : getPaginatedData().map((item, index) => (
                        <tr key={item.id}>
                          <td>{(currentPage - 1) * resultsPerPage + index + 1}</td>
                          <td>{item.pkgCode}</td>
                          <td>{item.pkgName}</td>
                          <td>{item.daysNights}</td>
                          <td>{new Date(item.validFrom).toLocaleDateString()}</td>
                          <td>{new Date(item.validTo).toLocaleDateString()}</td>
                          <td>
                            <button
                              className={`btn btn-sm btn-success me-2 ${
                                item.status === "n" ? "disabled" : ""
                              }`}
                              disabled={item.status === "n"}
                              onClick={() => {
                                setActiveFormEdit(true);
                                setSelectedItem(item);
                                setShowMultiStep(true);
                              }}
                            >
                              <i className="mdi mdi-square-edit-outline"></i>
                            </button>
                          </td>
                          <td>
                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={item.status === "y"}
                                onChange={() => handleStatusChange(
                                  item.id,
                                  item.status !== "y",
                                  item.pkgName
                                )}
                              />
                              <label className="form-check-label">
                                {item.status === "y" ? "Active" : "Deactivated"}
                              </label>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <nav className="d-flex justify-content-between align-items-center mt-3">
                    <div>
                      <span>
                        Page {currentPage} of {totalPages} | Total Products: {totalProducts}
                      </span>
                    </div>
                    <ul className="pagination mb-0">
                      <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <button className="page-link" onClick={handlePrevious}>
                          &laquo;
                        </button>
                      </li>
                      {[...Array(totalPages)].map((_, index) => (
                        <li
                          key={index}
                          className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                        >
                          <button
                            className="page-link"
                            onClick={() => setCurrentPage(index + 1)}
                          >
                            {index + 1}
                          </button>
                        </li>
                      ))}
                      <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                        <button className="page-link" onClick={handleNext}>
                          &raquo;
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              ) : (
                <MultiStep
                  title="Package Creation Workflow"
                  className="multistepform"
                  activeStep={currentStep}
                  prevButton={{
                    title: (
                      <>
                        <i className="mdi mdi-arrow-left"></i> Back
                      </>
                    ),
                    onClick: () => setCurrentStep(prev => Math.max(0, prev - 1))
                  }}
                  nextButton={{
                    title: (
                      <>
                        {loading ? (
                          <span>Processing...</span>
                        ) : (
                          <>Save & Continue <i className="mdi mdi-arrow-right"></i></>
                        )}
                      </>
                    ),
                    onClick: handleNextStep,
                    disabled: loading
                  }}
                >
                  <Overview
                    title="Overview"
                    item={selectedItem}
                    id={editId}
                    onPackageIdUpdate={handlePackageIdUpdate}
                    ref={overviewRef}
                    isActive={currentStep === 0}
                  />
                  <Itinerary
                    title="Itinerary"
                    item={selectedItem}
                    id={editId}
                    newPackageId={newPackageId}
                    ref={itineraryRef}
                    isActive={currentStep === 1}
                  />
                  <TourGallery
                    title="Tour Gallery"
                    item={selectedItem}
                    id={editId}
                    newPackageId={newPackageId}
                    ref={tourGalleryRef}
                    isActive={currentStep === 2}
                  />
                  <PackagePolicy
                    title="Package Policy"
                    item={selectedItem}
                    id={editId}
                    newPackageId={newPackageId}
                    ref={packagePolicyRef}
                    isActive={currentStep === 3}
                  />
                  <Inclusion
                    title="Inclusion"
                    item={selectedItem}
                    id={editId}
                    newPackageId={newPackageId}
                    ref={inclusionRef}
                    isActive={currentStep === 4}
                  />
                  <Pricing
                    title="Pricing"
                    item={selectedItem}
                    id={editId}
                    newPackageId={newPackageId}
                    ref={pricingRef}
                    isActive={currentStep === 5}
                  />
                </MultiStep>
              )}
            </div>
          </div>
        </div>
      </div>
      {showConfirmation && (
        <div className="modal d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Status Change</h5>
              </div>
              <div className="modal-body">
                <p className="text-lg mb-4 text-center">
                  Are you sure you want to{" "}
                  <strong>{newStatus ? "Activate" : "Deactivate"}</strong> To{" "}
                  <strong>{itemName}</strong> ?
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowConfirmation(false)}
                >
                  No
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={confirmStatusChange}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Package;
