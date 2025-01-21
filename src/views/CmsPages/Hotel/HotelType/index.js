import React, { useState, useEffect } from "react";
import {
    GET_HOTEL_TYPE,
    SET_HOTEL_TYPE,
    UPDATE_HOTEL_TYPE,
} from "../../../../config/apiConfig";
import {
    getRequest,
    postRequest,
    putRequest,
} from "../../../../service/apiService";

const Package = () => {
    const [formData, setFormData] = useState({
        hotelType: "",
        description: "",
        status: "y",
    });
    const [showForm, setShowForm] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [editingRow, setEditingRow] = useState(-1);
    const [editedHotel, setEditedHotel] = useState(null);
    const [hotelData, setHotelData] = useState([]);
    const [loading, setLoading] = useState(false);
    const resultsPerPage = 10; // Show 10 results per page
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, roomId: null, newStatus: false });

    // Fetch hotel data
    const fetchHotelData = async () => {
        setLoading(true);
        try {
            const data = await getRequest(GET_HOTEL_TYPE);
            if (data.status === 200 && Array.isArray(data.response)) {
                setHotelData(data.response); // Set the 'response' array to state
                setTotalPages(Math.ceil(data.response.length / resultsPerPage)); // Calculate total pages
            } else {
                console.error("Unexpected API response format:", data);
                setHotelData([]);
                setTotalPages(1);
            }
        } catch (error) {
            console.error("Error fetching hotel data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHotelData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const addHotelType = async (e) => {
        e.preventDefault();
        if (formData.hotelType && formData.description) {
            const newHotelType = {
                hotelTypeName: formData.hotelType,
                description: formData.description,
                status: formData.status,
                createDt: new Date().toISOString(),
                createdBy: "system", // Example value, replace with dynamic user info if available
                updatedDt: new Date().toISOString(),
            };
            try {
                const response = await postRequest(SET_HOTEL_TYPE, newHotelType);
                if (response.status === 200) {
                    alert("Hotel type added successfully!");
                    setFormData({ hotelType: "", description: "", status: "y" }); // Reset form
                    setShowForm(false); // Close form
                    fetchHotelData(); // Refresh hotel data
                } else {
                    alert("Failed to add hotel type. Please try again.");
                }
            } catch (error) {
                console.error("Error adding hotel type:", error);
                alert("An error occurred while adding hotel type.");
            }
        } else {
            alert("Please fill out all required fields.");
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

    // Paginate hotel data
    // const paginatedData = filteredData.slice(
    //     (currentPage - 1) * resultsPerPage,
    //     currentPage * resultsPerPage
    // );

    const handleSwitchChange = (id, newStatus) => {
        setConfirmDialog({ isOpen: true, roomId: id, newStatus });
    };

    const handleConfirm = (confirm) => {
        if (confirm) {
            setHotelData(hotelData.map(hotel =>
                hotel.id === confirmDialog.roomId ? { ...hotel, isActive: confirmDialog.newStatus } : hotel
            ));
        }
        setConfirmDialog({ isOpen: false, roomId: null, newStatus: false });
    };

    const isFormValid = formData.hotelType.trim() !== "" && formData.description.trim() !== "";

    async function removeHotelType(id) {
        if (!id) {
            alert("Invalid hotel type ID.");
            return;
        }

        try {
            const editHotelType = {
                ...hotelData.find((hotel) => hotel.id === id),
                status: "n",
                updatedDt: new Date().toISOString(),
            };

            const response = await putRequest(
                `${UPDATE_HOTEL_TYPE}/${id}`,
                editHotelType
            );

            if (response.status === 200) {
                alert("Hotel type removed successfully!");
                fetchHotelData(); // Refresh the data
            } else {
                alert("Failed to remove hotel type. Please try again.");
            }
        } catch (error) {
            console.error("Error removing hotel type:", error);
            alert("An error occurred while removing hotel type.");
        }
    }

    async function updateHotelData(hotel) {
        if (!hotel.id) {
            alert("Invalid hotel type ID.");
            return;
        }

        try {
            const editHotelType = {
                ...hotelData.find((selHotel) => hotel.id === selHotel.id),
                hotelTypeName: hotel.hotelTypeName,
                description: hotel.description,
                updatedDt: new Date().toISOString(),
            };

            const response = await putRequest(
                `${UPDATE_HOTEL_TYPE}/${hotel.id}`,
                editHotelType
            );

            if (response.status === 200) {
                alert("Hotel type Updated successfully!");
                setEditingRow(-1);
                fetchHotelData(); // Refresh the data
            } else {
                alert("Failed to remove hotel type. Please try again.");
            }
        } catch (error) {
            console.error("Error removing hotel type:", error);
            alert("An error occurred while removing hotel type.");
        }
        console.log(hotel);
    }

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredData = hotelData.filter((hotel) => {
        return hotel.hotelTypeName && hotel.hotelTypeName.toLowerCase().includes(searchQuery.toLowerCase());
    });
    const paginatedData = filteredData.slice(
        (currentPage - 1) * resultsPerPage,
        currentPage * resultsPerPage
    );

    return (
        <div className="content-wrapper">
            <div className="row">
                <div className="col-12 grid-margin stretch-card">
                    <div className="card form-card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h4 className="card-title">Hotel Type</h4>
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
                                                    value={searchQuery}
                                                    onChange={handleSearchChange}
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
                                        <button
                                            type="button"
                                            className="btn btn-warning me-2"
                                            onClick={fetchHotelData}
                                        >
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
                                    {loading ? (
                                        <div>Loading...</div>
                                    ) : (
                                        <div className="table-responsive packagelist">
                                            <table className="table table-bordered table-hover align-middle">
                                                <thead className="table-light">
                                                    <tr>
                                                        <th>S.No.</th>
                                                        <th>Status</th>

                                                        <th>Hotel Type</th>
                                                        <th>Description</th>

                                                        <th>Edit</th>
                                                        <th>Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {paginatedData.length > 0 ? (
                                                        paginatedData.map((hotel, index) => (
                                                            <tr key={index}>
                                                                <td>
                                                                    {(currentPage - 1) * resultsPerPage +
                                                                        index +
                                                                        1}
                                                                </td>
                                                                <td>
                                                                    {hotel.status}
                                                                </td>
                                                                {/* <td>{hotel.hotelTypeName}</td> */}
                                                                <td>
                                                                    {editingRow === hotel.id ? (
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            value={hotel.hotelTypeName}
                                                                            onChange={(e) =>
                                                                                setHotelData((prevData) =>
                                                                                    prevData.map((h) =>
                                                                                        h.id === hotel.id
                                                                                            ? {
                                                                                                ...h,
                                                                                                hotelTypeName: e.target.value,
                                                                                            }
                                                                                            : h
                                                                                    )
                                                                                )
                                                                            }
                                                                        />
                                                                    ) : (
                                                                        hotel.hotelTypeName
                                                                    )}
                                                                </td>
                                                                {/*<td>{hotel.description}</td>*/}
                                                                <td>
                                                                    {editingRow === hotel.id ? (
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            value={hotel.description}
                                                                            onChange={(e) =>
                                                                                setHotelData((prevData) =>
                                                                                    prevData.map((h) =>
                                                                                        h.id === hotel.id
                                                                                            ? {
                                                                                                ...h,
                                                                                                description: e.target.value,
                                                                                            }
                                                                                            : h
                                                                                    )
                                                                                )
                                                                            }
                                                                        />
                                                                    ) : (
                                                                        hotel.description
                                                                    )}
                                                                </td>
                                                                {/*<td>*/}
                                                                {/*    <button className="btn btn-sm btn-success me-2">*/}
                                                                {/*        <i className="mdi mdi-square-edit-outline"></i>*/}
                                                                {/*    </button>*/}
                                                                {/*    <button className="btn btn-sm btn-danger"*/}
                                                                {/*            onClick={() => removeHotelType(hotel.id)}>*/}
                                                                {/*        <i className="mdi mdi-trash-can"></i>*/}
                                                                {/*    </button>*/}
                                                                {/*</td>*/}
                                                                <td>
                                                                    {editingRow === hotel.id ? (
                                                                        <>
                                                                            <button
                                                                                className="btn btn-sm btn-primary me-2"
                                                                                onClick={() => updateHotelData(hotel)}
                                                                            >
                                                                                Save
                                                                            </button>
                                                                            <button
                                                                                className="btn btn-sm btn-secondary me-2"
                                                                                onClick={() => {
                                                                                    setHotelData((prevData) =>
                                                                                        prevData.map((h) =>
                                                                                            h.id === editedHotel.id
                                                                                                ? editedHotel
                                                                                                : h
                                                                                        )
                                                                                    );
                                                                                    setEditingRow(null);
                                                                                }}
                                                                            >
                                                                                Cancel
                                                                            </button>
                                                                        </>
                                                                    ) : (
                                                                        <button
                                                                            className="btn btn-sm btn-success me-2"
                                                                            onClick={() => {
                                                                                setEditingRow(hotel.id);
                                                                                setEditedHotel({ ...hotel });
                                                                            }}
                                                                        >
                                                                            <i className="mdi mdi-square-edit-outline"></i>
                                                                        </button>
                                                                    )}

                                                                </td>
                                                                <td>
                                                                    <div className="form-check form-switch">
                                                                        <input
                                                                            className="form-check-input"
                                                                            type="checkbox"
                                                                            checked={hotel.isActive}
                                                                            onChange={() => handleSwitchChange(hotel.id, !hotel.isActive)}
                                                                        />
                                                                        <label className="form-check-label px-0">
                                                                            {hotel.isActive ? 'Active' : 'Deactivated'}
                                                                        </label>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="4" className="text-center">
                                                                No Data Available
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                    <nav className="d-flex justify-content-between align-items-center mt-3">
                                        <div>
                                            <span>
                                                Page {currentPage} of {totalPages} | Total Products:{" "}
                                                {hotelData.length}
                                            </span>
                                        </div>
                                        <ul className="pagination mb-0">
                                            <li
                                                className={`page-item ${currentPage === 1 ? "disabled" : ""
                                                    }`}
                                            >
                                                <button className="page-link" onClick={handlePrevious}>
                                                    &laquo;
                                                </button>
                                            </li>
                                            {[...Array(totalPages)].map((_, index) => (
                                                <li
                                                    className={`page-item ${currentPage === index + 1 ? "active" : ""
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
                                                className={`page-item ${currentPage === totalPages ? "disabled" : ""
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
                                <form className="forms row" onSubmit={addHotelType}>
                                    <div className="form-group col-md-12">
                                        <label>Hotel Type  <span className="text-danger ">*</span></label>
                                        <input
                                            type="text"
                                            className="form-control  border border-danger"
                                            name="hotelType"
                                            placeholder="Enter Hotel Type"
                                            value={formData.hotelType}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label>No. Of Star <span className="text-danger ">*</span></label>
                                        <input
                                            type="text"
                                            className="form-control  border border-danger"
                                            name="description"
                                            placeholder="No. Of Star "
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group col-md-12 d-flex justify-content-end">
                                        <button type="submit" className="btn btn-primary me-2" disabled={!isFormValid}>
                                            Submit
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

                            {confirmDialog.isOpen && (
                                <div className="modal d-block" tabIndex="-1" role="dialog">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title">Confirm Status Change</h5>
                                                <button type="button" className="close" onClick={() => handleConfirm(false)}>
                                                    <span>&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <p>Are you sure you want to {confirmDialog.newStatus ? 'activate' : 'deactivate'} <strong>{hotelData.find(hotel => hotel.id === confirmDialog.roomId)?.hotelTypeName}</strong>?</p>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" onClick={() => handleConfirm(false)}>No</button>
                                                <button type="button" className="btn btn-primary" onClick={() => handleConfirm(true)}>Yes</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Package;
