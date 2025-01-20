import React, { useState , useEffect} from "react"

const Facilities = () => {
    const [showForm, setShowForm] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [categoryInput, setCategoryInput] = useState("")
    const [iconInput, setIconInput] = useState("")
    const [editingFacility, setEditingFacility] = useState(null) 
    const recordsPerPage = 10; 
    const [totalRecords, setTotalRecords] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, newStatus: null, roomId: null })
    const [searchTerm, setSearchTerm] = useState("")
    const [isFormValid, setIsFormValid] = useState(false)

    const [facilitiesData, setFacilitiesData] = useState([
        {
            "S.No.": 1,
            Name: "Swimming Pool",
            Icon: "",
            Category: "Recreation",
            Action: "Edit",
            isActive: true,
        },
        {
            "S.No.": 2,
            Name: "Gym",
            Icon: "",
            Category: "Fitness",
            Action: "Edit",
            isActive: true,
        },
        {
            "S.No.": 3,
            Name: "Spa",
            Icon: "",
            Category: "Wellness",
            Action: "Edit",
            isActive: true,
        },
    ])

    const filteredFacilities = facilitiesData.filter(facility =>
        facility.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        facility.Category.toLowerCase().includes(searchTerm.toLowerCase())
    )

    useEffect(() => {
        setTotalRecords(filteredFacilities.length);
        setTotalPages(Math.ceil(filteredFacilities.length / recordsPerPage));
        setIsFormValid(categoryInput.trim() !== "" && iconInput.trim() !== "")
      }, [categoryInput, iconInput, filteredFacilities])
    

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    const handleSaveCategory = () => {
        setShowModal(false)
    }

    const handleEdit = (facility) => {
        setShowForm(true)
        setEditingFacility(facility)
    }

    const handleStatusToggle = (facilityId, newStatus) => {
        const facility = facilitiesData.find(facility => facility["S.No."] === facilityId);
        setConfirmDialog({
            isOpen: true,
            facilityId: facilityId,
            newStatus: newStatus
        });
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
        setCurrentPage(1)
    }

   

    const handleConfirm = (confirmed) => {
        if (confirmed) {
            // Implement logic to update facility status
            const updatedFacilities = facilitiesData.map((facility) => {
                if (facility["S.No."] === confirmDialog.facilityId) {
                    return { ...facility, isActive: confirmDialog.newStatus }
                }
                return facility
            })
            // Update state with updated facilitiesData
            setFacilitiesData(updatedFacilities)
        }
        setConfirmDialog({ isOpen: false, newStatus: null, roomId: null })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle form submission logic here
        if (editingFacility) {
            // Update existing facility
        } else {
            // Add new facility
        }
        setShowForm(false)
        setEditingFacility(null)
    }

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
                                        <form className="d-inline-block serachform" role="search">
                                            <div className="input-group searchinput">
                                                <input
                                                    type="search"
                                                    className="form-control"
                                                    placeholder="Search"
                                                    aria-label="Search"
                                                    aria-describedby="search-icon"
                                                    value={searchTerm} // Ensure this is bound to searchTerm
                                                    onChange={handleSearch}
                                                />
                                                <span className="input-group-text" id="search-icon">
                                                    <i className="mdi mdi-magnify"></i>
                                                </span>
                                            </div>
                                        </form>
                                        <button type="button" className="btn btn-success me-2" onClick={() => setShowForm(true)}>
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
                                            setShowForm(false)
                                            setEditingFacility(null) // Reset editing state
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
                                                    <th>Category</th>
                                                    <th>Edit</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredFacilities.map((facility, index) => (
                                                    <tr key={index}>
                                                        <td>{facility["S.No."]}</td>
                                                        <td>{facility.Name}</td>
                                                        <td>
                                                            <i className={`mdi ${facility.Icon}`}></i>
                                                        </td>
                                                        <td>{facility.Category}</td>
                                                        <td>
                                                            <button
                                                                className="btn btn-sm btn-success me-2"
                                                                onClick={() => handleEdit(facility)}
                                                                disabled={!facility.isActive}
                                                            >
                                                                <i className="mdi mdi-square-edit-outline"></i>
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <div className="form-check form-switch">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    checked={facility.isActive}
                                                                    onChange={() => handleStatusToggle(facility["S.No."], !facility.isActive)}
                                                                />
                                                                <label className="form-check-label px-0">
                                                                    {facility.isActive ? "Active" : "Deactive"}
                                                                </label>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <nav className="d-flex justify-content-between align-items-center mt-3">
                                        <div>
                                            <span>
                                            Page {currentPage} of {totalPages} | Total Records: {totalRecords}
                                            </span>
                                        </div>
                                        <ul className="pagination mb-0">
                                            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                                <button className="page-link" onClick={handlePrevious}>
                                                    &laquo;
                                                </button>
                                            </li>
                                            {[...Array(totalPages)].map((_, index) => (
                                                <li className={`page-item ${currentPage === index + 1 ? "active" : ""}`} key={index}>
                                                    <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
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
                                <form className="forms row" onSubmit={handleSubmit}>
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
                                        <label>Name  <span className="text-danger">*</span></label>
                                        <input type="text" value={categoryInput} className="form-control" id="star" placeholder="Name"  onChange={(e) => setCategoryInput(e.target.value)}/>
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="bannerText">Icon Only MUI icons are allowed  <span className="text-danger">*</span></label>
                                        <textarea
                                            type="text"
                                            value={iconInput}
                                            className="form-control"
                                            id="bannerText"
                                            placeholder=""
                                            rows="4"
                                            onChange={(e) => setIconInput(e.target.value)}
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
                                                const fileName = e.target.files[0]?.name || "No image chosen"
                                            }}
                                        />
                                    </div>
                                    <div className="form-group col-md-12 d-flex justify-content-end">
                                        <button type="submit" className="btn btn-primary me-2"disabled={!isFormValid}>
                                            {editingFacility ? "Update" : "Save"}
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={() => {
                                                setShowForm(false)
                                                setEditingFacility(null)
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

            {showModal && (
                <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
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
                                <p>Are you sure you want to {confirmDialog.newStatus ? "activate" : "deactivate"} this facility?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => handleConfirm(false)}>
                                    No
                                </button>
                                <button type="button" className="btn btn-primary" onClick={() => handleConfirm(true)}>
                                    Yes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Facilities

