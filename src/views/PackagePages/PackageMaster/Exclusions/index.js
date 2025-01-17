import React, { useState, useRef, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import {
  getRequest,
  postRequest,
  putRequest,
} from "../../../../service/apiService";
import { EXCLUSION } from "../../../../config/apiConfig";
import Popup from "../../../../components/popup";

const Exclusions = () => {
  const [formData, setFormData] = useState({
    exclusionName: "",
    exclusionDescription: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [popupMessage, setPopupMessage] = useState(null);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [exclusionData, setExclusionData] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemName, setItemName] = useState("");
  const [newStatus, setNewStatus] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const exclusionRef = useRef(null);
  const editorRef = useRef(null);
  const resultsPerPage = 3;

  const fetchExclusionData = async () => {
    setLoading(true);
    const GETALL = "/masterController/getAllExclusions";
    try {
      const data = await getRequest(GETALL);
      if (data.status === 200 && Array.isArray(data.response)) {
        setExclusionData(data.response);
      } else {
        console.error("Unexpected API response format:", data);
        setExclusionData([]);
      }
    } catch (error) {
      console.error("Error fetching exclusion data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExclusionData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const showPopup = (message, type = "info") => {
    setPopupMessage({
      message,
      type,
      onClose: () => {
        setPopupMessage(null);
        window.location.reload();
      },
    });
  };

  const handleCreateFormSubmit = async (e) => {
    e.preventDefault();
    if (formData.exclusionName && formData.exclusionDescription) {
      try {
        const response = await postRequest(EXCLUSION, formData);
        if (response.status === 200) {
          showPopup(
            response.message || "Exclusion added successfully!",
            "success"
          );
          setFormData({ exclusionName: "", exclusionDescription: "" });
          setShowForm(false);
          fetchExclusionData();
        } else {
          showPopup(
            response.message || "Failed to add exclusion. Please try again.",
            "error"
          );
        }
      } catch (error) {
        console.error("Error adding exclusion:", error);
        showPopup(
          error.response?.message ||
            "An error occurred while adding the exclusion.",
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
      setSearchTerm(value);
    } else {
      setFormData((prevData) => ({ ...prevData, [id]: value }));
    }
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setFormData((prevData) => ({ ...prevData, exclusionDescription: data }));
  };

  const handleEdit = (item) => {
    setFormData({
      exclusionName: item.exclusionName,
      exclusionDescription: item.exclusionDescription,
    });
    setEditId(item.id);
    setEditMode(true);
    setShowForm(true);
  };

  const handleUpdateFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await putRequest(`${EXCLUSION}/${editId}`, formData);
      if (response.status === 200) {
        showPopup(
          response?.message || "Exclusion updated successfully!",
          "success"
        );
        fetchExclusionData();
        setShowForm(false);
        setEditMode(false);
        setEditId(null);
        setFormData({ exclusionName: "", exclusionDescription: "" });
      } else {
        showPopup(
          response?.message || "Failed to update exclusion. Please try again.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error updating exclusion:", error);
      showPopup(
        error?.response?.message ||
          "An error occurred while updating the exclusion.",
        "error"
      );
    }
  };

  const handleStatusChange = (id, status, exclusionName) => {
    setSelectedItem(id);
    setNewStatus(status);
    setItemName(exclusionName);
    setShowConfirmation(true);
  };

  const confirmStatusChange = async (e) => {
    e.preventDefault();
    try {
      const status = newStatus ? "y" : "n";
      const response = await putRequest(
        `${EXCLUSION}/status/${selectedItem}?status=${status}`
      );
      if (response.status === 200) {
        showPopup(
          response.message || "Status updated successfully!",
          "success"
        );
        fetchExclusionData();
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

  const filterExclusions = (exclusions) => {
    if (!searchTerm.trim()) return exclusions; 
    return exclusions.filter((item) =>
      item.exclusionName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.exclusionDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredExclusions = filterExclusions(exclusionData);
  const totalFilteredProducts = filteredExclusions.length;
  const filteredTotalPages = Math.ceil(totalFilteredProducts / resultsPerPage);
  const indexOfLastExclusion = currentPage * resultsPerPage;
  const indexOfFirstExclusion = indexOfLastExclusion - resultsPerPage;
  const currentExclusions = filteredExclusions.slice(
    indexOfFirstExclusion,
    indexOfLastExclusion
  );

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
              <h4 className="card-title">Exclusions</h4>
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
                        {currentExclusions.length > 0 ? (
                          currentExclusions.map((item, index) => (
                            <tr key={item.id}>
                              <td>{indexOfFirstExclusion + index + 1}</td>
                              <td>{item.exclusionName}</td>
                              <td
                                dangerouslySetInnerHTML={{
                                  __html: item.exclusionDescription,
                                }}
                              ></td>
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
                                        item.exclusionName
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
                        Page {currentPage} of {filteredTotalPages} | Total
                        Records: {totalFilteredProducts}
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
                      {[...Array(filteredTotalPages)].map((_, index) => (
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
                          currentPage === filteredTotalPages ? "disabled" : ""
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
                        <label htmlFor="exclusionName">Exclusion Name <span className="text-danger">*</span></label>
                        <input
                          type="text"
                          required
                          className="form-control"
                          id="exclusionName"
                          placeholder="Exclusion Name"
                          onChange={handleInputChange}
                          value={formData.exclusionName}
                        />
                      </div>

                      <div className="form-group col-md-12">
                        <label htmlFor="Exclusion-editor">
                          Exclusion Description
                        </label>
                        <div ref={exclusionRef}></div>
                        <CKEditor
                          editor={DecoupledEditor}
                          data={formData.exclusionDescription}
                          config={{
                            toolbar: { shouldNotGroupWhenFull: true },
                            alignment: {
                              options: ["left", "center", "right", "justify"],
                            },
                            table: {
                              contentToolbar: [
                                "tableColumn",
                                "tableRow",
                                "mergeTableCells",
                                "tableProperties",
                                "tableCellProperties",
                              ],
                            },
                          }}
                          onReady={(editor) => {
                            editorRef.current = editor;

                            const toolbarContainer = exclusionRef.current;
                            toolbarContainer.innerHTML = "";
                            toolbarContainer.appendChild(
                              editor.ui.view.toolbar.element
                            );

                            editor.editing.view.change((writer) => {
                              writer.setStyle(
                                "min-height",
                                "100px",
                                editor.editing.view.document.getRoot()
                              );
                            });
                          }}
                          onChange={handleEditorChange}
                        />
                      </div>

                      <div className="form-group col-md-12 d-flex justify-content-end">
                        <button type="submit" className="btn btn-primary me-2" disabled={!formData.exclusionName}>
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
                  <strong>{newStatus ? "Activate" : "Deactivate"}</strong> To <strong>{itemName}</strong> ?
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

export default Exclusions;
