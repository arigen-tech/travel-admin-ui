import React, {useState, useRef, useEffect} from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import {getRequest} from "../../../../service/apiService";
import {GET_HOTEL_DETAILS, GET_HOTEL_TYPE} from "../../../../config/apiConfig";
const Hoteldetails = () => {
    const [showForm, setShowForm] = useState(false);
    const [hotelData, setHotelData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const summaryEditorToolbarRef = useRef(null);
    const noteEditorToolbarRef = useRef(null);
    const uploadHeadContent = useRef(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [totalProducts,setTotalProducts ]= useState(0);
    const [resultsPerPage,setResultsPerPage] = useState(10); // Show 10 results per page
    const editorToolbarRef = useRef(null);
    const [hotelType,setHotelType]=useState([]);
    const [formdata,setFormData]=useState({hotelName : "",hotelType:-1,

    });
    const fetchHotelType = async () => {
        setLoading(true);
        try {
            const data = await getRequest(GET_HOTEL_TYPE);
            if (data.status === 200 && Array.isArray(data.response)) {
                setHotelType(data.response); // Set the 'response' array to state
            } else {
                setHotelType([]);
            }
        } catch (error) {
            console.error("Error fetching hotel type:", error);
        } finally {
            setLoading(false);
        }
    };
    const fetchHotelData = async () => {
        setLoading(true);
        try {
            const data = await getRequest(GET_HOTEL_DETAILS);
            if (data.status === 200 && Array.isArray(data.response)) {
                setHotelData(data.response); // Set the 'response' array to state
                setTotalProducts(data.response.length);
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
        fetchHotelType();
    }, []);
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
    const paginatedData = hotelData.slice(
        (currentPage - 1) * resultsPerPage,
        currentPage * resultsPerPage
    );
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
                                                <tr >
                                                    <th>S No.</th>
                                                    <th>Name</th>
                                                    <th>Hotel type</th>
                                                    <th>Country</th>
                                                    <th>State</th>
                                                    <th>City</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {paginatedData.length > 0 ? (
                                                paginatedData.map((hotel, index) => (
                                                <tr key={index}>
                                                    <td>{(currentPage - 1) * resultsPerPage + index + 1}</td>
                                                    <td>{hotel.hotelName}</td>
                                                    <td>{hotel.hotelType.hotelTypeName}</td>
                                                    <td>{hotel.country.countryName}</td>
                                                    <td>{hotel.state.stateName}</td>
                                                    <td>{hotel.city.cityName}</td>
                                                    <td>
                                                        <button className="btn btn-sm btn-success me-2"><i className="mdi mdi-square-edit-outline"></i></button>
                                                        <button className="btn btn-sm btn-danger"><i className="mdi mdi-trash-can"></i></button>
                                                    </td>
                                                </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="7" className="text-center">
                                                        No Data Available
                                                    </td>
                                                </tr>
                                            )}
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
                                            {hotelType.map((hotel) => (
                                                <option key={hotel.id} value={hotel.hotelTypeName}>
                                                    {hotel.hotelTypeName}
                                                </option>
                                            ))}
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
