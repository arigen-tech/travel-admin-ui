import React, {useEffect, useState} from "react";
import {getRequest,uploadFileWithJson} from "../../../../service/apiService";
import {AMENITIES} from "../../../../config/apiConfig";

const Amenities = () => {
    const [showForm, setShowForm] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [editAmenity, setEditAmenity] = useState(null);
    const [amenityData, setAmenityData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const resultsPerPage = 10;
    const [formData, setFormData] = useState({
        name: editAmenity ? editAmenity.name : "",
        icon: editAmenity ? editAmenity.icon : "",
        image: null,
    });
    const paginatedAmenities = amenityData.slice(
        (currentPage - 1) * resultsPerPage,
        currentPage * resultsPerPage
    );

    const fetchAmenitiesData = async () => {
        setLoading(true);
        try {
            const data = await getRequest(AMENITIES);
            debugger;
            if (data.status === 200 && Array.isArray(data.response)) {
                setAmenityData(data.response); // Set the 'response' array to state
                setTotalPages(Math.ceil(data.response.length / resultsPerPage)); // Calculate total pages
            } else {
                console.error("Unexpected API response format:", data);
                setAmenityData([]);
                setTotalPages(1);
            }
        } catch (error) {
            console.error("Error fetching amenities data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAmenitiesData();
    }, []);
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
            setAmenityData(
                amenityData.map((amenity) =>
                    amenity.id === editAmenity.id
                        ? { ...amenity, name, icon }
                        : amenity
                )
            );
        } else {
            const newAmenity = {
                id: amenityData.length + 1,
                name,
                icon,
            };
            setAmenityData([...amenityData, newAmenity]);
        }

        setShowForm(false);
        setEditAmenity(null);
        event.target.reset();
    };

    const handleDelete = (id) => {
        setAmenityData(amenityData.filter((amenity) => amenity.id !== id));
    };

    const handleEdit = (amenity) => {
        setEditAmenity(amenity);
        setShowForm(true);
    };
    const handleCreateFormSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();
        form.append("json", JSON.stringify({
            name: formData.name,
            icon: formData.icon,
        }));

        if (formData.image) {
            form.append("files", formData.image);
        }
        debugger;
        let json={
            "amenityName":formData.name,
            "description":formData.icon,
        }

        try {
            const response = uploadFileWithJson(AMENITIES,json,formData.image);
            debugger;
                // await fetch("http://localhost:8080/api/upload", {
        //         method: "POST",
        //         body: form,
        //     });
        //
        //     if (response.ok) {
        //         console.log("Upload successful");
        //         // Handle successful response
        //     } else {
        //         console.error("Upload failed");
        //         // Handle error
        //     }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // Handle file input change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            image: file,
        });
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
                                                {paginatedAmenities.map((amenityData, index) => (
                                                    <tr key={amenityData.id}>
                                                        <td>{(currentPage - 1) * resultsPerPage + index + 1}</td>
                                                        <td>{amenityData.amenityName}</td>
                                                        <td>{amenityData.description}</td>
                                                        <td>
                                                            <button
                                                                className="btn btn-sm btn-success me-2"
                                                                onClick={() => handleEdit(amenityData)}
                                                            >
                                                                <i className="mdi mdi-square-edit-outline"></i>
                                                            </button>
                                                            <button
                                                                className="btn btn-sm btn-danger"
                                                                onClick={() => handleDelete(amenityData.id)}
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
                                                Page {currentPage} of {totalPages} | Total Amenities: {amenityData.length}
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
                                    // <form className="forms row" onSubmit={handleFormSubmit}>
                                    //     <div className="form-group col-md-12">
                                    //         <label>Amenities Details</label>
                                    //         <input
                                    //             type="text"
                                    //             className="form-control"
                                    //             name="name"
                                    //             defaultValue={editAmenity ? editAmenity.name : ""}
                                    //             placeholder="Enter Amenity Name"
                                    //             required
                                    //         />
                                    //     </div>
                                    //     <div className="form-group col-md-12">
                                    //         <label>Icons</label>
                                    //         <input
                                    //             type="text"
                                    //             className="form-control"
                                    //             name="icon"
                                    //             defaultValue={editAmenity ? editAmenity.icon : ""}
                                    //             placeholder="Only fa-icons accepted"
                                    //         />
                                    //     </div>
                                    //     <div className="form-group col-md-12">
                                    //         <label htmlFor="imagePicker">Icon Image</label>
                                    //         <input
                                    //             type="file"
                                    //             className="form-control"
                                    //             id="Icon Image"
                                    //             accept="image/*"
                                    //             placeholder="No image chosen"
                                    //             onChange={(e) => {
                                    //                 const fileName = e.target.files[0]?.name || "No image chosen";
                                    //             }}
                                    //         />
                                    //     </div>
                                    //     <div className="form-group col-md-12 d-flex justify-content-end">
                                    //         <button type="submit" className="btn btn-primary me-2">
                                    //             Submit
                                    //         </button>
                                    //         <button
                                    //             type="button"
                                    //             className="btn btn-danger"
                                    //             onClick={() => {
                                    //                 setShowForm(false);
                                    //                 setEditAmenity(null);
                                    //             }}
                                    //         >
                                    //             Cancel
                                    //         </button>
                                    //     </div>
                                    // </form>
                                    <form className="forms row" onSubmit={handleCreateFormSubmit}>
                                        <div className="form-group col-md-12">
                                            <label>Amenities Details</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="name"
                                                value={formData.name}
                                                onChange={(e) =>
                                                    setFormData({...formData, name: e.target.value})
                                                }
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
                                                value={formData.icon}
                                                onChange={(e) =>
                                                    setFormData({...formData, icon: e.target.value})
                                                }
                                                placeholder="Only fa-icons accepted"
                                            />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label htmlFor="imagePicker">Icon Image</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                accept="image/*"
                                                onChange={handleFileChange}
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
