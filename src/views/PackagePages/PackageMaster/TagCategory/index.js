import React, { useState, useRef, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import { TAGCATEGORY } from "../../../../config/apiConfig";
import { getRequest, postRequest } from "../../../../service/apiService";

const Tagcategory = () => {
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [tagCategoryData, setTagCategoryData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const resultsPerPage = 10;
  //   const totalPages = 1;
  const totalProducts = 1;
  const tagCategoryRef = useRef(null);

  const [formData, setFormData] = useState({
    categoryName: "",
    header: "",
    url: "",
    metaKeyword: "",
    title: "",
    ogTag: "",
    description: "",
    image: null,
    isFeatured: false,
    editorContent: "",
  });

  const fetchTagCategoryData = async () => {
    setLoading(true);

    const GETALL = "/masterController/getAllTagCategories";

    try {
      const data = await getRequest(GETALL);
      if (data.status === 200 && Array.isArray(data.response)) {
        setTagCategoryData(data.response);
        setTotalPages(Math.ceil(data.response.length / resultsPerPage));
      } else {
        console.error("Unexpected API response format:", data);
        setTagCategoryData([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching tagCatyegory data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTagCategoryData();
  }, []);

  const handleCreateFormSubmit = async (e) => {
    e.preventDefault();

    const data = {
      categoryName: formData.categoryName,
      header: formData.header,
      url: formData.url,
      metaKeyword: formData.metaKeyword,
      title: formData.title,
      ogTag: formData.ogTag,
      description: formData.description,
      isFeatured: formData.isFeatured,
      editorContent: formData.editorContent,
    };

    const submitData = async (finalData) => {
      try {
        const response = await postRequest(TAGCATEGORY, finalData);
        console.log("Form submitted successfully:", response);

        // Reset form state
        setFormData({
          categoryName: "",
          header: "",
          url: "",
          metaKeyword: "",
          title: "",
          ogTag: "",
          description: "",
          image: null,
          isFeatured: false,
          editorContent: "",
        });
      } catch (error) {
        console.error("Error during form submission:", error);
      }
    };

    if (formData.image) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result;
        submitData({ ...data, image: base64Image });
      };
      reader.readAsDataURL(formData.image);
    } else {
      submitData(data);
    }
  };

  const handleEditorChange = (event, editor) => {
    const content = editor.getData();
    setFormData((prev) => ({
      ...prev,
      editorContent: content,
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

  return (
    <div className="content-wrapper">
      <div className="row">
        <div className="col-12 grid-margin stretch-card">
          <div className="card form-card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="card-title">Tag Category</h4>
              <div>
                {!showForm ? (
                  <>
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
                          <th>Image</th>
                          <th>Name</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tagCategoryData.length > 0 ? (
                          tagCategoryData.map((item, index) => (
                            <tr key={item.id}>
                              <td>{index + 1}</td>
                              <td>
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  width="50"
                                  height="50"
                                />
                              </td>
                              <td>{item.name}</td>
                              <td>{item.status}</td>
                              <td>
                                <button className="btn btn-primary btn-sm">
                                  {item.action}
                                </button>
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
                <form className="forms row" onSubmit={handleCreateFormSubmit}>
                  <div className="form-group col-md-4">
                    <label>Category Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="categoryName"
                      placeholder="Category Name"
                      value={formData.categoryName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          categoryName: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label>Header</label>
                    <input
                      type="text"
                      className="form-control"
                      id="header"
                      placeholder="Header"
                      value={formData.header}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          header: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label>URL</label>
                    <input
                      type="text"
                      className="form-control"
                      id="url"
                      placeholder="URL"
                      value={formData.url}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          url: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Meta Keyword</label>
                    <input
                      type="text"
                      className="form-control"
                      id="metaKeyword"
                      placeholder="Meta Keyword"
                      value={formData.metaKeyword}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          metaKeyword: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      placeholder="Title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Og Tag</label>
                    <textarea
                      className="form-control"
                      id="ogTag"
                      placeholder="Og Tag"
                      rows="4"
                      style={{ height: "100px" }}
                      value={formData.ogTag}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          ogTag: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Meta Description</label>
                    <textarea
                      className="form-control"
                      id="description"
                      placeholder="Description"
                      rows="4"
                      style={{ height: "100px" }}
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="form-group col-md-12">
                    <label>Image (Width: 800px, Height: 250px)</label>
                    <input
                      type="file"
                      className="form-control"
                      id="imagePicker"
                      accept="image/*"
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          image: e.target.files[0],
                        }))
                      }
                    />
                  </div>
                  <div className="form-group col-md-12">
                    <div ref={tagCategoryRef}></div>
                    <CKEditor
                      editor={DecoupledEditor}
                      value={formData.editorContent}
                      config={{
                        toolbar: {
                          shouldNotGroupWhenFull: true,
                        },
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
                        const toolbarContainer = tagCategoryRef.current;
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

                  <div className="form-check col-md-12">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="isFeatured"
                      checked={formData.isFeatured}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          isFeatured: e.target.checked,
                        }))
                      }
                    />
                    <label className="form-check-label" htmlFor="isFeatured">
                      isFeatured
                    </label>
                  </div>
                  <div className="form-group col-md-12 d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary me-2">
                      Submit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() =>
                        setFormData({
                          categoryName: "",
                          header: "",
                          url: "",
                          metaKeyword: "",
                          title: "",
                          ogTag: "",
                          description: "",
                          image: null,
                          isFeatured: false,
                          editorContent: "",
                        })
                      }
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tagcategory;
