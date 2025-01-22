import React, { useState, useRef, useEffect } from "react";
import {
  uploadFileWithJson,
  updateFileWithJson,
  getRequest,
  putRequest,
} from "../../../../service/apiService.js";
import { AMENITIES, API_HOST, tableImage } from "../../../../config/apiConfig";
import Popup from "../../../../components/popup";

const Amenities = () => {
  const [formData, setFormData] = useState({
    amenityName: "",
    faIconClass: "",
    iconPath: null,
  });
  const [editAmenity, setEditAmenity] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [amenityData, setAmenityData] = useState([]);
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

  const fetchAmenityData = async () => {
    setLoading(true);
    try {
      const data = await getRequest(AMENITIES);
      if (data.status === 200 && Array.isArray(data.response)) {
        setAmenityData(data.response);
        setTotalPages(Math.ceil(data.response?.length / resultsPerPage));
      } else {
        console.error("Unexpected API response format:", data);
        setAmenityData([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching inclusion data:", error);
      setAmenityData([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAmenityData();
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

    if (!formData.amenityName || !formData.faIconClass) {
      showPopup("Please fill out all required fields.", "warning");
      return;
    }

    if (!formData.iconPath) {
      showPopup("Please upload an image.", "warning");
      return;
    }

    let json = {
      amenityName: formData.amenityName,
      faIconClass: formData.faIconClass,
    };

    try {
      const response = await uploadFileWithJson(
        `${AMENITIES}`,
        json,
        formData.iconPath
      );

      if (response.status === 200) {
        showPopup(
          response.message || "Amenity submitted successfully!",
          "success"
        );
        fetchAmenityData();
        setFormData({
          amenityName: "",
          faIconClass: "",
          iconPath: null,
        });
        setShowForm(false);
      } else {
        showPopup(
          response?.message ||
            "Failed to submit the Amenity. Please try again.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error submitting Amenity:", error);
      showPopup(
        error?.message || "An error occurred while submitting the Amenity.",
        "error"
      );
    }
  };

  const handleEdit = (item) => {
    setFormData({
      amenityName: item.amenityName,
      iconPath: item.iconPath,
      faIconClass: item.faIconClass,
    });
    setEditId(item.id);
    setEditMode(true);
    setShowForm(true);
  };

  const handleUpdateFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.amenityName || !formData.faIconClass) {
      showPopup("Please fill out all required fields.", "warning");
      return;
    }
    if (!formData.iconPath) {
      showPopup("Please upload an image.", "warning");
      return;
    }

    let json = {
      amenityName: formData.amenityName,
      faIconClass: formData.faIconClass,
    };

    console.log(json);

    try {
      const response = await updateFileWithJson(
        `${AMENITIES}/${editId}`,
        json,
        formData.iconPath
      );

      if (response.status === 200) {
        showPopup(
          response.message || "Amenity updated successfully!",
          "success"
        );
        fetchAmenityData();
        setFormData({
          amenityName: "",
          faIconClass: "",
          iconPath: null,
        });
        setShowForm(false);
        setEditMode(false);
        setEditId(null);
      } else {
        showPopup(
          response?.message ||
            "Failed to update the Amenity. Please try again.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error updating Amenity:", error);
      showPopup(
        error?.response?.message ||
          "An error occurred while updating the Amenity.",
        "error"
      );
    }
  };

  const handleStatusChange = (id, status, amenityName) => {
    setSelectedItem(id);
    setNewStatus(status);
    setItemName(amenityName);
    setShowConfirmation(true);
  };

  const confirmStatusChange = async (e) => {
    e.preventDefault();
    try {
      const status = newStatus ? "y" : "n";
      const response = await putRequest(
        `${AMENITIES}/status/${selectedItem}?status=${status}`
      );

      if (response.status === 200) {
        showPopup(
          response.message || "Status updated successfully!",
          "success"
        );
        fetchAmenityData();
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

  const filterAmenities = (amenities) => {
    if (!searchTerm.trim()) return amenities;
    return amenities.filter(
      (item) =>
        item.amenityName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.faIconClass?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.status?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredAmenities = filterAmenities(amenityData);
  const totalFilteredProducts = filteredAmenities?.length;
  const filteredTotalPages = Math.ceil(totalFilteredProducts / resultsPerPage);
  const indexOfLastAmenity = currentPage * resultsPerPage;
  const indexOfFirstAmenity = indexOfLastAmenity - resultsPerPage;
  const currentAmenity = filteredAmenities.slice(
    indexOfFirstAmenity,
    indexOfLastAmenity
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
              <h4 className="card-title">Amenities</h4>
              <div>
                {!showForm ? (
                  <>
                    <form class="d-inline-block serachform" role="search">
                      <div class="input-group searchinput">
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
                        <span class="input-group-text" id="search-icon">
                          <i class="mdi mdi-magnify"></i>
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
                      setEditAmenity(null);
                      setFormData({ name: "", icon: "", image: null });
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
                          <th>Icon</th>
                          <th>Icon Image</th>
                          <th>Action</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentAmenity?.length > 0 ? (
                          currentAmenity.map((item, index) => (
                            <tr key={item.id}>
                              <td>{indexOfFirstAmenity + index + 1}</td>
                              <td>{item.amenityName}</td>
                              <td>{item.faIconClass}</td>

                              <td className="border border-gray-300 px-4 py-2">
                                <div className="flex justify-center items-center">
                                  <img
                                    src={item.iconPath.replace(
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
                                        item.amenityName
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
                        {amenityData?.length}
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
                      <div className="form-group col-md-12">
                        <label>
                          Amenities Name <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="amenityName"
                          value={formData.amenityName}
                          onChange={handleChange}
                          placeholder="Enter Amenity Name"
                          required
                        />
                      </div>
                      <div className="form-group col-md-12">
                        <label>
                        Icon Only fa icons are allowed <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="faIconClass"
                          value={formData.faIconClass}
                          onChange={handleChange}
                          placeholder="Enter Amenity Icon"
                          required
                        />
                      </div>
                      <div className="form-group col-md-4">
                        <label htmlFor="iconPath">Icon Image</label>
                        <input
                          type="file"
                          className="form-control"
                          id="iconPath"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, "iconPath")}
                        />
                      </div>
                      <div className="form-group col-md-12 d-flex justify-content-end">
                        <button
                          type="submit"
                          className="btn btn-primary me-2"
                          disabled={!formData.amenityName}
                        >
                          {editMode ? "Save Changes" : "Submit"}
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => setShowForm(false)}
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

export default Amenities;
