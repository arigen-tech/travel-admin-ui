import React, { useState } from "react";

const Mealplan = () => {
    const [showForm, setShowForm] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 3;
    const totalProducts = 2;

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
                            <h4 className="card-title">Meal Plan</h4>
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
                                                    <th>S.No.</th>
                                                    <th>Name</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>CP</td>
                                                <td>
                                                    <button className="btn btn-sm btn-success me-2"><i className="mdi mdi-square-edit-outline"></i></button>
                                                    <button className="btn btn-sm btn-danger"><i className="mdi mdi-trash-can"></i></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>MAP</td>
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
                                    <label htmlFor="imagePicker">Icon</label>
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
                                <div className="form-group col-md-6">
                                    <label>Meal Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="star"
                                        placeholder="Name"
                                    />
                                </div>
                                <div className="form-group col-md-12 d-flex justify-content-end">
                                    <button type="submit" className="btn btn-primary me-2">
                                        Save
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

export default Mealplan;
