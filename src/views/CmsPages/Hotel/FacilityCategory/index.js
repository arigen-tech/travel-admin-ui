import React, { useState, useRef, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import {
  getRequest,
  postRequest,
  putRequest,
} from "../../../../service/apiService";
import { FACILITY_CATEGORY } from "../../../../config/apiConfig";
import Popup from "../../../../components/popup";

const Facilitycategory = () => {
  const [formData, setFormData] = useState({
    categoryName: "",
    description: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [popup, setPopup] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newStatus, setNewStatus] = useState(false);
  const [itemName, setItemName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const categoryRef = useRef(null);
  const editorRef = useRef(null);
  const resultsPerPage = 10;

  const fetchCategoryData = async () => {
    setLoading(true);

    const GETALL = "/masterController/getAllHotelFacilitiesCat";

    try {
      const data = await getRequest(GETALL);
      if (data.status === 200 && Array.isArray(data.response)) {
        setCategoryData(data.response);
        setTotalPages(Math.ceil(data.response.length / resultsPerPage));
      } else {
        console.error("Unexpected API response format:", data);
        setCategoryData([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching category data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryData();
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

    if (formData.categoryName && formData.description) {
      const newCategoryType = {
        categoryName: formData.categoryName,
        description: formData.description,
      };

      try {
        const response = await postRequest(FACILITY_CATEGORY, newCategoryType);

        if (response.status === 200) {
          showPopup(
            response.message || "category added successfully!",
            "success"
          );
          setFormData({ categoryName: "", description: "" });
          setShowForm(false);
          fetchCategoryData();
        } else {
          showPopup(
            response.message || "Failed to add category. Please try again.",
            "error"
          );
        }
      } catch (error) {
        console.error("Error adding category:", error);
        showPopup(
          error.response?.message ||
            "An error occurred while adding the category.",
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
    setFormData((prevData) => ({ ...prevData, description: data }));
  };

  const handleEdit = (item) => {
    setFormData({
      categoryName: item.categoryName,
      description: item.description,
    });
    setEditId(item.id);
    setEditMode(true);
    setShowForm(true);
  };

  const handleUpdateFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await putRequest(`${FACILITY_CATEGORY}/${editId}`, formData);
      if (response.status === 200) {
        showPopup(
          response?.message || "category updated successfully!",
          "success"
        );
        fetchCategoryData();
        setShowForm(false);
        setEditMode(false);
        setEditId(null);
        setFormData({ categoryName: "", description: "" });
      } else {
        showPopup(
          response?.message || "Failed to update category. Please try again.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error updating category:", error);
      showPopup(
        error?.response?.message ||
          "An error occurred while updating the category.",
        "error"
      );
    }
  };

  const handleStatusChange = (id, status, categoryName) => {
    setSelectedItem(id);
    setNewStatus(status);
    setItemName(categoryName);
    setShowConfirmation(true);
  };

  const confirmStatusChange = async (e) => {
    e.preventDefault();
    try {
      const status = newStatus ? "y" : "n";
      const response = await putRequest(
        `${FACILITY_CATEGORY}/status/${selectedItem}?status=${status}`
      );

      if (response.status === 200) {
        showPopup(
          response.message || "Status updated successfully!",
          "success"
        );
        fetchCategoryData();
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

  const filterCategories = (categories) => {
    if (!searchTerm.trim()) return categories;
    return categories.filter(
      (item) =>
        item.categoryName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.status?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredCategories = filterCategories(categoryData);
  const totalFilteredProducts = filteredCategories.length;
  const filteredTotalPages = Math.ceil(totalFilteredProducts / resultsPerPage);
  const indexOfLastCategory = currentPage * resultsPerPage;
  const indexOfFirstCategory = indexOfLastCategory - resultsPerPage;
  const currentCategories = filteredCategories.slice(
    indexOfFirstCategory,
    indexOfLastCategory
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
              <h4 className="card-title">Facility Category Name</h4>
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
                        {currentCategories.length > 0 ? (
                          currentCategories.map((item, index) => (
                            <tr key={item.id}>
                              <td>{indexOfFirstCategory + index + 1}</td>
                              <td>{item.categoryName}</td>
                              <td
                                dangerouslySetInnerHTML={{
                                  __html: item.description,
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
                                        item.categoryName
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
                        <label htmlFor="categoryName">
                          Facility Category Name <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          className="form-control"
                          id="categoryName"
                          placeholder="Facility Category Name"
                          onChange={handleInputChange}
                          value={formData.categoryName}
                        />
                      </div>

                      <div className="form-group col-md-12">
                        <label htmlFor="category-editor">
                            Facility Category Description
                        </label>
                        <div ref={categoryRef}></div>
                        <CKEditor
                          editor={DecoupledEditor}
                          data={formData.description}
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

                            const toolbarContainer = categoryRef.current;
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
                        <button
                          type="submit"
                          className="btn btn-primary me-2"
                          disabled={!formData.categoryName}
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

export default Facilitycategory;
