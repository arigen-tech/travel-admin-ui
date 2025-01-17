import React, { useState, useRef, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import {
  uploadMultiFileWithJson,
  getRequest,
  putRequest,
} from "../../../../service/apiService.js";
import { TAG_WISE, TAG_WISES } from "../../../../config/apiConfig";
import Popup from "../../../../components/popup";

const Tag = () => {
  const [formData, setFormData] = useState({
    name: "",
    heading: "",
    thumbImg: null,
    bannerImg: null,
    description: "",
    isFeature: false,
    showOnPkg: false,
    orderNo: "",
  });
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [tagData, setTagData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [newStatus, setNewStatus] = useState(false);
  const [itemName, setItemName] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [popup, setPopup] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const editorRef = useRef(null);

  const tagRef = useRef(null);
  const totalProducts = 20;
  const resultsPerPage = 10;

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

  const fetchInclusionData = async () => {
    setLoading(true);

    const GETALL = "/masterController/getAllTags";

    try {
      const data = await getRequest(GETALL);
      if (data.status === 200 && Array.isArray(data.response)) {
        setTagData(data.response);
        setTotalPages(Math.ceil(data.response.length / resultsPerPage));
      } else {
        console.error("Unexpected API response format:", data);
        setTagData([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching inclusion data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInclusionData();
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

  const handleFileChange = (e) => {
    const { id, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: files[0],
    }));
  };

  const handleEditorChange = (_, editor) => {
    const data = editor.getData();
    setFormData((prevData) => ({
      ...prevData,
      description: data,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.heading || !formData.orderNo) {
      alert("Please fill out all required fields.");
      return;
    }

    if (!formData.bannerImg || !formData.thumbImg) {
      alert("Please upload both banner and thumbnail images.");
      return;
    }

    let json = {
      tagName: formData.name,
      heading: formData.heading,
      description: formData.description || "",
      isFeature: formData.isFeature ? "y" : "n",
      showOnPkg: formData.showOnPkg ? "y" : "n",
      orderNo: formData.orderNo,
    };
    console.log(json);

    try {
      const response = await uploadMultiFileWithJson(
        TAG_WISE,
        json,
        formData.bannerImg,
        formData.thumbImg
      );

      if (response.status === 200) {
        showPopup(response.message || "Tag submitted successfully!", "success");
        fetchInclusionData();
        setFormData({
          name: "",
          heading: "",
          description: "",
          bannerImg: null,
          thumbImg: null,
          isFeature: false,
          showOnPkg: false,
          orderNo: "",
        });
      } else {
        showPopup(
          response?.message || "Failed to submit the tag. Please try again.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error submitting tag:", error);
      showPopup(
        error?.response?.message ||
          "An error occurred while submitting the tag.",
        "error"
      );
    }
  };

  const handleStatusChange = (id, status, tagName) => {
    setSelectedItem(id);
    setNewStatus(status);
    setItemName(tagName);
    setShowConfirmation(true);
  };

  const confirmStatusChange = async (e) => {
    e.preventDefault();
    try {
      const status = newStatus ? "y" : "n";
      const response = await putRequest(
        `${TAG_WISES}/status/${selectedItem}?status=${status}`
      );

      if (response.status === 200) {
        showPopup(
          response.message || "Status updated successfully!",
          "success"
        );
        fetchInclusionData();
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

  const filterTags = (tags) => {
    if (!searchTerm.trim()) return tags;
    return tags.filter(
      (item) =>
        item.tagName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.status?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredTags = filterTags(tagData);
  const totalFilteredProducts = filteredTags.length;
  const filteredTotalPages = Math.ceil(totalFilteredProducts / resultsPerPage);
  const indexOfLastTag = currentPage * resultsPerPage;
  const indexOfFirstTag = indexOfLastTag - resultsPerPage;
  const currentTag = filteredTags.slice(indexOfFirstTag, indexOfLastTag);

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
              <h4 className="card-title">Tag </h4>
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
                          <th>Banner Image</th>
                          <th>Thum Image</th>
                          <th>Edit</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentTag.length > 0 ? (
                          currentTag.map((item, index) => (
                            <tr key={item.id}>
                              <td>{indexOfFirstTag + index + 1}</td>
                              <td>{item.tagName}</td>
                              <td
                                dangerouslySetInnerHTML={{
                                  __html: item.description,
                                }}
                              ></td>
                              <td>{item.bannerImg}</td>
                              <td>{item.thumbImg}</td>

                              <td>
                                <button
                                  className={`btn btn-sm btn-success me-2 ${
                                    item.status === "n" ? "disabled" : ""
                                  }`}
                                  disabled={item.status === "n"}
                                  onClick={() => {
                                    if (item.status === "y") {
                                      // handleEdit(item);
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
                                        item.tagName
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
                <form className="forms row" onSubmit={handleSubmit}>
                  <div className="form-group col-md-4">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label>Heading</label>
                    <input
                      type="text"
                      className="form-control"
                      id="heading"
                      placeholder="Heading"
                      value={formData.heading}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="thumbImg">Thumb Image</label>
                    <input
                      type="file"
                      className="form-control"
                      id="thumbImg"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="bannerImg">Banner Image</label>
                    <input
                      type="file"
                      className="form-control"
                      id="bannerImg"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>

                  <div className="form-group col-md-12">
                    <label htmlFor="inclusion-editor">Tag Description</label>
                    <div ref={tagRef}></div>
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

                        const toolbarContainer = tagRef.current;
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
                  <div className="d-flex align-items-space-center justify-content-center">
                    <div className="d-flex align-items-center">
                      <div className="form-check me-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="isFeature"
                          checked={formData.isFeature}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="isFeature">
                          isFeature
                        </label>
                      </div>
                      <div className="form-check me-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="showOnPkg"
                          checked={formData.showOnPkg}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="showOnPkg">
                          Show On Package
                        </label>
                      </div>
                      <div className="form-group">
                        <label>Order No</label>
                        <input
                          className="form-control"
                          id="orderNo"
                          placeholder="Enter orderNo"
                          value={formData.orderNo}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group col-md-12 d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary me-2">
                      Submit
                    </button>
                    <button type="button" className="btn btn-danger">
                      Cancel
                    </button>
                  </div>
                </form>
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

export default Tag;
