import React, { useState, useRef, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import {
  getRequest,
  postRequest,
  putRequest,
} from "../../../../service/apiService";
import { INCLUSION } from "../../../../config/apiConfig";

const Inclusions = () => {
  const [formData, setFormData] = useState({
    inclusionName: "",
    inclusionDesc: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [inclusionData, setInclusionData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newStatus, setNewStatus] = useState(false);
  const totalProducts = inclusionData?.length;
  const inclusionRef = useRef(null);
  const editorRef = useRef(null);
  const resultsPerPage = 10;

  const fetchInclusionData = async () => {
    setLoading(true);

    const GETALL = "/masterController/getAllInclusions";

    try {
      const data = await getRequest(GETALL);
      if (data.status === 200 && Array.isArray(data.response)) {
        setInclusionData(data.response);
        setTotalPages(Math.ceil(data.response.length / resultsPerPage));
      } else {
        console.error("Unexpected API response format:", data);
        setInclusionData([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching tagCatyegory data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInclusionData();
  }, []);

  const handleCreateFormSubmit = async (e) => {
    e.preventDefault();

    if (formData.inclusionName && formData.inclusionDesc) {
      const newInclusionType = {
        inclusionName: formData.inclusionName,
        inclusionDesc: formData.inclusionDesc,
      };

      try {
        const response = await postRequest(INCLUSION, newInclusionType);

        if (response.status === 200) {
          alert("Inclusion added successfully!");
          setFormData({ inclusionName: "", inclusionDesc: "" });
          setShowForm(false);
          fetchInclusionData();
        } else {
          alert("Failed to add inclusion. Please try again.");
        }
      } catch (error) {
        console.error("Error adding inclusion:", error);
        alert("An error occurred while adding the inclusion.");
      }
    } else {
      alert("Please fill out all required fields.");
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setFormData((prevData) => ({ ...prevData, inclusionDesc: data }));
  };

  const handleEdit = (item) => {
    setFormData({
      inclusionName: item.inclusionName,
      inclusionDesc: item.inclusionDesc,
    });
    setEditId(item.id);
    setEditMode(true);
    setShowForm(true);
  };

  const handleUpdateFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await putRequest(`${INCLUSION}/${editId}`, formData);
      if (response.status === 200) {
        alert("Inclusion updated successfully!");
        fetchInclusionData();
        setShowForm(false);
        setEditMode(false);
        setEditId(null);
        setFormData({ inclusionName: "", inclusionDesc: "" });
      } else {
        alert("Failed to update inclusion. Please try again.");
      }
    } catch (error) {
      console.error("Error updating inclusion:", error);
      alert("An error occurred while updating the inclusion.");
    }
  };

  const handleStatusChange = (id, status) => {
    setSelectedItem(id);
    setNewStatus(status);
    setShowConfirmation(true);
  };

  const confirmStatusChange = async (e) => {
    e.preventDefault();
    try {
      const status = newStatus ? "1" : "0";
      const response = await putRequest(
        `${INCLUSION}/status/${selectedItem}?status=${status}`
      );

      if (response.status === 200) {
        alert("Status updated successfully!");
        fetchInclusionData();
        setShowConfirmation(false);
        setSelectedItem(null);
        setNewStatus(false);
      } else {
        alert("Failed to update status. Please try again.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("An error occurred while updating the status.");
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

  return (
    <div className="content-wrapper">
      <div className="row">
        <div className="col-12 grid-margin stretch-card">
          <div className="card form-card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="card-title">Inclusions</h4>
              <div>
                {!showForm ? (
                  <>
                    <button
                      type="button"
                      className="btn btn-success me-2"
                      onClick={() => setShowForm(true)} // Show  form
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
                    onClick={() => setShowForm(false)} // Show  form
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
                          <th> Name</th>
                          <th> Description</th>
                          <th>Edit</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inclusionData.length > 0 ? (
                          inclusionData.map((item, index) => (
                            <tr key={item.id}>
                              <td>{index + 1}</td>
                              <td>{item.inclusionName}</td>
                              <td>{item.inclusionDesc}</td>
                              <td>
                                <button
                                  className={`btn btn-sm btn-success me-2 ${
                                    item.status === "0" ? "disabled" : ""
                                  }`}
                                  disabled={item.status === "0"}
                                  style={{
                                    cursor:
                                      item.status === "0"
                                        ? "not-allowed"
                                        : "pointer",
                                  }} // Set cursor style
                                  onClick={() => {
                                    if (item.status === "1") {
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
                                    checked={item.status === "1"}
                                    onChange={() =>
                                      handleStatusChange(
                                        item.id,
                                        item.status !== "1"
                                      )
                                    }
                                  />
                                  <label className="form-check-label px-0">
                                    {item.status === "1"
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
                              There are no records.
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
                        <label htmlFor="inclusionName">Inclusion Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="inclusionName"
                          placeholder="Inclusion Name"
                          onChange={(e) =>
                            setFormData((prevData) => ({
                              ...prevData,
                              inclusionName: e.target.value,
                            }))
                          }
                          value={formData.inclusionName}
                          required
                        />
                      </div>

                      <div className="form-group col-md-12">
                        <label htmlFor="inclusion-editor">Inclusions</label>
                        <div ref={inclusionRef}></div>
                        <CKEditor
                          editor={DecoupledEditor}
                          data={formData.inclusionDesc}
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

                            const toolbarContainer = inclusionRef.current;
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
                          onChange={(event, editor) => {
                            const data = editor.getData();
                            setFormData((prevData) => ({
                              ...prevData,
                              inclusionDesc: data,
                            }));
                          }}
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <form
            className="bg-white p-6 rounded-lg shadow-md"
            onSubmit={confirmStatusChange}
          >
            <p className="text-lg mb-4">
              Are you sure you want to {newStatus ? "activate" : "deactivate"}{" "}
              this inclusion?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                onClick={() => setShowConfirmation(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Confirm
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Inclusions;
