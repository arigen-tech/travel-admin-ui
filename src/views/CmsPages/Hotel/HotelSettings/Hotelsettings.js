import React, { useState } from "react";

const Hotelsettings = () => {
    const [showForm, setShowForm] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 3;
    const totalProducts = 12;

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
                            <h4 className="card-title">Domestic Hotel</h4>

                        </div>
                        <div className="card-body">

                            <form className="forms row">
                                <div className="form-group col-md-4">
                                    <label>Heading</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="Internation Hotels"
                                        placeholder="Internation Hotels"
                                    />
                                </div>
                                <div className="form-group col-md-4">
                                    <label>ISubHeading</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="star"
                                        placeholder="ISubHeading"
                                    />
                                </div>
                                <div className="form-group col-md-4">
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
                                <div className="form-group col-md-12">
                                    <label htmlFor="bannerText">Banner Text</label>
                                    <textarea
                                        type="text"
                                        className="form-control"
                                        id="bannerText"
                                        placeholder="Hotels"
                                        rows="4"
                                    />
                                </div>


                                <div className="form-group col-md-12 d-flex justify-content-end">
                                    <button type="submit" className="btn btn-primary me-2">
                                        Save
                                    </button>
                                   
                                </div>
                                <div className="form-group col-md-4">
                                    <label>Heading</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="Internation Hotels"
                                        placeholder="Internation Hotels"
                                    />
                                </div>
                                <div className="form-group col-md-4">
                                    <label>ISubHeading</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="star"
                                        placeholder="ISubHeading"
                                    />
                                </div>
                                <div className="form-group col-md-4">
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
                                <div className="form-group col-md-12">
                                    <label htmlFor="bannerText">Banner Text</label>
                                    <textarea
                                        type="text"
                                        className="form-control"
                                        id="bannerText"
                                        placeholder="Hotels"
                                        rows="4"
                                    />
                                </div>


                                <div className="form-group col-md-12 d-flex justify-content-end">
                                    <button type="submit" className="btn btn-primary me-2">
                                        Save
                                    </button>
                                   
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hotelsettings;
