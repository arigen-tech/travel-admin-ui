import React, { useState } from "react";

const Facilities = () => {
    const [showForm, setShowForm] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [categoryInput, setCategoryInput] = useState("");
    const [iconInput, setIconInput] = useState("");
    const totalPages = 2;
    const totalProducts = 0;

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

    const handleSaveCategory = () => {
        setShowModal(false);
    };

    return (
        <div className="content-wrapper">
            <div className="row">
                <div className="col-12 grid-margin stretch-card">
                    <div className="card form-card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h4 className="card-title">Facilities</h4>
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
                                                    <th>S.No.</th>
                                                    <th>Name</th>
                                                    <th>Icon</th>
                                                    <th>Category</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td colSpan="5" className="text-center">
                                                        No Data Available
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
                                    <div className="form-group col-md-12 position-relative">

                                        <div className="form-group position-relative" style={{ position: "relative" }}>
                                            <label className="form-label">Category Type</label>
                                            <div style={{ position: "relative" }}>
                                                <select className="form-select" style={{ paddingRight: "40px" }}>
                                                    <option value="">Select Category Type</option>
                                                    <option value="one">One Type</option>
                                                    <option value="two">Two Type</option>
                                                    <option value="three">Three Type</option>
                                                </select>
                                                <button
                                                    type="button"
                                                    onClick={() => setShowModal(true)}
                                                    className="btn btn-success ms-2 position-absolute d-flex justify-content-center align-items-center"
                                                    style={{
                                                        top: "34%",
                                                        right: "0px",
                                                        width: "26px",
                                                        height: "25px",
                                                        transform: "translateY(-50%)",
                                                        zIndex: 999,
                                                    }}
                                                >
                                                    <i className="mdi mdi-plus"></i>
                                                </button>
                                            </div>
                                        </div>


                                    </div>
                                    <div className="form-group col-md-12">
                                        <label>Name</label>
                                        <input
                                            type="text"
                                            value={categoryInput}
                                            className="form-control"
                                            id="star"
                                            placeholder="Name"
                                        />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="bannerText">Icon Only MUI icons are allowed</label>
                                        <textarea
                                            type="text"
                                            value={iconInput}
                                            className="form-control"
                                            id="bannerText"
                                            placeholder=""
                                            rows="4"
                                        />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="imagePicker">Image</label>
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
                                    <div className="form-group col-md-12 d-flex justify-content-end">
                                        <button type="submit" className="btn btn-primary me-2">
                                            Save
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add New Category</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Category</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={categoryInput}
                                        onChange={(e) => setCategoryInput(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">fa fa icon</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={iconInput}
                                        onChange={(e) => setIconInput(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                    Close
                                </button>
                                <button type="button" className="btn btn-primary" onClick={handleSaveCategory}>
                                    Save changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Facilities;

