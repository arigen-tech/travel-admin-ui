import React, { useState, useRef} from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
const Policy = () => {
    const [showForm, setShowForm] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 3;
    const totalProducts = 12;
        const policyRef = useRef(null);
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
                            <h4 className="card-title">Policy</h4>
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
                                                    <th> 	Name</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>Exclusion</td>
                                                    <td>
                                                        <button className="btn btn-sm btn-success me-2"><i className="mdi mdi-square-edit-outline"></i></button>
                                                        <button className="btn btn-sm btn-danger"><i className="mdi mdi-trash-can"></i></button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td>Inclusion</td>
                                                    <td>
                                                        <button className="btn btn-sm btn-success me-2"><i className="mdi mdi-square-edit-outline"></i></button>
                                                        <button className="btn btn-sm btn-danger"><i className="mdi mdi-trash-can"></i></button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>3</td>
                                                    <td>	Cancellation Policy</td>
                                                    <td>
                                                        <button className="btn btn-sm btn-success me-2"><i className="mdi mdi-square-edit-outline"></i></button>
                                                        <button className="btn btn-sm btn-danger"><i className="mdi mdi-trash-can"></i></button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>4</td>
                                                    <td>Package Policy</td>
                                                    <td>
                                                        <button className="btn btn-sm btn-success me-2"><i className="mdi mdi-square-edit-outline"></i></button>
                                                        <button className="btn btn-sm btn-danger"><i className="mdi mdi-trash-can"></i></button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>5</td>
                                                    <td>Terms & Conditions</td>
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

<div className="form-group col-md-12">
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="Name"
                                    />
                                </div>


                                    <div className="form-group col-md-12">
                                        
                                        <div ref={policyRef}></div>
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
                                                const toolbarContainer = policyRef.current;
                                                toolbarContainer.innerHTML = "";
                                                toolbarContainer.appendChild(editor.ui.view.toolbar.element);
                                                editor.editing.view.change((writer) => {
                                                    writer.setStyle("min-height", "100px", editor.editing.view.document.getRoot());
                                                });        
                                            }}
                                            onChange={handleEditorChange}
                                        />
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

export default Policy;
