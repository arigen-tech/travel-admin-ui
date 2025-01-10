import React, { useState, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
const Tag = () => {
    const [showForm, setShowForm] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 3;
    const totalProducts = 20;
    const tagRef = useRef(null);
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
                            <h4 className="card-title">Tag </h4>
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
                                                    <th>Category</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td></td>
                                                    <td>Domestic Holiday</td>
                                                    <th> </th>
                                                    <td>
                                                        <button className="btn btn-sm btn-success me-2"><i className="mdi mdi-square-edit-outline"></i></button>
                                                        <button className="btn btn-sm btn-danger"><i className="mdi mdi-trash-can"></i></button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td></td>
                                                    <td>	International Holiday</td>
                                                    <th> </th>
                                                    <td>
                                                        <button className="btn btn-sm btn-success me-2"><i className="mdi mdi-square-edit-outline"></i></button>
                                                        <button className="btn btn-sm btn-danger"><i className="mdi mdi-trash-can"></i></button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>3</td>
                                                    <td></td>
                                                    <td>	Adventure Holiday</td>
                                                    <th> </th>
                                                    <td>
                                                        <button className="btn btn-sm btn-success me-2"><i className="mdi mdi-square-edit-outline"></i></button>
                                                        <button className="btn btn-sm btn-danger"><i className="mdi mdi-trash-can"></i></button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>4</td>
                                                    <td></td>
                                                    <td>Pilgrim Holidays</td>
                                                    <th> </th>
                                                    <td>
                                                        <button className="btn btn-sm btn-success me-2"><i className="mdi mdi-square-edit-outline"></i></button>
                                                        <button className="btn btn-sm btn-danger"><i className="mdi mdi-trash-can"></i></button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>5</td>
                                                    <td></td>
                                                    <td>Honeymoon Holidays</td>
                                                    <th></th>
                                                    <td>
                                                        <button className="btn btn-sm btn-success me-2"><i className="mdi mdi-square-edit-outline"></i></button>
                                                        <button className="btn btn-sm btn-danger"><i className="mdi mdi-trash-can"></i></button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>6</td>
                                                    <td></td>
                                                    <td>Hill Station Holiday</td>
                                                    <th></th>
                                                    <td>
                                                        <button className="btn btn-sm btn-success me-2"><i className="mdi mdi-square-edit-outline"></i></button>
                                                        <button className="btn btn-sm btn-danger"><i className="mdi mdi-trash-can"></i></button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>7</td>
                                                    <td></td>
                                                    <td>Beach Holiday</td>
                                                    <th></th>
                                                    <td>
                                                        <button className="btn btn-sm btn-success me-2"><i className="mdi mdi-square-edit-outline"></i></button>
                                                        <button className="btn btn-sm btn-danger"><i className="mdi mdi-trash-can"></i></button>
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
                                        <label>Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id=" Name"
                                            placeholder="Name"
                                        />
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label>Heading</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="Heading"
                                            placeholder="Heading"
                                        />
                                    </div>

                                    <div className="form-group col-md-4">
                                        <label htmlFor="imagePicker">Thumb Image</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="ThumbImg"
                                            accept="image/*"
                                            placeholder="No image chosen"
                                            onChange={(e) => {
                                                const fileName = e.target.files[0]?.name || "No image chosen";
                                            }}
                                        />
                                    </div>



                                    <div className="form-group col-md-6">
                                        <label htmlFor="BannerImage">Banner Iamge</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="BannerImg"
                                            accept="image/*"
                                            placeholder="No image chosen"
                                            onChange={(e) => {
                                                const fileName = e.target.files[0]?.name || "No image chosen";
                                            }}
                                        />
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label htmlFor="Category">Select Category</label>
                                        <select
                                            className="form-control"
                                            id="Category"
                                            onChange={(e) => console.log(e.target.value)}
                                        >
                                            <option value="" disabled selected>
                                                Select Category
                                            </option>

                                        </select>
                                    </div>

                                    <div className="form-group col-md-12">
                                        <div ref={tagRef}></div>
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
                                                const toolbarContainer = tagRef.current;
                                                toolbarContainer.innerHTML = "";
                                                toolbarContainer.appendChild(editor.ui.view.toolbar.element);
                                                editor.editing.view.change((writer) => {
                                                    writer.setStyle("min-height", "100px", editor.editing.view.document.getRoot());
                                                });
                                            }}
                                            onChange={handleEditorChange}
                                        />
                                    </div>






                                    <div className="d-flex align-items-space-center justify-content-center ">
                                    <div className="d-flex align-items-center">
                                        <div className="form-check me-3">
                                            <input className="form-check-input" type="checkbox" id="isFeatured" />
                                            <label className="form-check-label" htmlFor="isFeatured">isFeatured</label>
                                        </div>

                                        <div className="form-check me-3">
                                            <input className="form-check-input" type="checkbox" id="showPkg" />
                                            <label className="form-check-label" htmlFor="showPkg">Show On Package</label>
                                        </div>
                                        <div className="form-group">
                                            <label>Sequence</label>
                                            <input
                                                className="form-control"
                                                id="sequence"
                                                placeholder="Enter Sequence"
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
        </div >
    );
};

export default Tag;
