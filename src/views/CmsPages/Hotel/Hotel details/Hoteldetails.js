import React, { useState, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
const Hoteldetails = () => {
    const [showForm, setShowForm] = useState(false);
    const summaryEditorToolbarRef = useRef(null);
    const noteEditorToolbarRef = useRef(null);
    const uploadHeadContent = useRef(null);


    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 3;
    const totalProducts = 12;
    const editorToolbarRef = useRef(null);
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
                            <h4 className="card-title">Hotel</h4>
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
                                                    <th>Hotel type</th>
                                                    <th>Country</th>
                                                    <th>State</th>
                                                    <th>City</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>ibis Styles Goa Calangute Resort An AccorHotels B</td>
                                                    <td>3 Star</td>
                                                    <th> India</th>
                                                    <th>Goa</th>
                                                    <th>Calangute</th>
                                                    <td>
                                                        <button className="btn btn-sm btn-success me-2"><i className="mdi mdi-square-edit-outline"></i></button>
                                                        <button className="btn btn-sm btn-danger"><i className="mdi mdi-trash-can"></i></button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td>The Lalit Grand Palace Srinagar</td>
                                                    <td>5 Star</td>
                                                    <th> India</th>
                                                    <th>Jammu and Kashmir</th>
                                                    <th>Jammu</th>
                                                    <td>
                                                        <button className="btn btn-sm btn-success me-2"><i className="mdi mdi-square-edit-outline"></i></button>
                                                        <button className="btn btn-sm btn-danger"><i className="mdi mdi-trash-can"></i></button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>3</td>
                                                    <td>The dream garden</td>
                                                    <td>3 Star</td>
                                                    <th> India</th>
                                                    <th>Krabi</th>
                                                    <th>Krabi</th>
                                                    <td>
                                                        <button className="btn btn-sm btn-success me-2"><i className="mdi mdi-square-edit-outline"></i></button>
                                                        <button className="btn btn-sm btn-danger"><i className="mdi mdi-trash-can"></i></button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>4</td>
                                                    <td>Courtyard Kochi Airport</td>
                                                    <td>5 Star</td>
                                                    <th> India</th>
                                                    <th>Kerala</th>
                                                    <th>Kochi</th>
                                                    <td>
                                                        <button className="btn btn-sm btn-success me-2"><i className="mdi mdi-square-edit-outline"></i></button>
                                                        <button className="btn btn-sm btn-danger"><i className="mdi mdi-trash-can"></i></button>
                                                    </td>
                                                </tr> <tr>
                                                    <td>5</td>
                                                    <td>Crystal Goa Turquoise Edition</td>
                                                    <td>3 Star</td>
                                                    <th> India</th>
                                                    <th>Goa</th>
                                                    <th>Goa</th>
                                                    <td>
                                                        <button className="btn btn-sm btn-success me-2"><i className="mdi mdi-square-edit-outline"></i></button>
                                                        <button className="btn btn-sm btn-danger"><i className="mdi mdi-trash-can"></i></button>
                                                    </td>
                                                </tr> <tr>
                                                    <td>6</td>
                                                    <td>MOSH by the shore</td>
                                                    <td>5 Star</td>
                                                    <th> India</th>
                                                    <th>Goa</th>
                                                    <th>Goa</th>
                                                    <td>
                                                        <button className="btn btn-sm btn-success me-2"><i className="mdi mdi-square-edit-outline"></i></button>
                                                        <button className="btn btn-sm btn-danger"><i className="mdi mdi-trash-can"></i></button>
                                                    </td>
                                                </tr> <tr>
                                                    <td>7</td>
                                                    <td>Coorg Mandarin</td>
                                                    <td>4 Star</td>
                                                    <th> India</th>
                                                    <th>Karnataka</th>
                                                    <th>Madikeri</th>
                                                    <td>
                                                        <button className="btn btn-sm btn-success me-2"><i className="mdi mdi-square-edit-outline"></i></button>
                                                        <button className="btn btn-sm btn-danger"><i className="mdi mdi-trash-can"></i></button>
                                                    </td>
                                                </tr> <tr>
                                                    <td>8</td>
                                                    <td>CAMPANILE VAL DE France</td>
                                                    <td>3 Star</td>
                                                    <th> India</th>
                                                    <th>Paris</th>
                                                    <th>Paris</th>
                                                    <td>
                                                        <button className="btn btn-sm btn-success me-2"><i className="mdi mdi-square-edit-outline"></i></button>
                                                        <button className="btn btn-sm btn-danger"><i className="mdi mdi-trash-can"></i></button>
                                                    </td>
                                                </tr> <tr>
                                                    <td>9</td>
                                                    <td>Calangute, Goa, India</td>
                                                    <td>3 Star</td>
                                                    <th> India</th>
                                                    <th>Goa</th>
                                                    <th>Calangute</th>
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
                                    <div className="form-group col-md-6">
                                        <label htmlFor="hotelDropdown">Select Hotel</label>
                                        <select
                                            className="form-control"
                                            id="hotelDropdown"
                                            onChange={(e) => console.log(e.target.value)}
                                        >
                                            <option value="" disabled selected>
                                                Select Hotel Type
                                            </option>

                                            <option value="3 Star">3 Star</option>
                                            <option value="Standard"> Standard</option>
                                            <option value="Deluxe"> Deluxe</option>
                                            <option value="5 Star"> 5 Star</option>
                                            <option value=""></option>
                                            <option value=""></option>

                                        </select>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="star"
                                            placeholder="Name"
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Seo URL</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="star"
                                            placeholder="Seo Url"
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>No. of Stars</label>
                                        <input type="number" className="form-control" placeholder="" />

                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Email</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="star"
                                            placeholder="Email"
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Contact No.</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="star"
                                            placeholder="Contact No."
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="imagePicker">Logo Image</label>
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
                                        <label htmlFor="imagePicker">Thumb Image</label>
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
                                    <div className="form-group col-md-4">
                                        <label>ALT Tag</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="star"
                                            placeholder="ALT Tag"
                                        />
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label htmlFor="imagePicker">Banner Image</label>
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
                                    <div className="form-group col-md-4">
                                        <label>Address 1</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="star"
                                            placeholder="Address 1"
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Address 2</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="star"
                                            placeholder="Address 2"
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Landmark</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="star"
                                            placeholder="Landmark"
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="hotelDropdown">Select Country</label>
                                        <select
                                            className="form-control"
                                            id="hotelDropdown"
                                            onChange={(e) => console.log(e.target.value)}
                                        >
                                            <option value="" disabled selected>
                                                Select Country
                                            </option>
                                            <option value="India">India</option>
                                            <option value="United States">United States</option>
                                            <option value="Canada">Canada</option>
                                            <option value="Australia">Australia</option>
                                            <option value="United Kingdom">United Kingdom</option>
                                            <option value="Germany">Germany</option>
                                            <option value="France">France</option>
                                            <option value="Italy">Italy</option>
                                            <option value="Japan">Japan</option>
                                            <option value="South Korea">South Korea</option>
                                        </select>
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label htmlFor="hotelDropdown">State</label>
                                        <select
                                            className="form-control"
                                            id="hotelDropdown"
                                            onChange={(e) => console.log(e.target.value)}
                                        >
                                            <option value="" disabled selected>
                                                Select State
                                            </option>
                                        </select>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="hotelDropdown">City</label>
                                        <select
                                            className="form-control"
                                            id="hotelDropdown"
                                            onChange={(e) => console.log(e.target.value)}
                                        >
                                            <option value="" disabled selected>
                                                Select City
                                            </option>
                                        </select>
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label>Pincode</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="star"
                                            placeholder="Pincode"
                                        />
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label>Latitude</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="star"
                                            placeholder="Latitude"
                                        />
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label>Longitude</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="star"
                                            placeholder="Longitude"
                                        />
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label>YouTube Link</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="star"
                                            placeholder="YouTube Link"
                                        />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label>Package Include</label>
                                        <div className="row mx-0">
                                            <div className="form-check col-md-1">
                                                <input className="form-check-input" type="checkbox" id="flights" />
                                                <label className="form-check-label" htmlFor="flights">Flights</label>
                                            </div>
                                            <div className="form-check col-md-1">
                                                <input className="form-check-input" type="checkbox" id="hotelStay" />
                                                <label className="form-check-label" htmlFor="hotelStay">Hotel Stay</label>
                                            </div>
                                            <div className="form-check col-md-1">
                                                <input className="form-check-input" type="checkbox" id="meals" />
                                                <label className="form-check-label" htmlFor="meals">Meals</label>
                                            </div>
                                            <div className="form-check col-md-1">
                                                <input className="form-check-input" type="checkbox" id="transfers" />
                                                <label className="form-check-label" htmlFor="transfers">Transfers</label>
                                            </div>
                                            <div className="form-check col-md-1">
                                                <input className="form-check-input" type="checkbox" id="sightseeing" />
                                                <label className="form-check-label" htmlFor="sightseeing">Sightseeing</label>
                                            </div>
                                            <div className="form-check col-md-1">
                                                <input className="form-check-input" type="checkbox" id="cruise" />
                                                <label className="form-check-label" htmlFor="cruise">Cruise</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group col-md-12">
                                        <label>Overview Description</label>
                                        <div ref={editorToolbarRef}></div>
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
                                                const toolbarContainer = editorToolbarRef.current;
                                                toolbarContainer.innerHTML = "";
                                                toolbarContainer.appendChild(editor.ui.view.toolbar.element);
                                            }}
                                            onChange={handleEditorChange}
                                        />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label>Tour Summary</label>
                                        <div ref={summaryEditorToolbarRef}></div>
                                        <CKEditor
                                            editor={DecoupledEditor}
                                            config={{
                                                toolbar: {
                                                    shouldNotGroupWhenFull: true,
                                                },
                                            }}
                                            onReady={(editor) => {
                                                const toolbarContainer = summaryEditorToolbarRef.current;
                                                toolbarContainer.innerHTML = "";
                                                toolbarContainer.appendChild(editor.ui.view.toolbar.element);
                                            }}
                                            onChange={handleEditorChange}
                                        />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label>Note</label>
                                        <div ref={noteEditorToolbarRef}></div>
                                        <CKEditor
                                            editor={DecoupledEditor}
                                            config={{
                                                toolbar: {
                                                    shouldNotGroupWhenFull: true,
                                                },
                                            }}
                                            onReady={(editor) => {
                                                const toolbarContainer = noteEditorToolbarRef.current;
                                                toolbarContainer.innerHTML = "";
                                                toolbarContainer.appendChild(editor.ui.view.toolbar.element);
                                            }}
                                            onChange={handleEditorChange}
                                        />
                                    </div>
                                    <h4>Select Image</h4>
                                    <div className="form-group col-md-4">
                                        <label>Image Name #1</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="star"
                                            placeholder="Heading"
                                        />
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label>ALT tag #1</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="star"
                                            placeholder="Alt Tag #1"
                                        />
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label htmlFor="imagePicker">Image File #1</label>
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
                                    <h4>Upload Hotel Content</h4>
                                    <div className="form-group col-md-4">
                                        <label>Heading #1</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="star"
                                            placeholder="Heading"
                                        />
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label htmlFor="imagePicker">Image File #1</label>
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
                                        <label></label>
                                        <div ref={uploadHeadContent}></div>
                                        <CKEditor
                                            editor={DecoupledEditor}
                                            config={{
                                                toolbar: {
                                                    shouldNotGroupWhenFull: true,
                                                },
                                            }}
                                            onReady={(editor) => {
                                                const toolbarContainer = uploadHeadContent.current;
                                                toolbarContainer.innerHTML = "";
                                                toolbarContainer.appendChild(editor.ui.view.toolbar.element);
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

export default Hoteldetails;
