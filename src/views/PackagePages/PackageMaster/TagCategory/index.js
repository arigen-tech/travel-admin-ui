import React, { useState, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
const Tagcategory = () => {
    const [showForm, setShowForm] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 1;
    const totalProducts = 1;
    const tagCategoryRef = useRef(null);
    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        console.log({ event, editor, data });
    }

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
                                                <tr>
                                                    <td colSpan="5" className="text-center">
                                                        There is no records.
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
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
                                                    className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
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
                                            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                                                <button className="page-link" onClick={handleNext}>
                                                    &raquo;
                                                </button>
                                            </li>
                                        </ul>
                                    </nav>
                                </>
                            ) : (
                                <form className="forms row">
                                    <div className="form-group col-md-4">
                                        <label>Category Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="Category Name"
                                            placeholder="Category Name"
                                        />
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label>Header</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="Header"
                                            placeholder="Header"
                                        />
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label>URL</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="URL"
                                            placeholder="URL"
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Meta Keyword</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="Meta Keyword"
                                            placeholder="Meta Keyword"
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Title</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="Title"
                                            placeholder="Header"
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="bannerText">Og Tag</label>
                                        <textarea
                                            type="text"
                                            className="form-control"
                                            id="OgTag"
                                            placeholder="Og Tag"
                                            rows="4"
                                            style={{ height: '100px' }}

                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="bannerText">Meta Description</label>
                                        <textarea
                                            type="text"
                                            className="form-control"
                                            id="Descripton"
                                            placeholder="Description"
                                            rows="4"
                                            style={{ height: '100px' }}

                                        />
                                    </div>

                                    <div className="form-group col-md-12">
                                        <label htmlFor="imagePicker">Image*(Width: 800px, Height: 250px)</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="imagePicker"
                                            accept="image/*"
                                            placeholder="No image chosen"
                                            onChange={(e) => {
                                                const fileName = e.target.files[0]?.name || "No image chosen";
                                            }}
                                        />
                                    </div>

                                    <div className="form-group col-md-12">
                                        <div ref={tagCategoryRef}></div>
                                        <CKEditor
                                            editor={DecoupledEditor}
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
                                                toolbarContainer.appendChild(editor.ui.view.toolbar.element);
                                                editor.editing.view.change((writer) => {
                                                    writer.setStyle("min-height", "100px", editor.editing.view.document.getRoot());
                                                });
                                            }}
                                            onChange={handleEditorChange}
                                        />
                                    </div>
                                    <div className="form-check col-md-12">
                                        <input className="form-check-input" type="checkbox" id=" isFeatured" />
                                        <label className="form-check-label" htmlFor="isFeatured">isFeatured </label>
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
        </div>
    );
};

export default Tagcategory;
