import React, { useRef, useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import {
  getRequest,
  uploadFileWithJson,
  postRequest,
  putRequest,
} from "../../service/apiService";
import Popup from "../../components/popup/index";
import { ITINERARY, API_HOST } from "../../config/apiConfig";

const Overview = () => {
  const initialOverviewFormData = {
    packageName: "",
    seoUrl: "",
    youtubeUrl: "",
    validFrom: "",
    validTo: "",
    packageCode: "",
    metaKeyword: "",
    title: "",
    ogTag: "",
    metaDescription: "",
    overviewDescription: "",
    tourSummary: "",
    thumbImg: null,
    noOfDays: 0,
    packageIncludes: [],
    tag: [],
    cityList: [],
  };
  const [overviewFormData, setOverviewFormData] = useState(
    initialOverviewFormData
  );
  const [searchTerm, setSearchTerm] = useState("");
  const editorToolbarRef = useRef(null);
  const summaryEditorToolbarRef = useRef(null);
  const [tagData, setTagData] = useState([]);
  const [packageIncludesData, setPackageIncludesData] = useState([]);
  const [isCityModalOpen, setCityModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDays, setSelectedDays] = useState(1);
  const [cityList, setCityList] = useState([]);
  const [totalPackageDays, setTotalPackageDays] = useState(10);
  const [totalDaysAllocated, setTotalDaysAllocated] = useState(0);
  const [noOfDays, setNoOfDays] = useState("");
  const [popup, setPopup] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [cityData, setCityData] = useState([]);

  const cities = [
    { id: 1, name: "New York" },
    { id: 2, name: "Los Angeles" },
    { id: 3, name: "Chicago" },
    { id: 4, name: "Houston" },
    { id: 5, name: "Phoenix" },
    { id: 6, name: "Philadelphia" },
    { id: 7, name: "San Antonio" },
    { id: 8, name: "San Diego" },
    { id: 9, name: "Dallas" },
    { id: 10, name: "San Jose" },
    { id: 11, name: "Austin" },
    { id: 12, name: "Jacksonville" },
  ];

  useEffect(() => {
    setPackageIncludesData([
      { id: "1", masPackage: "flights" },
      { id: "2", masPackage: "hotelStay" },
      { id: "3", masPackage: "meals" },
      { id: "4", masPackage: "transfers" },
      { id: "5", masPackage: "sightseeing" },
      { id: "6", masPackage: "cruise" },
    ]);
  }, []);

  const showPopup = (message, type = "info") => {
    setPopupMessage({
      message,
      type,
      onClose: () => {
        setPopupMessage(null);
      },
    });
  };

  const fetchTagData = async () => {
    setLoading(true);
    try {
      const GETALL = "/masterController/getAllTags";
      const data = await getRequest(GETALL);
      if (data.status === 200 && Array.isArray(data.response)) {
        setTagData(data.response);
        console.log(data.response);
      } else {
        console.error("Unexpected API response format:", data);
        setTagData([]);
      }
    } catch (error) {
      console.error("Error fetching Tag data:", error);
      setTagData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTagData();
    fetchCityData();
  }, []);

  const fetchCityData = async () => {
    setLoading(true);
    try {
      const GET_CITIES = `/masterController/getAllCities`;
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

  const onAddCity = (city, days) => {
    setOverviewFormData((prevForm) => ({
      ...prevForm,
      cityList: [
        ...(prevForm.cityList || []),
        {
          sequenceColumn: (prevForm.cityList?.length || 0) + 1,
          masCity: city,
          dayNumber: days,
        },
      ],
    }));
    setTotalDaysAllocated((prevTotal) => prevTotal + days);
  };

  const handleAddCity = (e) => {
    e.preventDefault();

    if (!selectedCity) {
      alert("Please select a city!");
      return;
    }

    if (!selectedDays || selectedDays < 1) {
      alert("Please select a valid number of days!");
      return;
    }

    if (
      overviewFormData.cityList?.some((city) => city.masCity === selectedCity)
    ) {
      alert("City is already added!");
      return;
    }

    onAddCity(selectedCity, selectedDays);
    setCityModalOpen(false);
  };

  console.log(overviewFormData);

  const remainingDays = Math.max(totalPackageDays - totalDaysAllocated, 0);
  const isSelectCitiesDisabled =
    noOfDays === "" || selectedDays <= 0 || remainingDays <= 0;

  const handleRemoveCity = (sequenceColumn) => {
    setOverviewFormData((prevForm) => ({
      ...prevForm,
      cityList: prevForm.cityList.filter(
        (city) => city.sequenceColumn !== sequenceColumn
      ),
    }));
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "search") {
      setSearchTerm(value);
    } else {
      setOverviewFormData((prevData) => ({ ...prevData, [id]: value }));
    }
  };

  const handleEditorChange = (event, editor, fieldName) => {
    const data = editor.getData();

    if (!fieldName) {
      console.error("Editor name is undefined!");
      return;
    }

    setOverviewFormData((prevData) => ({
      ...prevData,
      [fieldName]: data,
    }));
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setOverviewFormData((prevData) => ({
        ...prevData,
        [field]: file,
      }));
    }
  };

  const getFileName = (file) => {
    if (!file) return "No file chosen";
    let filename =
      file instanceof File
        ? file.name
        : file.split("/").pop().split("\\").pop();
    return filename.replace(/^\d+_/, "");
  };

  const handleTagChange = (e) => {
    const { id, checked } = e.target;
    const numericId = String(id);

    setOverviewFormData((prevState) => ({
      ...prevState,
      tag: checked
        ? [...prevState.tag, { id: null, packageTagWise: numericId }]
        : prevState.tag.filter((tag) => tag.packageTagWise !== numericId),
    }));
  };

  const handlePackageChange = (e) => {
    const { id, checked } = e.target;
    const numericId = String(id);

    setOverviewFormData((prevState) => ({
      ...prevState,
      packageIncludes: checked
        ? [...prevState.packageIncludes, { id: null, masPackage: numericId }]
        : prevState.packageIncludes.filter((p) => p.masPackage !== numericId),
    }));
  };

  // const handleAddCity = async (e) => {
  //   e.preventDefault();

  //   if (!selectedCity) {
  //     alert("Please select a city!");
  //     return;
  //   }

  //   if (!selectedDays || selectedDays < 1) {
  //     alert("Please select a valid number of days!");
  //     return;
  //   }

  //   if (cityList.some((city) => city.masCity === selectedCity)) {
  //     alert("City is already added!");
  //     return;
  //   }

  //   // Find the city ID from cityData
  //   const selectedCityData = cityData.find((city) => city.cityName === selectedCity);
  //   if (!selectedCityData) {
  //     alert("Invalid city selected!");
  //     return;
  //   }

  //   const newCity = {
  //     masCity: selectedCityData.id,
  //     dayNumber: selectedDays,
  //     sequenceColumn: cityList.length + 1,
  //   };
  //   console.log(newCity);
  //   try {
  //     const response = await postRequest(ITINERARY, newCity);

  //     if (response.status === 200) {
  //       showPopup(response.message || "City added successfully!", "success");

  //       setCityList([
  //         ...cityList,
  //         {
  //           cityId: selectedCityData.id,
  //           city: selectedCity,
  //           days: selectedDays,
  //           sequenceColumn: cityList.length + 1,
  //         },
  //       ]);

  //       setTotalDaysAllocated(totalDaysAllocated + selectedDays);
  //       setCityModalOpen(false);
  //     } else {
  //       showPopup(response.message || "Failed to add city. Please try again.", "error");
  //     }
  //   } catch (error) {
  //     console.error("Error adding city:", error);
  //     showPopup(error.response?.message || "An error occurred while adding the city.", "error");
  //   }
  // };

  return (
    <>
      <div>
        <form className="forms row">
          <div className="form-group col-md-6">
            <label>Package Name</label>
            <input
              type="text"
              className="form-control"
              id="packageName"
              placeholder="Enter Package Name"
              onChange={handleInputChange}
              value={overviewFormData.packageName}
              required
            />
          </div>

          <div className="form-group col-md-6">
            <label>Seo URL</label>
            <input
              type="text"
              className="form-control"
              id="seoUrl"
              placeholder="Enter SEO URL"
              onChange={handleInputChange}
              value={overviewFormData.seoUrl}
              required
            />
          </div>

          <div className="form-group col-md-6">
            <label>YouTube URL</label>
            <input
              type="text"
              className="form-control"
              id="youtubeUrl"
              placeholder="Enter YouTube URL"
              onChange={handleInputChange}
              value={overviewFormData.youtubeUrl}
              required
            />
          </div>

          <div className="form-group col-md-3">
            <label>Valid From</label>
            <input
              type="date"
              className="form-control"
              id="validFrom"
              placeholder="Enter Valid From"
              onChange={handleInputChange}
              value={overviewFormData.validFrom}
              required
            />
          </div>

          <div className="form-group col-md-3">
            <label>Valid To</label>
            <input
              type="date"
              className="form-control"
              id="validTo"
              placeholder="Enter Valid To"
              onChange={handleInputChange}
              value={overviewFormData.validTo}
              required
            />
          </div>

          <div className="form-group col-md-4">
            <label>Package Code</label>
            <input
              type="text"
              className="form-control"
              id="packageCode"
              placeholder="Enter Package Code"
              onChange={handleInputChange}
              value={overviewFormData.packageCode}
              required
            />
          </div>

          <div className="form-group col-md-4">
            <label>Meta Keyword</label>
            <input
              type="text"
              className="form-control"
              id="metaKeyword"
              placeholder="Enter Meta Keyword"
              onChange={handleInputChange}
              value={overviewFormData.metaKeyword}
              required
            />
          </div>

          <div className="form-group col-md-4">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Enter SEO Title"
              onChange={handleInputChange}
              value={overviewFormData.title}
              required
            />
          </div>

          <div className="form-group col-md-6">
            <label>Og Tag</label>
            <textarea
              className="form-control"
              id="ogTag"
              placeholder="Enter Og Tag"
              rows="3"
              style={{ height: "auto" }}
              onChange={handleInputChange}
              value={overviewFormData.ogTag}
              required
            ></textarea>
          </div>

          <div className="form-group col-md-6">
            <label>Meta Description</label>
            <textarea
              className="form-control"
              id="metaDescription"
              placeholder="Enter Meta Description"
              rows="3"
              style={{ height: "auto" }}
              onChange={handleInputChange}
              value={overviewFormData.metaDescription}
              required
            ></textarea>
          </div>

          <div className="form-group col-md-12">
            <label>Overview Description</label>
            <div ref={editorToolbarRef}></div>
            <CKEditor
              editor={DecoupledEditor}
              data={overviewFormData.overviewDescription}
              config={{
                toolbar: { shouldNotGroupWhenFull: true },
                id: "overviewDescription",
                alignment: { options: ["left", "center", "right", "justify"] },
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
                if (editorToolbarRef.current) {
                  editorToolbarRef.current.innerHTML = "";
                  editorToolbarRef.current.appendChild(
                    editor.ui.view.toolbar.element
                  );
                }
              }}
              onChange={(event, editor) =>
                handleEditorChange(event, editor, "overviewDescription")
              }
            />
          </div>

          <div className="form-group col-md-12">
            <label>Tour Summary</label>
            <div ref={summaryEditorToolbarRef}></div>
            <CKEditor
              editor={DecoupledEditor}
              data={overviewFormData.tourSummary}
              config={{
                toolbar: { shouldNotGroupWhenFull: true },
                id: "tourSummary",
                alignment: { options: ["left", "center", "right", "justify"] },
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
                if (summaryEditorToolbarRef.current) {
                  summaryEditorToolbarRef.current.innerHTML = "";
                  summaryEditorToolbarRef.current.appendChild(
                    editor.ui.view.toolbar.element
                  );
                }
              }}
              onChange={(event, editor) =>
                handleEditorChange(event, editor, "tourSummary")
              }
            />
          </div>

          <div className="form-group col-md-5">
            <label htmlFor="thumbImg">Thum Image</label>

            <input
              type="file"
              id="thumbImg"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "thumbImg")}
              style={{ display: "none" }}
            />

            <div className="input-group">
              <button
                type="button"
                className="btn"
                style={{
                  backgroundColor: "#dee2e6",
                  color: "#000",
                  border: "1px solid #adb5bd",
                }}
                onClick={() => document.getElementById("thumbImg").click()}
              >
                Choose File
              </button>
              <input
                type="text"
                className="form-control"
                value={getFileName(overviewFormData.thumbImg)}
                readOnly
                style={{
                  backgroundColor: "#fff",
                  cursor: "pointer",
                }}
                onClick={() => document.getElementById("thumbImg").click()}
              />
            </div>
          </div>

          <div className="form-group col-md-5">
            <label>No of Days (Max 99 Days)</label>
            <input
              type="number"
              className="form-control"
              id="noOfDays"
              placeholder="Enter No of Days"
              max="99"
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value <= 99) {
                  setNoOfDays(value);
                  setOverviewFormData((prevForm) => ({
                    ...prevForm,
                    noOfDays: value,
                  }));
                  setTotalPackageDays(value);
                }
              }}
            />
          </div>

          <div className="form-group col-md-2 mt-4 d-flex justify-content-end">
            <button
              className="btn btn-primary btn-sm me-5"
              onClick={(e) => {
                e.preventDefault();
                setCityModalOpen(true);
              }}
              disabled={isSelectCitiesDisabled}
            >
              Select Cities
            </button>
          </div>

          <div className="table-responsive packagelist">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>S.No.</th>
                  <th>City</th>
                  <th>No. of days</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {overviewFormData.cityList.map((item, index) => (
                  <tr key={item.sequenceColumn || index}>
                    <td>{item.sequenceColumn || index + 1}</td>
                    <td>{item.masCity}</td>
                    <td>{item.dayNumber}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-sm btn-danger"
                        onClick={() =>
                          handleRemoveCity(item.sequenceColumn || index)
                        }
                      >
                        <i className="mdi mdi-trash-can"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="form-group col-md-12">
            <label>Package Include</label>
            masPackage
            <div className="row mx-0 g-3">
              {loading ? (
                <div>Loading Package...</div>
              ) : (
                packageIncludesData.map((packageIncludes) => (
                  <div className="col-md-3" key={packageIncludes.id}>
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      id={packageIncludes.id}
                      onChange={handlePackageChange}
                      checked={overviewFormData.packageIncludes.some(
                        (t) => t.masPackage === String(packageIncludes.id)
                      )}
                    />
                    <label
                      className="form-check-label text-black mt-1"
                      htmlFor={packageIncludes.id}
                    >
                      {packageIncludes.masPackage}
                    </label>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="form-group col-md-12">
            <label>Tags</label>
            <div className="row mx-0 g-3">
              {loading ? (
                <div>Loading tags...</div>
              ) : (
                tagData.map((tag) => (
                  <div className="col-md-3" key={tag.id}>
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      id={tag.id}
                      onChange={handleTagChange}
                      checked={overviewFormData.tag.some(
                        (t) => t.packageTagWise === String(tag.id)
                      )}
                    />
                    <label
                      className="form-check-label text-black mt-1"
                      htmlFor={tag.id}
                    >
                      {tag.tagName}
                    </label>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* <div className="form-group col-md-12 d-flex justify-content-between">
                    <button type="button" className="btn btn-secondary">
                        Skip
                    </button>
                    <button type="submit" className="btn btn-primary">
                        Save & Continue
                    </button>
                </div> */}
        </form>
      </div>
      {isCityModalOpen && (
        <div className="modal d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Select City</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setCityModalOpen(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>City</label>
                  <select
                    className="form-control"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                  >
                    <option value="">Select a city</option>
                    {cityData.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.cityName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>No of Days</label>
                  <select
                    className="form-control"
                    value={selectedDays}
                    onChange={(e) => setSelectedDays(Number(e.target.value))}
                    disabled={remainingDays === 0}
                  >
                    {remainingDays === 0 ? (
                      <option>No days remaining</option>
                    ) : (
                      [...Array(remainingDays).keys()].map((day) => (
                        <option key={day + 1} value={day + 1}>
                          {day + 1}
                        </option>
                      ))
                    )}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setCityModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddCity}
                  disabled={remainingDays === 0}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Overview;
