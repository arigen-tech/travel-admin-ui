import React, { useState, useRef, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import {
  getRequest,
  postRequest,
  putRequest,
} from "../../../../service/apiService";
import { POLICY } from "../../../../config/apiConfig";
import Popup from "../../../../components/popup";

const Policy = () => {
  const [formData, setFormData] = useState({
    policyName: "",
    policyDescription: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [popup, setPopup] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [policyData, setPolicyData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newStatus, setNewStatus] = useState(false);
  const [itemName, setItemName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const policyRef = useRef(null);
  const editorRef = useRef(null);
  const resultsPerPage = 10;

  const fetchPolicyData = async () => {
    setLoading(true);

    const GETALL = "/masterController/getAllPolicies";

    try {
      const data = await getRequest(GETALL);
      if (data.status === 200 && Array.isArray(data.response)) {
        setPolicyData(data.response);
        setTotalPages(Math.ceil(data.response.length / resultsPerPage));
      } else {
        console.error("Unexpected API response format:", data);
        setPolicyData([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching Policy data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolicyData();
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

    if (formData.policyName && formData.policyDescription) {
      const newPolicyType = {
        policyName: formData.policyName,
        policyDescription: formData.policyName,
      };

      try {
        const response = await postRequest(POLICY, newPolicyType);

        if (response.status === 200) {
          showPopup(
            response.message || "Policy added successfully!",
            "success"
          );
          setFormData({ policyName: "", policyDescription: "" });
          setShowForm(false);
          fetchPolicyData();
        } else {
          showPopup(
            response.message || "Failed to add Policy. Please try again.",
            "error"
          );
        }
      } catch (error) {
        console.error("Error adding Policy:", error);
        showPopup(
          error.response?.message ||
            "An error occurred while adding the Policy.",
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
    setFormData((prevData) => ({ ...prevData, policyDescription: data }));
  };

  const handleEdit = (item) => {
    setFormData({
      policyName: item.policyName,
      policyDescription: item.policyDescription,
    });
    setEditId(item.id);
    setEditMode(true);
    setShowForm(true);
  };

  const handleUpdateFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await putRequest(`${POLICY}/${editId}`, formData);
      if (response.status === 200) {
        showPopup(
          response?.message || "Policy updated successfully!",
          "success"
        );
        fetchPolicyData();
        setShowForm(false);
        setEditMode(false);
        setEditId(null);
        setFormData({ policyName: "", policyDescription: "" });
      } else {
        showPopup(
          response?.message || "Policy to update inclusion. Please try again.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error updating Policy:", error);
      showPopup(
        error?.response?.message ||
          "An error occurred while updating the Policy.",
        "error"
      );
    }
  };

  const handleStatusChange = (id, status, policyName) => {
    setSelectedItem(id);
    setNewStatus(status);
    setItemName(policyName);
    setShowConfirmation(true);
  };

  const confirmStatusChange = async (e) => {
    e.preventDefault();
    try {
      const status = newStatus ? "y" : "n";
      const response = await putRequest(
        `${POLICY}/status/${selectedItem}?status=${status}`
      );

      if (response.status === 200) {
        showPopup(
          response.message || "Status updated successfully!",
          "success"
        );
        fetchPolicyData();
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

  const filterPolicies = (policies) => {
    if (!searchTerm.trim()) return policies;
    return policies.filter(
      (item) =>
        item.policyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.policyDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.status?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredPolicies = filterPolicies(policyData);
  const totalFilteredProducts = filteredPolicies.length;
  const filteredTotalPages = Math.ceil(totalFilteredProducts / resultsPerPage);
  const indexOfLastInclusion = currentPage * resultsPerPage;
  const indexOfFirstInclusion = indexOfLastInclusion - resultsPerPage;
  const currentPolicies = filteredPolicies.slice(
    indexOfFirstInclusion,
    indexOfLastInclusion
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
              <h4 className="card-title">Policy</h4>
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
                        {currentPolicies.length > 0 ? (
                          currentPolicies.map((item, index) => (
                            <tr key={item.id}>
                              <td>{indexOfFirstInclusion + index + 1}</td>
                              <td>{item.policyName}</td>
                              <td
                                dangerouslySetInnerHTML={{
                                  __html: item.policyDescription,
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
                                        item.policyName
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
                        Page {currentPage} of {totalPages} | Total Products:{" "}
                        {/* {totalProducts} */}
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
                        <label htmlFor="policyName">Policy Name</label>
                        <input
                          type="text"
                          required
                          className="form-control"
                          id="policyName"
                          placeholder="Policy Name"
                          onChange={handleInputChange}
                          value={formData.policyName}
                        />
                      </div>

                      <div className="form-group col-md-12">
                        <label htmlFor="inclusion-editor">
                          Policy Description
                        </label>
                        <div ref={policyRef}></div>
                        <CKEditor
                          editor={DecoupledEditor}
                          data={formData.policyDescription}
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

                            const toolbarContainer = policyRef.current;
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
                        <button type="submit" className="btn btn-primary me-2">
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

export default Policy;
