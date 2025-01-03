import React, { useState } from "react";

const Amenities = () => {
    const [showForm, setShowForm] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [editAmenity, setEditAmenity] = useState(null);
    const [amenities, setAmenities] = useState([
        { id: 1, name: "Wifi", icon: "" },
        { id: 2, name: "Bathroom", icon: "" },
        { id: 3, name: "Swimming Pool", icon: "" },
        { id: 4, name: "Spa", icon: "" },
        { id: 5, name: "WheelChair", icon: "" },
    ]);

    const totalPages = Math.ceil(amenities.length / 4);
    const amenitiesPerPage = 5;

    const paginatedAmenities = amenities.slice(
        (currentPage - 1) * amenitiesPerPage,
        currentPage * amenitiesPerPage
    );

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

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const icon = event.target.icon.value;

        if (editAmenity) {
            setAmenities(
                amenities.map((amenity) =>
                    amenity.id === editAmenity.id
                        ? { ...amenity, name, icon }
                        : amenity
                )
            );
        } else {
            const newAmenity = {
                id: amenities.length + 1,
                name,
                icon,
            };
            setAmenities([...amenities, newAmenity]);
        }

        setShowForm(false);
        setEditAmenity(null);
        event.target.reset();
    };

    const handleDelete = (id) => {
        setAmenities(amenities.filter((amenity) => amenity.id !== id));
    };

    const handleEdit = (amenity) => {
        setEditAmenity(amenity);
        setShowForm(true);
    };

    return (
        <div className="content-wrapper">
            <div className="row">
                <div className="col-12 grid-margin stretch-card">
                    <div className="card form-card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h4 className="card-title">Amenities</h4>
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
                                        onClick={() => {
                                            setShowForm(false);
                                            setEditAmenity(null);
                                        }}
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
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {paginatedAmenities.map((amenity, index) => (
                                                    <tr key={amenity.id}>
                                                        <td>{(currentPage - 1) * amenitiesPerPage + index + 1}</td>
                                                        <td>{amenity.name}</td>
                                                        <td>{amenity.icon}</td>
                                                        <td>
                                                            <button
                                                                className="btn btn-sm btn-success me-2"
                                                                onClick={() => handleEdit(amenity)}
                                                            >
                                                                <i className="mdi mdi-square-edit-outline"></i>
                                                            </button>
                                                            <button
                                                                className="btn btn-sm btn-danger"
                                                                onClick={() => handleDelete(amenity.id)}
                                                            >
                                                                <i className="mdi mdi-trash-can"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <nav className="d-flex justify-content-between align-items-center mt-3">
                                        <div>
                                            <span>
                                                Page {currentPage} of {totalPages} | Total Amenities: {amenities.length}
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
                            )
                            
                             : (
                                <form className="forms row" onSubmit={handleFormSubmit}>
                                    <div className="form-group col-md-12">
                                        <label>Amenities Details</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            defaultValue={editAmenity ? editAmenity.name : ""}
                                            placeholder="Enter Amenity Name"
                                            required
                                        />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label>Icons</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="icon"
                                            defaultValue={editAmenity ? editAmenity.icon : ""}
                                            placeholder="Only fa-icons accepted"
                                        />
                                    </div>
                                    <div className="form-group col-md-12 d-flex justify-content-end">
                                        <button type="submit" className="btn btn-primary me-2">
                                            Submit
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={() => {
                                                setShowForm(false);
                                                setEditAmenity(null);
                                            }}
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

export default Amenities;
