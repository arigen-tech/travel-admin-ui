import React, { useState, useEffect } from "react";
import { GET_HOTEL_TYPE, HOTEL_TYPE } from "../../../../config/apiConfig";
import {
  getRequest,
  postRequest,
  putRequest,
} from "../../../../service/apiService";
import Popup from "../../../../components/popup";

const Package = () => {
  const [formData, setFormData] = useState({
    hotelTypeName: "",
    noOfStar: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [popup, setPopup] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hotelData, setHotelData] = useState([]);
  const [loading, setLoading] = useState(false);
  const resultsPerPage = 10;
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newStatus, setNewStatus] = useState(false);
  const [itemName, setItemName] = useState("");

  const fetchHotelData = async () => {
    setLoading(true);
    try {
      const data = await getRequest(GET_HOTEL_TYPE);
      if (data.status === 200 && Array.isArray(data.response)) {
        setHotelData(data.response);
        setTotalPages(Math.ceil(data.response.length / resultsPerPage));
      } else {
        console.error("Unexpected API response format:", data);
        setHotelData([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching hotel data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotelData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const showPopup = (message, type = "info") => {
    setPopupMessage({
      message,
      type,
      onClose: () => {
        setPopupMessage(null);
      },
    });
  };

  const handleCreateFormSubmit = async (e) => {
    e.preventDefault();

    if (formData.hotelTypeName && formData.noOfStar) {
      const newHotelType = {
        hotelTypeName: formData.hotelTypeName,
        noOfStar: formData.noOfStar,
      };

      try {
        const response = await postRequest(HOTEL_TYPE, newHotelType);

        if (response.status === 200) {
          showPopup(
            response.message || "HotelType added successfully!",
            "success"
          );
          setFormData({ hotelTypeName: "", noOfStar: "" });
          setShowForm(false);
          fetchHotelData();
        } else {
          showPopup(
            response.message || "Failed to add HotelType. Please try again.",
            "error"
          );
        }
      } catch (error) {
        console.error("Error adding HotelType:", error);
        showPopup(
          error.response?.message ||
            "An error occurred while adding the HotelType.",
          "error"
        );
      }
    } else {
      alert("Please fill out all required fields.");
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "search") {
      setSearchQuery(value);
    } else {
      setFormData((prevData) => ({ ...prevData, [id]: value }));
    }
  };

  const handleEdit = (item) => {
    setFormData({
      hotelTypeName: item.hotelTypeName,
      noOfStar: item.noOfStar,
    });
    setEditId(item.id);
    setEditMode(true);
    setShowForm(true);
  };

  const handleUpdateFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await putRequest(`${HOTEL_TYPE}/${editId}`, formData);
      if (response.status === 200) {
        showPopup(
          response?.message || "HotelType updated successfully!",
          "success"
        );
        fetchHotelData();
        setShowForm(false);
        setEditMode(false);
        setEditId(null);
        setFormData({ hotelTypeName: "", noOfStar: "" });
      } else {
        showPopup(
          response?.message || "Failed to update HotelType. Please try again.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error updating HotelType:", error);
      showPopup(
        error?.response?.message ||
          "An error occurred while updating the HotelType.",
        "error"
      );
    }
  };

  const handleStatusChange = (id, status, hotelTypeName) => {
    setSelectedItem(id);
    setNewStatus(status);
    setItemName(hotelTypeName);
    setShowConfirmation(true);
  };

  const confirmStatusChange = async (e) => {
    e.preventDefault();
    try {
      const status = newStatus ? "y" : "n";
      const response = await putRequest(
        `${HOTEL_TYPE}/status/${selectedItem}?status=${status}`
      );

      if (response.status === 200) {
        showPopup(
          response.message || "Status updated successfully!",
          "success"
        );
        fetchHotelData();
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

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < filteredTotalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const filterHotelType = (hotelTypes) => {
    if (!searchQuery.trim()) return hotelTypes;
  
    return hotelTypes.filter((item) => {
      const hotelTypeName = item.hotelTypeName?.toLowerCase() || "";
      const noOfStar = String(item.noOfStar || "").toLowerCase();
      const status = item.status?.toLowerCase() || "";
  
      return (
        hotelTypeName.includes(searchQuery.toLowerCase()) ||
        noOfStar.includes(searchQuery.toLowerCase()) ||
        status.includes(searchQuery.toLowerCase())
      );
    });
  };
  
  const filteredHotelTypes = filterHotelType(hotelData);
  const totalFilteredProducts = filteredHotelTypes.length;
  const filteredTotalPages = Math.ceil(totalFilteredProducts / resultsPerPage);
  const indexOfLastHotelType = currentPage * resultsPerPage;
  const indexOfFirstHotelType = indexOfLastHotelType - resultsPerPage;
  const currentHotelTypes = filteredHotelTypes.slice(
    indexOfFirstHotelType,
    indexOfLastHotelType
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
              <h4 className="card-title">Hotel Type</h4>
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
                          value={searchQuery}
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
                    onClick={() => setShowForm(false)}
                  >
                    <i className="mdi mdi-arrow-left"></i> Back
                  </button>
                )}
              </div>
            </div>
            <div className="card-body">
              {!showForm ? (
                <>
                  {loading ? (
                    <div>Loading...</div>
                  ) : (
                    <div className="table-responsive packagelist">
                      <table className="table table-bordered table-hover align-middle">
                        <thead className="table-light">
                          <tr>
                            <th>Sr. No.</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Edit</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentHotelTypes.length > 0 ? (
                            currentHotelTypes.map((item, index) => (
                              <tr key={item.id}>
                                <td>{indexOfFirstHotelType + index + 1}</td>
                                <td>{item.hotelTypeName}</td>
                                <td>{item.noOfStar}</td>
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
                                          item.hotelTypeName
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
                  )}
                  <nav className="d-flex justify-content-between align-items-center mt-3">
                    <div>
                      <span>
                        Page {currentPage} of {totalPages} | Total Products:{" "}
                        {hotelData.length}
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
                        editMode
                          ? handleUpdateFormSubmit
                          : handleCreateFormSubmit
                      }
                    >
                      <div className="form-group col-md-4">
                        <label htmlFor="hotelTypeName">
                          Hotel Type Name <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          className="form-control"
                          id="hotelTypeName"
                          placeholder="Hotel Type Name"
                          onChange={handleInputChange}
                          value={formData.hotelTypeName}
                        />
                      </div>
                      <div className="form-group col-md-4">
                      <label>
                          No. Of Star <span className="text-danger ">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          className="form-control"
                          id="noOfStar"
                          placeholder="No. of Star"
                          onChange={handleInputChange}
                          value={formData.noOfStar}
                        />
                      </div>
                      
                      <div className="form-group col-md-12 d-flex justify-content-end">
                        <button
                          type="submit"
                          className="btn btn-primary me-2"
                          disabled={!formData.hotelTypeName}
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

export default Package;
