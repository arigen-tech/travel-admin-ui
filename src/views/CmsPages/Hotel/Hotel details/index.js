import React, { useState, useRef, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import { getRequest } from "../../../../service/apiService";
import {
  GET_HOTEL_DETAILS,
  GET_HOTEL_TYPE,
} from "../../../../config/apiConfig";
import { AMENITIES, API_HOST, tableImage } from "../../../../config/apiConfig";

const Hoteldetails = () => {
  const [formData, setFormData] = useState({
    hotelName: "",
    hotelType: -1,
    countryId: "",
    stateId: "",
    cityId: "",
    hotelTypeId: "",
    amenityId: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [hotelData, setHotelData] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [hotelTypeData, setHotelTypeData] = useState([]);
  const [amenityData, setAmenityData] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const summaryEditorToolbarRef = useRef(null);
  const noteEditorToolbarRef = useRef(null);
  const uploadHeadContent = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const [resultsPerPage, setResultsPerPage] = useState(10); // Show 10 results per page
  const editorToolbarRef = useRef(null);
  const [hotelType, setHotelType] = useState([]);

  const fetchCountryData = async () => {
    setLoading(true);
    try {
      const GETALL = "/masterController/getAllCountries";
      const data = await getRequest(GETALL);
      if (data.status === 200 && Array.isArray(data.response)) {
        setCountryData(data.response);
      } else {
        console.error("Unexpected API response format:", data);
        setCountryData([]);
      }
    } catch (error) {
      console.error("Error fetching country data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStateData = async (countryCode) => {
    setLoading(true);
    try {
      const GET_STATES = `/masterController/getStatesByCountry/${countryCode}`;
      const data = await getRequest(GET_STATES);
      if (data.status === 200 && Array.isArray(data.response)) {
        setStateData(data.response);
      } else {
        console.error("Unexpected API response format:", data);
        setStateData([]);
      }
    } catch (error) {
      console.error("Error fetching state data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCityData = async (stateCode) => {
    setLoading(true);
    try {
      const GET_CITIES = `/masterController/getCityByState/${stateCode}`;
      const data = await getRequest(GET_CITIES);
      if (data.status === 200 && Array.isArray(data.response)) {
        setCityData(data.response);
      } else {
        console.error("Unexpected API response format:", data);
        setCityData([]);
      }
    } catch (error) {
      console.error("Error fetching city data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchHotelTypeData = async () => {
    setLoading(true);
    try {
      const GETALL = "/masterController/getAllHotelType";
      const data = await getRequest(GETALL);
      if (data.status === 200 && Array.isArray(data.response)) {
        setHotelTypeData(data.response);
      } else {
        console.error("Unexpected API response format:", data);
        setHotelTypeData([]);
      }
    } catch (error) {
      console.error("Error fetching HotelType data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAmenityData = async () => {
    setLoading(true);
    try {
      const data = await getRequest(AMENITIES);
      if (data.status === 200 && Array.isArray(data.response)) {
        setAmenityData(data.response);
      } else {
        console.error("Unexpected API response format:", data);
        setAmenityData([]);
      }
    } catch (error) {
      console.error("Error fetching Amenity data:", error);
      setAmenityData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountryData();
    fetchHotelTypeData();
    fetchAmenityData();
  }, []);

  const handleCountryChange = (countryCode) => {
    setFormData((prevState) => ({
      ...prevState,
      countryId: countryCode,
      stateId: "",
      cityId: "",
    }));
    fetchStateData(countryCode);
  };

  const handleStateChange = (stateCode) => {
    setFormData((prevState) => ({
      ...prevState,
      stateId: stateCode,
      cityId: "",
    }));
    fetchCityData(stateCode);
  };

  const handleCityChange = (cityId) => {
    setFormData((prevState) => ({
      ...prevState,
      cityId: cityId,
    }));
  };

  const handleHotelTypeChange = (hotelTypeId) => {
    setFormData((prevState) => ({
      ...prevState,
      hotelTypeId: hotelTypeId,
    }));
  };

  const handleAmenityChange = (e) => {
    const { id, checked } = e.target;

    setSelectedAmenities((prevSelected) => {
      if (checked) {
        return [...prevSelected, id];
      } else {
        return prevSelected.filter((amenity) => amenity !== id);
      }
    });
  };

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
  const [rows, setRows] = useState([{ id: 1, name: "", alt: "", file: null }]);
  const [hotelRows, setHotelRows] = useState([{ id: 1, file: null }]);

  const addImageRow = (e) => {
    e.preventDefault();
    const newId = rows.length > 0 ? Math.max(...rows.map((r) => r.id)) + 1 : 1;
    setRows([...rows, { id: newId, name: "", alt: "", file: null }]);
  };

  const removeImageRow = (id) => {
    setRows(rows.filter((row) => row.id !== id));
    setShowForm(true);
  };

  const addHotelRow = (e) => {
    e.preventDefault();
    const newId =
      hotelRows.length > 0 ? Math.max(...hotelRows.map((r) => r.id)) + 1 : 1;
    setHotelRows([...hotelRows, { id: newId, file: null }]);
  };

  const removeHotelRow = (id) => {
    setHotelRows(hotelRows.filter((row) => row.id !== id));
  };

  const handleInputChange = (id, field, value) => {
    setRows(
      rows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
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
                        {paginatedData.length > 0 ? (
                          paginatedData.map((hotel, index) => (
                            <tr key={index}>
                              <td>
                                {(currentPage - 1) * resultsPerPage + index + 1}
                              </td>
                              <td>{hotel.hotelName}</td>
                              <td>{hotel.hotelType.hotelTypeName}</td>
                              <td>{hotel.country.countryName}</td>
                              <td>{hotel.state.stateName}</td>
                              <td>{hotel.city.cityName}</td>
                              <td>
                                <button className="btn btn-sm btn-success me-2">
                                  <i className="mdi mdi-square-edit-outline"></i>
                                </button>
                                <button className="btn btn-sm btn-danger">
                                  <i className="mdi mdi-trash-can"></i>
                                </button>
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
                        Page {currentPage} of {totalPages} | Total Products:{" "}
                        {totalProducts}
                      </span>
                    </div>
                    <ul className="pagination mb-0">
                      <li
                        className={`page-item ${
                          currentPage === 1 ? "disabled" : ""
                        }`}
                      >
                        <button className="page-link" onClick={handlePrevious}>
                          &laquo;
                        </button>
                      </li>
                      {[...Array(totalPages)].map((_, index) => (
                        <li
                          className={`page-item ${
                            currentPage === index + 1 ? "active" : ""
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
                        className={`page-item ${
                          currentPage === totalPages ? "disabled" : ""
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
                <form className="forms row">
                  <div className="form-group col-md-6">
                    <label htmlFor="hotelDropdown">Select Hotel</label>
                    <select
                      className="form-select"
                      style={{ paddingRight: "40px" }}
                      value={formData.categoryId}
                      onChange={(e) =>
                        handleHotelTypeChange(parseInt(e.target.value, 10))
                      }
                      disabled={loading}
                    >
                      <option value="">Select Hotel Type</option>
                      {hotelTypeData.map((hotelType) => (
                        <option key={hotelType.id} value={hotelType.id}>
                          {hotelType.hotelTypeName}
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
                    <input
                      type="number"
                      className="form-control"
                      placeholder=""
                    />
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
                        const fileName =
                          e.target.files[0]?.name || "No image chosen";
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
                        const fileName =
                          e.target.files[0]?.name || "No image chosen";
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
                        const fileName =
                          e.target.files[0]?.name || "No image chosen";
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
                      className="form-select"
                      value={formData.countryId}
                      onChange={(e) => handleCountryChange(e.target.value)}
                      disabled={loading}
                    >
                      <option value="">Select Country</option>
                      {countryData.map((country) => (
                        <option key={country.id} value={country.countryCode}>
                          {country.countryName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group col-md-6">
                    <label htmlFor="hotelDropdown">State</label>
                    <select
                      className="form-select"
                      value={formData.stateId}
                      onChange={(e) => handleStateChange(e.target.value)}
                      disabled={loading || !formData.countryId}
                    >
                      <option value="">Select State</option>
                      {stateData.map((state) => (
                        <option key={state.id} value={state.stateCode}>
                          {state.stateName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="hotelDropdown">City</label>
                    <select
                      className="form-select"
                      value={formData.cityId}
                      onChange={(e) => handleCityChange(e.target.value)}
                      disabled={loading || !formData.stateId}
                    >
                      <option value="">Select City</option>
                      {cityData.map((city) => (
                        <option key={city.id} value={city.id}>
                          {city.cityName}
                        </option>
                      ))}
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
                    <label>Amenities</label>
                    <div className="row mx-0">
                      {loading ? (
                        <div>Loading amenities...</div>
                      ) : (
                        amenityData.map((amenity) => (
                          <div className="form-check col-md-3" key={amenity.id}>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={amenity.amenityName}
                              onChange={handleAmenityChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={amenity.amenityName}
                            >
                              {amenity.amenityName}
                            </label>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <div className="form-group col-md-12">
                    <label>Short Description</label>
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
                        toolbarContainer.appendChild(
                          editor.ui.view.toolbar.element
                        );
                      }}
                      onChange={handleEditorChange}
                    />
                  </div>
                  <div className="form-group col-md-12">
                    <label>Long Description</label>
                    <div ref={summaryEditorToolbarRef}></div>
                    <CKEditor
                      editor={DecoupledEditor}
                      config={{
                        toolbar: {
                          shouldNotGroupWhenFull: true,
                        },
                      }}
                      onReady={(editor) => {
                        const toolbarContainer =
                          summaryEditorToolbarRef.current;
                        toolbarContainer.innerHTML = "";
                        toolbarContainer.appendChild(
                          editor.ui.view.toolbar.element
                        );
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
                        toolbarContainer.appendChild(
                          editor.ui.view.toolbar.element
                        );
                      }}
                      onChange={handleEditorChange}
                    />
                  </div>
                  <div className="form-check col-md-12">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id=" isFeatured"
                    />
                    <label className="form-check-label" htmlFor="isFeatured">
                      isFeatured{" "}
                    </label>
                  </div>
                  <div className="container mt-4">
                    <div className="row mb-3 align-items-center">
                      <div className="col">
                        <h4 className="mb-0">Select Image</h4>
                      </div>
                      <div className="col-auto">
                        <button
                          onClick={addImageRow}
                          className="btn btn-success"
                        >
                          <i className="bi bi-plus-lg me-1"></i> +
                        </button>
                      </div>
                    </div>

                    {rows.map((row, index) => (
                      <div
                        key={row.id}
                        className="row mb-3 pb-3 border-bottom position-relative"
                      >
                        <div className="form-group col-md-4">
                          <label>Image Name #{index + 1}</label>
                          <input
                            type="text"
                            className="form-control"
                            id="star"
                            placeholder="Heading"
                          />
                        </div>
                        <div className="form-group col-md-4">
                          <label>Alt Tag #{index + 1}</label>
                          <input
                            type="text"
                            className="form-control"
                            id="star"
                            placeholder="Alt Tag"
                          />
                        </div>

                        <div className="form-group col-md-4">
                          <label htmlFor="imagePicker">
                            Image File #{index + 1}
                          </label>
                          <input
                            type="file"
                            className="form-control"
                            id="imagePicker"
                            accept="image/*"
                            placeholder="No image chosen"
                            onChange={(e) => {
                              const fileName =
                                e.target.files[0]?.name || "No image chosen";
                            }}
                          />
                        </div>
                        {index > 0 && (
                          <button
                            onClick={() => removeImageRow(row.id)}
                            className="btn btn-danger btn-sm position-absolute top-0 end-0 mt-2 me-2"
                            style={{
                              width: "30px",
                              height: "30px",
                              padding: "0",
                              borderRadius: "50%",
                            }}
                          >
                            <i className="bi bi-cross">X</i>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="container mt-4">
                    <div className="row mb-3 align-items-center">
                      <div className="col">
                        <h4>Upload Hotel Content</h4>
                      </div>
                      <div className="col-auto">
                        <button
                          onClick={addHotelRow}
                          className="btn btn-success"
                        >
                          <i className="bi bi-plus-lg me-1"></i> +
                        </button>
                      </div>
                    </div>

                    {hotelRows.map((row, index) => (
                      <div
                        key={row.id}
                        className="row mb-3 pb-3 border-bottom position-relative"
                      >
                        <div className="form-group col-md-4">
                          <label htmlFor={`hotelImagePicker${row.id}`}>
                            Image File #{index + 1}
                          </label>
                          <input
                            type="file"
                            className="form-control"
                            id={`hotelImagePicker${row.id}`}
                            accept="image/*"
                            placeholder="No image chosen"
                          />
                        </div>
                        <div className="form-group col-md-4">
                          <label htmlFor="imagePicker">
                            Image File #{index + 1}
                          </label>
                          <input
                            type="file"
                            className="form-control"
                            id={`imagePicker${row.id}`}
                            accept="image/*"
                            placeholder="No image chosen"
                            onChange={(e) => {
                              const fileName =
                                e.target.files[0]?.name || "No image chosen";
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
                              const toolbarContainer =
                                uploadHeadContent.current;
                              toolbarContainer.innerHTML = "";
                              toolbarContainer.appendChild(
                                editor.ui.view.toolbar.element
                              );
                            }}
                            onChange={handleEditorChange}
                          />
                        </div>
                        {index > 0 && (
                          <button
                            onClick={() => removeHotelRow(row.id)}
                            className="btn btn-danger btn-sm position-absolute top-0 end-0 mt-2 me-2"
                            style={{
                              width: "30px",
                              height: "30px",
                              padding: "0",
                              borderRadius: "50%",
                            }}
                          >
                            <i className="bi bi-x">X</i>
                          </button>
                        )}
                      </div>
                    ))}
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
