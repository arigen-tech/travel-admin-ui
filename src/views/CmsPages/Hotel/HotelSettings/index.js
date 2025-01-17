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
                            <h4 className="card-title">Hotel Settings</h4>
                            <form className="d-inline-block serachform" role="search">
                                <div className="input-group searchinput">
                                    <input
                                        type="search"
                                        className="form-control"
                                        placeholder="Search"
                                        aria-label="Search"
                                        aria-describedby="search-icon"
                                        id="search"
                                    />
                                    <span className="input-group-text" id="search-icon">
                                        <i className="mdi mdi-magnify"></i>
                                    </span>
                                </div>
                            </form>

                        </div>
                        <div className="card-body">

                            <h5>Domestic Hotel</h5>

                            <form className="forms row">
                                <div className="form-group col-md-4">
                                    <label>Heading  <span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="Internation Hotels"
                                        placeholder="Domestic Hotels"
                                        required
                                    />
                                </div>
                                <div className="form-group col-md-4">
                                    <label>SubHeading  <span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="subheading"
                                        placeholder="SubHeading"
                                        required

                                    />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="imagePicker">Upload Image</label>
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
                                    <img
                                        className="pull-right"
                                        style={{ width: "42%", marginTop: "10px" }}
                                        src={"https://crmbeta.traviyo.in/Images/HotelSettingss/tayyeb_675/638612501944110184_temp.jpg"}
                                        alt="Uploaded Preview"
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
                                        style={{ height: '100px' }}

                                    />
                                </div>



                                <h5>International Hotel</h5>
                                <div className="form-group col-md-4">
                                    <label>Heading  <span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="International Hotels"
                                        placeholder="International Hotels"
                                        style={{ height: '40px' }}
                                        required

                                    />
                                </div>
                                <div className="form-group col-md-4">
                                    <label>ISubHeading <span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="star"
                                        placeholder="ISubHeading"
                                        required

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
                                    <img
                                        className="pull-right"
                                        style={{ width: "42%", marginTop: "10px" }}
                                        src={"https://crmbeta.traviyo.in/Images/HotelSettingss/tayyeb_675/638612501944110184_temp.jpg"}
                                        alt="Uploaded Preview"
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
                                        style={{ height: '100px' }}

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
