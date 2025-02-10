import { useLocation } from "react-router-dom";
import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import {
  getRequest,
  uploadFileWithJson,
  updateFileWithJson,
  putRequest,
} from "../../service/apiService";
import Popup from "../../components/popup/index";
import { ITINERARY, PACKAGE } from "../../config/apiConfig";

const Overview = forwardRef(({ item, onPackageIdUpdate, isActive, ...props  }, ref) => {
  const initialOverviewFormData = {
    pkgName: "",
    seoUrl: "",
    youtubeUrl: "",
    validFrom: "",
    validTo: "",
    pkgCode: "",
    metaKeyword: "",
    seoTitle: "",
    ogTag: "",
    metaDescription: "",
    overviewDesc: "",
    tourSummary: "",
    thumbImg: null,
    numDays: 0,
    packageIncludes: [],
    tag: [],
    packageItinerary: [],
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
  const [totalPackageDays, setTotalPackageDays] = useState(10);
  const [totalDaysAllocated, setTotalDaysAllocated] = useState(0);
  const [numDays, setnumDays] = useState("");
  const [popup, setPopup] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [cityData, setCityData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [newPackageId, setNewPackageId] = useState(null);
  const [totalDayNumber, setTotalDayNumber] = useState(0);
  const location = useLocation();
  const receivedItem = location.state?.item || null;
  const [modalState, setModalState] = useState({
    isOpen: false,
    selectedCity: "",
    selectedDays: 1,
  });

  const handleModalToggle = (shouldOpen) => {
    if (shouldOpen) {
      setModalState((prev) => ({
        ...prev,
        isOpen: true,
      }));
    } else {
      setModalState({
        isOpen: false,
        selectedCity: "",
        selectedDays: 1,
      });
    }
  };

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

  const mergeItinerary = (itinerary) => {
    const merged = {};

    itinerary.forEach((item) => {
      const key = item.sequenceColumn;

      if (!merged[key]) {
        merged[key] = {
          ids: [item.id],
          dayNumber: 0,
          sequenceColumn: item.sequenceColumn,
          masCity: { ...item.masCity },
          status: item.status,
        };
      } else {
        merged[key].ids.push(item.id);
      }

      merged[key].dayNumber += item.dayNumber;
    });

    return Object.values(merged);
  };

  const onAddCity = (cityId, days) => {
    const cityObject = cityData.find((c) => c.id === Number(cityId));
    if (!cityObject) {
      alert("Invalid city selection");
      return;
    }

    setOverviewFormData((prevForm) => ({
      ...prevForm,
      packageItinerary: [
        ...prevForm.packageItinerary,
        {
          sequenceColumn: prevForm.packageItinerary.length + 1,
          dayNumber: days,
          masCity: {
            id: cityObject.id,
            cityName: cityObject.cityName,
          },
        },
      ],
    }));

    setTotalDaysAllocated((prevTotal) => prevTotal + days);
  };

  const handleAddCity = (e) => {
    e.preventDefault();

    if (!modalState.selectedCity) {
      showPopup("Please select a city!", "warning");
      return;
    }

    if (!modalState.selectedDays || modalState.selectedDays < 1) {
      showPopup("Please select a valid number of days!", "warning");
      return;
    }

    const cityIdAsNumber = Number(modalState.selectedCity);

    // Check if city already exists in itinerary
    if (
      overviewFormData.packageItinerary.some(
        (city) => city.masCity.id === cityIdAsNumber
      )
    ) {
      showPopup("City is already added!", "warning");
      return;
    }

    // Add city to itinerary
    const cityObject = cityData.find((c) => c.id === cityIdAsNumber);
    if (!cityObject) {
      showPopup("Invalid city selection", "error");
      return;
    }

    setOverviewFormData((prevForm) => ({
      ...prevForm,
      packageItinerary: [
        ...prevForm.packageItinerary,
        {
          sequenceColumn: prevForm.packageItinerary.length + 1,
          dayNumber: modalState.selectedDays,
          masCity: {
            id: cityObject.id,
            cityName: cityObject.cityName,
          },
        },
      ],
    }));

    setTotalDaysAllocated((prev) => prev + modalState.selectedDays);
    handleModalToggle(false);
  };

  const handleCityChange = (e) => {
    setModalState((prev) => ({
      ...prev,
      selectedCity: e.target.value,
    }));
  };

  const handleDaysChange = (days) => {
    setModalState((prev) => ({
      ...prev,
      selectedDays: days,
    }));
  };

  const handleRemoveCity = (sequenceColumn, days) => {
    setOverviewFormData((prevForm) => ({
      ...prevForm,
      packageItinerary: prevForm.packageItinerary.filter(
        (city) => city.sequenceColumn !== sequenceColumn
      ),
    }));
    setTotalDaysAllocated((prevTotal) => Math.max(prevTotal - days, 0));
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
    const numericId = Number(id);

    setOverviewFormData((prevState) => ({
      ...prevState,
      tag: checked
        ? [...prevState.tag, { masTagWise: { id: numericId } }]
        : prevState.tag.filter((tag) => tag.masTagWise.id !== numericId),
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


  useEffect(() => {
    if (item) {
      setOverviewFormData((prevForm) => ({
        ...prevForm,
        metaDescription: item?.metaDescription || "",
        metaKeyword: item?.metaKeyword || "",
        numDays: item.numDays,
        ogTag: item.ogTag,
        overviewDesc: item?.overviewDesc || "",
        pkgCode: item.pkgCode,
        packageIncludes: item.packageIncludes,
        pkgName: item.pkgName,
        seoUrl: item.seoUrl,
        tag: item.tags,
        seoTitle: item.seoTitle,
        tourSummary: item.tourSummary || "",
        youtubeUrl: item.youtubeUrl,
        validFrom: item.validFrom,
        validTo: item.validTo,
        thumbImg: item.thumbImg,
      }));
      setEditId(item.id);
    }

    if (item?.itinerary?.length) {
      const merged = mergeItinerary(item.itinerary);
      setOverviewFormData((prevForm) => ({
        ...prevForm,
        packageItinerary: merged,
      }));
    }
  }, [item]);

  useEffect(() => {
    if (overviewFormData.packageItinerary?.length) {
      const totalDays = overviewFormData.packageItinerary.reduce(
        (sum, city) => sum + city.dayNumber,
        0
      );
      setTotalDayNumber(totalDays);
    }
  }, [overviewFormData.packageItinerary]);

  const handleUpdateFormSubmit = async (e) => {
    e.preventDefault();

    // if (!formData.amenityName || !formData.faIconClass) {
    //   showPopup("Please fill out all required fields.", "warning");
    //   return;
    // }
    // if (!formData.iconPath) {
    //   showPopup("Please upload an image.", "warning");
    //   return;
    // }

    let json = {
      packageItinerary: overviewFormData.packageItinerary,
      metaDescription: overviewFormData.metaDescription,
      metaKeyword: overviewFormData.metaKeyword,
      numDays: overviewFormData.numDays,
      ogTag: overviewFormData.ogTag,
      overviewDesc: overviewFormData.overviewDesc,
      pkgCode: overviewFormData.pkgCode,
      packageIncludes: overviewFormData.packageIncludes,
      pkgName: overviewFormData.pkgName,
      seoUrl: overviewFormData.seoUrl,
      tag: overviewFormData.tag,
      seoTitle: overviewFormData.seoTitle,
      tourSummary: overviewFormData.tourSummary,
      youtubeUrl: overviewFormData.youtubeUrl,
    };

    json.validFrom = new Date(overviewFormData.validFrom).toISOString();
    json.validTo = new Date(overviewFormData.validTo).toISOString();

    console.log(json);

    try {
      const response = await updateFileWithJson(
        `${PACKAGE}/${editId}`,
        json,
        overviewFormData.thumbImg
      );

      if (response.status === 200) {
        showPopup(
          response.message || "Amenity updated successfully!",
          "success"
        );
        // fetchAmenityData();
        // setFormData({
        //   amenityName: "",
        //   faIconClass: "",
        //   iconPath: null,
        // });
        // setShowForm(false);
        // setEditMode(false);
        setEditId(null);
      } else {
        showPopup(
          response?.message ||
            "Failed to update the Amenity. Please try again.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error updating Amenity:", error);
      showPopup(
        error?.response?.message ||
          "An error occurred while updating the Amenity.",
        "error"
      );
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (
      !overviewFormData.pkgName ||
      !overviewFormData.seoTitle ||
      !overviewFormData.thumbImg
    ) {
      showPopup(
        "Please fill out all required fields and upload an image.",
        "warning"
      );
      return;
    }

    if (overviewFormData.packageItinerary.length === 0) {
      showPopup("Please add at least one city to the itinerary.", "warning");
      return;
    }

    let json = {
      packageItinerary: overviewFormData.packageItinerary,
      metaDescription: overviewFormData.metaDescription,
      metaKeyword: overviewFormData.metaKeyword,
      numDays: overviewFormData.numDays,
      ogTag: overviewFormData.ogTag,
      overviewDesc: overviewFormData.overviewDesc,
      pkgCode: overviewFormData.pkgCode,
      packageIncludes: overviewFormData.packageIncludes,
      pkgName: overviewFormData.pkgName,
      seoUrl: overviewFormData.seoUrl,
      tag: overviewFormData.tag,
      seoTitle: overviewFormData.seoTitle,
      tourSummary: overviewFormData.tourSummary,
      youtubeUrl: overviewFormData.youtubeUrl,
      validFrom: new Date(overviewFormData.validFrom).toISOString(),
      validTo: new Date(overviewFormData.validTo).toISOString(),
    };

    try {
      const response = await uploadFileWithJson(
        `${PACKAGE}`,
        json,
        overviewFormData.thumbImg
      );

      console.log("Full API Response:", response);

      if (response?.status === 200 && response?.response?.id) {
        showPopup(
          response?.message || "Package submitted successfully!",
          "success"
        );

        const newId = response.response.id;
        console.log("New package created with ID:", newId);

        if (typeof onPackageIdUpdate === "function") {
          onPackageIdUpdate(newId);
        }

        setNewPackageId(newId);
        // setOverviewFormData(initialOverviewFormData);
      } else {
        showPopup(
          response?.message ||
            "Failed to submit the Package. Please try again.",
          "error"
        );
      }
    } catch (error) {
      throw error;
      // console.error("Error submitting Package:", error);
      // showPopup(
      //   error?.message || "An error occurred while submitting the Package.",
      //   "error"
      // );
    }
  };

  useImperativeHandle(ref, () => ({
    handleSubmit
  }));

  if (!isActive) return null;

  

  const remainingDays = Math.max(
    (overviewFormData.numDays || 0) - totalDayNumber,
    0
  );
  const isSelectCitiesDisabled = remainingDays <= 0;

  return (
    <>
      <div>
        {popupMessage && (
          <Popup
            message={popupMessage.message}
            type={popupMessage.type}
            onClose={popupMessage.onClose}
          />
        )}
        <form className="forms row" onSubmit={handleSubmit}>
          <div className="form-group col-md-6">
            <label>Package Name</label>
            <input
              type="text"
              className="form-control"
              id="pkgName"
              placeholder="Enter Package Name"
              onChange={handleInputChange}
              value={overviewFormData.pkgName}
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
              value={
                overviewFormData.validFrom
                  ? overviewFormData.validFrom.split("T")[0]
                  : ""
              }
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
              value={
                overviewFormData.validTo
                  ? overviewFormData.validTo.split("T")[0]
                  : ""
              }
              required
            />
          </div>

          <div className="form-group col-md-4">
            <label>Package Code</label>
            <input
              type="text"
              className="form-control"
              id="pkgCode"
              placeholder="Enter Package Code"
              onChange={handleInputChange}
              value={overviewFormData.pkgCode}
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
              id="seoTitle"
              placeholder="Enter SEO Title"
              onChange={handleInputChange}
              value={overviewFormData.seoTitle}
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
              data={overviewFormData?.overviewDesc}
              config={{
                toolbar: { shouldNotGroupWhenFull: true },
                id: "overviewDesc",
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
                handleEditorChange(event, editor, "overviewDesc")
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
              placeholder="Enter No of Days"
              max="99"
              min="1"
              value={overviewFormData.numDays || ""}
              onChange={(e) => {
                const value =
                  e.target.value === "" ? "" : Number(e.target.value);
                if (value === "" || value <= 99) {
                  setOverviewFormData((prevForm) => ({
                    ...prevForm,
                    numDays: value,
                  }));
                  setTotalPackageDays(value || 0);
                }
              }}
            />
          </div>

          <div className="form-group col-md-2 mt-4 d-flex justify-content-end">
            <button
              className="btn btn-primary btn-sm me-5"
              onClick={() => handleModalToggle(true)}
              disabled={isSelectCitiesDisabled}
              type="button"
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
                {overviewFormData?.packageItinerary?.map((item, index) => (
                  <tr key={item.sequenceColumn || index}>
                    <td>{item.sequenceColumn || index + 1}</td>
                    <td>{item?.masCity?.cityName}</td>
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
                      checked={overviewFormData?.packageIncludes?.some(
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
                      checked={overviewFormData?.tag?.some(
                        (t) => t.masTagWise.id === tag.id
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

          <div className="form-group col-md-12 d-flex justify-content-between">
            <button type="button" className="btn btn-secondary">
              Skip
            </button>
            <button type="submit" className="btn btn-primary">
              Save & Continue
            </button>
          </div>
        </form>
      </div>
      {modalState.isOpen && (
        <div className="modal d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Select City</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => handleModalToggle(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>City</label>
                  <select
                    className="form-control"
                    value={modalState.selectedCity}
                    onChange={handleCityChange}
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
                    value={modalState.selectedDays}
                    onChange={(e) => handleDaysChange(Number(e.target.value))}
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
                  onClick={() => handleModalToggle(false)}
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
});

export default Overview;
