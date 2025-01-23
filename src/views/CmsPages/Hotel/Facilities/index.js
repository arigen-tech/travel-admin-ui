import React, { useState, useRef, useEffect } from "react";
import {
  uploadFileWithJson,
  updateFileWithJson,
  getRequest,
  putRequest,
} from "../../../../service/apiService.js";
import { FACILITY, API_HOST, tableImage } from "../../../../config/apiConfig";
import Popup from "../../../../components/popup";

const Facilities = () => {
  const [formData, setFormData] = useState({
    facilityName: "",
    faIconClass: "",
    categoryId: null,
    catImage: null,
  });
  const [editFacility, setEditFacility] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [facilityData, setFacilityData] = useState([]);
  const [facilityCategoryData, setFacilityCategoryData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [newStatus, setNewStatus] = useState(false);
  const [itemName, setItemName] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [popup, setPopup] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const editorRef = useRef(null);
  const totalProducts = 20;
  const resultsPerPage = 10;

  const showPopup = (message, type = "info") => {
    setPopupMessage({
      message,
      type,
      onClose: () => {
        setPopupMessage(null);
      },
    });
  };

  const fetchFacilityData = async () => {
    setLoading(true);
    try {
      const data = await getRequest(FACILITY);
      if (data.status === 200 && Array.isArray(data.response)) {
        setFacilityData(data.response);
        console.log(data.response);
        setTotalPages(Math.ceil(data.response?.length / resultsPerPage));
      } else {
        console.error("Unexpected API response format:", data);
        setFacilityData([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching inclusion data:", error);
      setFacilityData([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  const fetchFacilityCategoryData = async () => {
    setLoading(true);

    const GETALL = "/masterController/getAllActiveHotelFacilitiesCat";

    try {
      const data = await getRequest(GETALL);
      if (data.status === 200 && Array.isArray(data.response)) {
        setFacilityCategoryData(data.response);
        setTotalPages(Math.ceil(data.response.length / resultsPerPage));
      } else {
        console.error("Unexpected API response format:", data);
        setFacilityCategoryData([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching category data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFacilityData();
    fetchFacilityCategoryData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.facilityName ||
      !formData.faIconClass ||
      !formData.categoryId
    ) {
      showPopup("Please fill out all required fields.", "warning");
      return;
    }

    if (!formData.catImage) {
      showPopup("Please upload an image.", "warning");
      return;
    }

    let json = {
      categoryId: formData.categoryId,
      facilityName: formData.facilityName,
      faIconClass: formData.faIconClass,
    };
    console.log(json);

    try {
      const response = await uploadFileWithJson(
        `${FACILITY}`,
        json,
        formData.catImage
      );

      if (response.status === 200) {
        showPopup(
          response.message || "Facility submitted successfully!",
          "success"
        );
        fetchFacilityData();
        setFormData({
          facilityName: "",
          faIconClass: "",
          categoryId: null,
          catImage: null,
        });
        setShowForm(false);
      } else {
        showPopup(
          response?.message ||
            "Failed to submit the Facility. Please try again.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error submitting Facility:", error);
      showPopup(
        error?.message || "An error occurred while submitting the Facility.",
        "error"
      );
    }
  };

  const handleEdit = (item) => {
    setFormData({
      facilityName: item.facilityName,
      categoryId: item?.category?.id,
      catImage: item.catImage,
      faIconClass: item.faIconClass,
    });
    setEditId(item.id);
    setEditMode(true);
    setShowForm(true);
  };

  const handleUpdateFormSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.facilityName ||
      !formData.faIconClass ||
      !formData.categoryId
    ) {
      showPopup("Please fill out all required fields.", "warning");
      return;
    }
    if (!formData.catImage) {
      showPopup("Please upload an image.", "warning");
      return;
    }

    let json = {
      facilityName: formData.facilityName,
      faIconClass: formData.faIconClass,
      categoryId: formData.categoryId,
    };

    console.log(json);

    try {
      const response = await updateFileWithJson(
        `${FACILITY}/${editId}`,
        json,
        formData.catImage
      );

      if (response.status === 200) {
        showPopup(
          response.message || "Facility updated successfully!",
          "success"
        );
        fetchFacilityData();
        setFormData({
          facilityName: "",
          faIconClass: "",
          categoryId: null,
          catImage: null,
        });
        setShowForm(false);
        setEditMode(false);
        setEditId(null);
      } else {
        showPopup(
          response?.message ||
            "Failed to update the Facility. Please try again.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error updating Facility:", error);
      showPopup(
        error?.response?.message ||
          "An error occurred while updating the Facility.",
        "error"
      );
    }
  };

  const handleStatusChange = (id, status, facilityName) => {
    setSelectedItem(id);
    setNewStatus(status);
    setItemName(facilityName);
    setShowConfirmation(true);
  };

  const confirmStatusChange = async (e) => {
    e.preventDefault();
    if (!selectedItem) {
      showPopup("Invalid facility selected. Please try again.", "error");
      return;
    }
    try {
      const status = newStatus ? "y" : "n";
      const response = await putRequest(
        `${FACILITY}/status/${selectedItem}?status=${status}`
      );
  
      if (response.status === 200) {
        showPopup(
          response.message || "Status updated successfully!",
          "success"
        );
        fetchFacilityData();
        setShowConfirmation(false);
        setSelectedItem(null);
        setNewStatus(false);
      } else {
        showPopup(
          response?.message || "Failed to update status. Please try again.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
      showPopup(
        error?.response?.message ||
          "An error occurred while updating the status.",
        "error"
      );
    }
  };
  

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "search") {
      setSearchTerm(value);
    } else {
      setFormData((prevData) => ({ ...prevData, [id]: value }));
    }
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        [field]: file,
      }));
    }
  };

  const handleCategoryChange = (categoryId) => {
    setFormData((prevState) => ({
      ...prevState,
      categoryId: categoryId,
    }));
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

  const filterFacilities = (Facilities) => {
    if (!searchTerm.trim()) return Facilities;
    return Facilities.filter(
      (item) =>
        item.facilityName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.faIconClass?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.status?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredFacilities = filterFacilities(facilityData);
  const totalFilteredProducts = filteredFacilities?.length;
  const filteredTotalPages = Math.ceil(totalFilteredProducts / resultsPerPage);
  const indexOfLastFacility = currentPage * resultsPerPage;
  const indexOfFirstFacility = indexOfLastFacility - resultsPerPage;
  const currentFacility = filteredFacilities.slice(
    indexOfFirstFacility,
    indexOfLastFacility
  );

  return (
    <div className="content-wrapper">
      <div className="row">
        <div className="col-12 grid-margin stretch-card">
          {popupMessage && (
            <Popup
              message={popupMessage.message}
              type={popupMessage.type}
              onClose={popupMessage.onClose}
            />
          )}
          <div className="card form-card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="card-title">Facilities</h4>
              <div>
                {!showForm ? (
                  <>
                    <form className="d-inline-block serachform" role="search">
                      <div className="input-group searchinput">
                        <input
                          type="search"
                          className="form-control"
                          placeholder="Search"
                          aria-label="Search"
                          aria-describedby="search-icon"
                          id="search"
                          value={searchTerm}
                          onChange={handleInputChange}
                        />
                        <span className="input-group-text" id="search-icon">
                          <i className="mdi mdi-magnify"></i>
                        </span>
                      </div>
                    </form>
                    <button
                      type="button"
                      className="btn btn-success me-2"
                      onClick={() => setShowForm(true)}
                    >
                      <i className="mdi mdi-plus"></i> Create
                    </button>
                    <button type="button" className="btn btn-warning me-2">
                      <i className="mdi mdi-restore"></i> Refresh
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowForm(false);
                      setEditFacility(null); // Reset editing state
                    }}
                  >
                    <i className="mdi mdi-arrow-left"></i> Back
                  </button>
                )}
              </div>
            </div>
            <div className="card-body">
              {!showForm ? (
                <>
                  <div className="table-responsive packagelist">
                    <table className="table table-bordered table-hover align-middle">
                      <thead className="table-light">
                        <tr>
                          <th>S.No.</th>
                          <th>Name</th>
                          <th>Category</th>
                          <th>Icon Name</th>
                          <th>Icon</th>
                          <th>Edit</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentFacility?.length > 0 ? (
                          currentFacility.map((item, index) => (
                            <tr key={item.id}>
                              <td>{indexOfFirstFacility + index + 1}</td>
                              <td>{item.facilityName}</td>
                              <td>{item?.category?.categoryName}</td>
                              <td>{item?.faIconClass}</td>
                              <td className="border border-gray-300 px-4 py-2">
                                <div className="flex justify-center items-center">
                                  <img
                                    src={item.catImage.replace(
                                      `${tableImage}`,
                                      `${API_HOST}/`
                                    )}
                                    alt="Banner"
                                    className="w-40 h-24 object-cover rounded shadow-md"
                                  />
                                </div>
                              </td>

                              <td>
                                <button
                                  className={`btn btn-sm btn-success me-2 ${
                                    item.status === "n" ? "disabled" : ""
                                  }`}
                                  disabled={item.status === "n"}
                                  onClick={() => {
                                    if (item.status === "y") {
                                      handleEdit(item);
                                    }
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
                                    onChange={() =>
                                      handleStatusChange(
                                        item.id,
                                        item.status !== "y",
                                        item.facilityName
                                      )
                                    }
                                  />
                                  <label className="form-check-label px-0">
                                    {item.status === "y"
                                      ? "Active"
                                      : "Deactivated"}
                                  </label>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5" className="text-center">
                              No matching records found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <nav className="d-flex justify-content-between align-items-center mt-3">
                    <div>
                      <span>
                        Page {currentPage} of {totalPages} | Total Records:{" "}
                        {facilityData?.length}
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
                <>
                  {showForm && (
                    <form
                      className="forms row"
                      onSubmit={
                        editMode ? handleUpdateFormSubmit : handleSubmit
                      }
                    >
                      <div className="form-group col-md-12 position-relative">
                        <div
                          className="form-group position-relative"
                          style={{ position: "relative" }}
                        >
                          <label className="form-label">Category Type</label>
                          <div style={{ position: "relative" }}>
                            <select
                              className="form-select"
                              style={{ paddingRight: "40px" }}
                              value={formData.categoryId}
                              onChange={(e) =>
                                handleCategoryChange(
                                  parseInt(e.target.value, 10)
                                )
                              }
                              disabled={loading}
                            >
                              <option value="">Select Category Type</option>
                              {facilityCategoryData.map((category) => (
                                <option key={category.id} value={category.id}>
                                  {category.categoryName}
                                </option>
                              ))}
                            </select>

                            {loading && <p>Loading categories...</p>}
                            {/* <button
                              type="button"
                              onClick={() => setShowModal(true)}
                              className="btn btn-success ms-2 position-absolute d-flex justify-content-center align-items-center"
                              style={{
                                top: "34%",
                                right: "0px",
                                width: "26px",
                                height: "25px",
                                transform: "translateY(-50%)",
                                zIndex: 999,
                              }}
                            >
                              <i className="mdi mdi-plus"></i>
                            </button> */}
                          </div>
                        </div>
                      </div>
                      <div className="form-group col-md-12">
                        <div className="form-group col-md-12">
                          <label>
                            Facilities Name{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="facilityName"
                            value={formData.facilityName}
                            onChange={handleChange}
                            placeholder="Enter Facilities Name"
                            required
                          />
                        </div>
                        <label>
                          con Only MUI icons are allowed{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="faIconClass"
                          value={formData.faIconClass}
                          onChange={handleChange}
                          placeholder="Enter Facilities Icon"
                          required
                        />
                      </div>

                      <div className="form-group col-md-4">
                        <label htmlFor="catImage">Icon Image</label>
                        <input
                          type="file"
                          className="form-control"
                          id="catImage"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, "catImage")}
                        />
                      </div>
                      <div className="form-group col-md-12 d-flex justify-content-end">
                        <button
                          type="submit"
                          className="btn btn-primary me-2"
                          disabled={
                            !formData.facilityName && formData.categoryId
                          }
                        >
                          {editFacility ? "Update" : "Save"}
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => {
                            setShowForm(false);
                            setEditFacility(null);
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* {showModal && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Category</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <input
                    type="text"
                    className="form-control"
                    value={categoryInput}
                    onChange={(e) => setCategoryInput(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">fa fa icon</label>
                  <input
                    type="text"
                    className="form-control"
                    value={iconInput}
                    onChange={(e) => setIconInput(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSaveCategory}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )} */}

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

export default Facilities;
