import React, { useState, useRef } from "react";
const Tagwisepackage = () => {
    const [showForm, setShowForm] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 3;
    const totalProducts = 20;
    

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
                            <h4 className="card-title">{showForm ? "Create" : "Tag Wise Package"} </h4>
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
                                                    <th>SNo.</th>
                                                    <th>	Name</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>Adventure Holiday</td>
                                                    <th>Active </th>
                                                    <td>
                                                        <button className="btn btn-sm btn-success me-2"><i className="mdi mdi-square-edit-outline"></i></button>
                                                        <button className="btn btn-sm btn-danger"><i className="mdi mdi-trash-can"></i></button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td>Beach Holiday</td>
                                                    <th> Active</th>
                                                    <td>
                                                        <button className="btn btn-sm btn-success me-2"><i className="mdi mdi-square-edit-outline"></i></button>
                                                        <button className="btn btn-sm btn-danger"><i className="mdi mdi-trash-can"></i></button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>3</td>
                                                    <td>Domestic Holiday</td>
                                                    <th> Active</th>
                                                    <td>
                                                        <button className="btn btn-sm btn-success me-2"><i className="mdi mdi-square-edit-outline"></i></button>
                                                        <button className="btn btn-sm btn-danger"><i className="mdi mdi-trash-can"></i></button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>4</td>
                                                    <td>Hill Station Holiday</td>
                                                    <th> Active</th>
                                                    <td>
                                                        <button className="btn btn-sm btn-success me-2"><i className="mdi mdi-square-edit-outline"></i></button>
                                                        <button className="btn btn-sm btn-danger"><i className="mdi mdi-trash-can"></i></button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>5</td>
                                                    <td>Honeymoon Holidays</td>
                                                    <th>Active</th>
                                                    <td>
                                                        <button className="btn btn-sm btn-success me-2"><i className="mdi mdi-square-edit-outline"></i></button>
                                                        <button className="btn btn-sm btn-danger"><i className="mdi mdi-trash-can"></i></button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>6</td>
                                                    <td>International Holiday</td>
                                                    <th>Active</th>
                                                    <td>
                                                        <button className="btn btn-sm btn-success me-2"><i className="mdi mdi-square-edit-outline"></i></button>
                                                        <button className="btn btn-sm btn-danger"><i className="mdi mdi-trash-can"></i></button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>7</td>
                                                    <td>Pilgrim Holidays</td>
                                                    <th>Active</th>
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
                                        <label htmlFor="Tagdropdown">Tag</label>
                                        <select
                                            className="form-control"
                                            id="tagDropdown"
                                            onChange={(e) => console.log(e.target.value)}
                                        >
                                            <option value="" disabled selected>
                                                Select Tag
                                            </option>
                                            <option value="Pilgrim Holidays">Pilgrim Holidays</option>
                                            <option value="Beach Holiday"> Beach Holiday</option>
                                            <option value="Hill Station Holiday">Hill Station Holiday</option>
                                            <option value="Domestic Holiday">Domestic Holiday</option>
                                            <option value="International Holiday">International Holiday</option>

                                        </select>
                                    </div>


                                    <div className="form-group col-md-12">
                                        <label htmlFor="packagesdropdown">Packages</label>
                                        <select
                                            className="form-control"
                                            id="packagesdropdown"
                                            onChange={(e) => console.log(e.target.value)}
                                        >
                                            <option value="" disabled selected>
                                                Select Packages
                                            </option>
                                            <option value="3 Night 4 Days">3 Night 4 Days</option>
                                            <option value="3 Night 4 Days Goa"> 3 Night 4 Days Goa</option>
                                            <option value="jhf">jhf</option>
                                            <option value="Ladakh">Ladakh</option>
                                            <option value="quer">quer</option>

                                        </select>
                                    </div>


                                    <div className="form-group col-md-12 d-flex justify-content-end">
                                        <button className="btn btn-success me-2">
                                            <i className="bi bi-plus-lg"></i> +  ADD
                                        </button>
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

export default Tagwisepackage;
