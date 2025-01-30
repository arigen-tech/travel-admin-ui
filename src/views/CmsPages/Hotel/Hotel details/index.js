import React, { useState, useRef, useEffect, useCallback } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import {
  getRequest,
  postRequest,
  putRequest,
} from "../../../../service/apiService";
import Popup from "../../../../components/popup";
import { MAS_HOTEL } from "../../../../config/apiConfig";
import { AMENITIES, API_HOST } from "../../../../config/apiConfig";

const Hoteldetails = () => {
  const initialFormData = {
    bannerImg: null,
    thumbImg: null,
    logoImg: null,
    hotelTypeId: "",
    hotelName: "",
    seoUrl: "",
    starRating: "",
    email: "",
    phoneNumber: "",
    altTag: "",
    addressLine1: "",
    addressLine2: "",
    landmark: "",
    countryId: "",
    stateId: "",
    cityId: "",
    postalCode: "",
    latitude: "",
    longitude: "",
    youTubeLink: "",
    isFeature: "n",
    shortDesc: "",
    longDesc: "",
    note: "",
    amenities: [],
    tag: [],
    hotelImage: [{ id: 1, imageName: "", altTag: "", imageUrl: null }],
    headingImage: [{ id: 1, heading: "", description: "", imageUrl: null }],
  };
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [hotelData, setHotelData] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [hotelTypeData, setHotelTypeData] = useState([]);
  const [amenityData, setAmenityData] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [tagData, setTagData] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const summaryEditorToolbarRef = useRef(null);
  const noteEditorToolbarRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [popup, setPopup] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const [resultsPerPage, setResultsPerPage] = useState(10); // Show 10 results per page
  const editorToolbarRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [hotelType, setHotelType] = useState([]);
  const editorRef = useRef(null);
  const shortDescToolbarRef = useRef(null);
  const longDescToolbarRef = useRef(null);
  const noteToolbarRef = useRef(null);
  const [editId, setEditId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newStatus, setNewStatus] = useState(false);
  const [itemName, setItemName] = useState("");
  const uploadHeadContent = useRef([]);

  const token = sessionStorage.getItem("token");
  console.log(token);

  const showPopup = (message, type = "info") => {
    setPopupMessage({
      message,
      type,
      onClose: () => {
        setPopupMessage(null);
      },
    });
  };

  const resetForm = useCallback(() => {
    setFormData({ ...initialFormData });
  }, []);

  const fetchHotelData = async () => {
    setLoading(true);

    try {
      const data = await getRequest(MAS_HOTEL);
      if (data.status === 200 && Array.isArray(data.response)) {
        setHotelData(data.response);
        setTotalPages(Math.ceil(data.response.length / resultsPerPage));
      } else {
        console.error("Unexpected API response format:", data);
        setHotelData([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching Hotel data:", error);
    } finally {
      setLoading(false);
    }
  };

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
        console.log(data.response);
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

  const fetchTagData = async () => {
    setLoading(true);
    try {
      const GETALL = "/masterController/getAllTags";
      const data = await getRequest(GETALL);
      if (data.status === 200 && Array.isArray(data.response)) {
        setTagData(data.response);
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
    fetchHotelData();
    fetchCountryData();
    fetchHotelTypeData();
    fetchAmenityData();
    fetchTagData();
  }, []);

  const handleCountryChange = (countryCode, id) => {
    setFormData((prevState) => ({
      ...prevState,
      countryId: id,
      stateId: "",
      cityId: "",
    }));
    fetchStateData(countryCode);
  };

  const handleStateChange = (stateCode, id) => {
    setFormData((prevState) => ({
      ...prevState,
      stateId: id,
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
    const numericId = String(id);

    setFormData((prevState) => ({
      ...prevState,
      amenities: checked
        ? [...prevState.amenities, { id: null, amenity: numericId }]
        : prevState.amenities.filter(
            (amenity) => amenity.amenity !== numericId
          ),
    }));
  };

  const handleTagChange = (e) => {
    const { id, checked } = e.target;
    const numericId = String(id);

    setFormData((prevState) => ({
      ...prevState,
      tag: checked
        ? [...prevState.tag, { id: null, masTagWise: numericId }]
        : prevState.tag.filter((tag) => tag.masTagWise !== numericId),
    }));
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "search") {
      setSearchTerm(value);
    } else {
      setFormData((prevData) => ({ ...prevData, [id]: value }));
    }
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        [field]: file,
      }));
    }
  };

  const handleChange = (e) => {
    const { id, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? (checked ? "y" : "n") : e.target.value,
    }));
  };

  const handleEditorChange = (event, editor, fieldName) => {
    const data = editor.getData();

    if (!fieldName) {
      console.error("Editor name is undefined!");
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: data,
    }));
  };

  const addImageRow = (e) => {
    e.preventDefault();

    const existingIds = formData.hotelImage
      .map((image) => image.id)
      .filter((id) => id !== null);
    const newId = existingIds.length ? Math.max(...existingIds) + 1 : 1;

    setFormData((prev) => ({
      ...prev,
      hotelImage: [
        ...prev.hotelImage,
        { id: null, imageName: "", altTag: "", imageUrl: null },
      ],
    }));
  };

  const removeImageRow = (id) => {
    setFormData((prev) => ({
      ...prev,
      hotelImage: prev.hotelImage.filter((image) => image.id !== id),
    }));
  };

  const handleImageChange = (id, field, value) => {
    setFormData((prev) => {
      let updatedHotelImages = prev.hotelImage.map((image) =>
        image.id === id ? { ...image, [field]: value } : image
      );

      // If there are exactly 2, add a new empty one
      if (updatedHotelImages.length === 2) {
        updatedHotelImages.push({
          id: updatedHotelImages.length + 1,
          imageName: "",
          altTag: "",
          imageUrl: null,
        });
      }

      return { ...prev, hotelImage: updatedHotelImages };
    });
  };

  const addHotelRow = (e) => {
    e.preventDefault();

    setFormData((prev) => ({
      ...prev,
      headingImage: [
        ...prev.headingImage,
        { id: null, heading: "", description: "", imageUrl: null },
      ],
    }));
  };

  const removeHotelRow = (id) => {
    setFormData((prev) => ({
      ...prev,
      headingImage: prev.headingImage.filter((hotel) => hotel.id !== id),
    }));
  };

  const handleHotelFileChange = (id, field, value) => {
    setFormData((prev) => {
      let updatedHeadingImages = prev.headingImage.map((hotel) =>
        hotel.id === id ? { ...hotel, [field]: value } : hotel
      );

      // If there are exactly 2, add a new empty one
      if (updatedHeadingImages.length === 2) {
        updatedHeadingImages.push({
          id: updatedHeadingImages.length + 1,
          heading: "",
          description: "",
          imageUrl: null,
        });
      }

      return { ...prev, headingImage: updatedHeadingImages };
    });
  };

  const handleEditorChanges = (id, value) => {
    setFormData((prev) => ({
      ...prev,
      headingImage: prev.headingImage.map((hotel) =>
        hotel.id === id ? { ...hotel, description: value } : hotel
      ),
    }));
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

  const validateForm = () => {
    const newErrors = [];

    if (!formData.hotelName.trim()) newErrors.push("Hotel name is required.");
    if (!formData.hotelTypeId) newErrors.push("Hotel type ID is required.");
    if (!formData.addressLine1.trim())
      newErrors.push("Address Line 1 is required.");
    if (!formData.countryId) newErrors.push("Country ID is required.");
    if (!formData.stateId) newErrors.push("State ID is required.");
    if (!formData.cityId) newErrors.push("City ID is required.");
    if (!formData.postalCode.trim()) newErrors.push("Postal code is required.");
    if (!formData.phoneNumber.trim())
      newErrors.push("Phone number is required.");
    if (!formData.email.trim()) newErrors.push("Email is required.");
    if (!formData.bannerImg) newErrors.push("Banner image is required.");
    if (!formData.thumbImg) newErrors.push("Thumbnail image is required.");
    if (!formData.logoImg) newErrors.push("Logo image is required.");

    if (!formData.amenity || !Array.isArray(formData.amenity))
      newErrors.push("Amenity field must be an array.");

    if (!formData.tag || !Array.isArray(formData.tag))
      newErrors.push("Tag field must be an array.");

    if (!formData.hotelImage || !Array.isArray(formData.hotelImage))
      newErrors.push("Hotel images must be an array.");

    if (!formData.headingImage || !Array.isArray(formData.headingImage))
      newErrors.push("Heading images must be an array.");

    if (newErrors.length > 0) {
      showPopup(newErrors.join("<br>"), "warning"); // Using <br> for multi-line display
      return false;
    }

    return true;
  };

  const handleCreateFormSubmit = async (e) => {
    e.preventDefault();

    // validateForm();
    const formDataToSubmit = new FormData();

    formDataToSubmit.append("hotelTypeId", formData.hotelTypeId);
    formDataToSubmit.append("hotelName", formData.hotelName);
    formDataToSubmit.append("seoUrl", formData.seoUrl);
    formDataToSubmit.append("starRating", formData.starRating);
    formDataToSubmit.append("email", formData.email);
    formDataToSubmit.append("phoneNumber", formData.phoneNumber);
    formDataToSubmit.append("altTag", formData.altTag);
    formDataToSubmit.append("addressLine1", formData.addressLine1);
    formDataToSubmit.append("addressLine2", formData.addressLine2);
    formDataToSubmit.append("landmark", formData.landmark);
    formDataToSubmit.append("countryId", formData.countryId);
    formDataToSubmit.append("stateId", formData.stateId);
    formDataToSubmit.append("cityId", formData.cityId);
    formDataToSubmit.append("postalCode", formData.postalCode);
    formDataToSubmit.append("latitude", formData.latitude);
    formDataToSubmit.append("longitude", formData.longitude);
    formDataToSubmit.append("youTubeLink", formData.youTubeLink);
    formDataToSubmit.append("isFeature", formData.isFeature);
    formDataToSubmit.append("shortDesc", formData.shortDesc);
    formDataToSubmit.append("longDesc", formData.longDesc);
    formDataToSubmit.append("note", formData.note);

    // Append arrays with proper indexing
    formData.amenities.forEach((amenity, index) => {
      formDataToSubmit.append(`amenities[${index}].amenity`, amenity.amenity);
    });

    formData.tag.forEach((tag, index) => {
      formDataToSubmit.append(`tag[${index}].masTagWise`, tag.masTagWise);
    });

    // Append images
    if (formData.bannerImg)
      formDataToSubmit.append("bannerImg", formData.bannerImg);
    if (formData.thumbImg)
      formDataToSubmit.append("thumbImg", formData.thumbImg);
    if (formData.logoImg) formDataToSubmit.append("logoImg", formData.logoImg);

    // Handle hotel images
    formData.hotelImage.forEach((img, index) => {
      if (img.imageName)
        formDataToSubmit.append(
          `hotelImage[${index}].imageName`,
          img.imageName
        );
      if (img.altTag)
        formDataToSubmit.append(`hotelImage[${index}].altTag`, img.altTag);
      if (img.imageUrl)
        formDataToSubmit.append(`hotelImage[${index}].imageUrl`, img.imageUrl);
    });

    formData.headingImage.forEach((img, index) => {
      if (img.heading)
        formDataToSubmit.append(`headingImage[${index}].heading`, img.heading);
      if (img.description)
        formDataToSubmit.append(
          `headingImage[${index}].description`,
          img.description
        );
      if (img.imageUrl)
        formDataToSubmit.append(
          `headingImage[${index}].imageUrl`,
          img.imageUrl
        );
    });

    try {
      setLoading(true);

      const response = await fetch(`${API_HOST}${MAS_HOTEL}`, {
        method: "POST",
        body: formDataToSubmit,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to create hotel: ${response.statusText}`);
      }

      const data = await response.json();
      showPopup(response?.message || "Hotel created successfully!", "success");
      resetForm();
    } catch (error) {
      showPopup(
        error?.response?.message ||
          "Failed to Hotel creation. Please try again.",
        "error"
      );
      console.error("Hotel creation failed", error);
    } finally {
      setLoading(false);
    }
  };

  console.log(formData);

  const handleEdit = (item) => {
    if (!item.id) {
      console.error("Item ID is missing or null");
      return;
    }

    setFormData((prevState) => ({
      ...prevState,
      hotelTypeId: item.hotelType?.id || "",
      hotelName: item.hotelName || "",
      seoUrl: item.seoUrl || "",
      starRating: item.starRating || "",
      email: item.email || "",
      phoneNumber: item.phoneNumber || "",
      altTag: item.altTag || "",
      addressLine1: item.addressLine1 || "",
      addressLine2: item.addressLine2 || "",
      landmark: item.landmark || "",
      countryId: item.country?.id || "",
      stateId: item.state?.id || "",
      cityId: item.city?.id || "",
      postalCode: item.postalCode || "",
      latitude: item.latitude || "",
      longitude: item.longitude || "",
      youTubeLink: item.youTubeLink || "",
      isFeature: item.isFeature || "n",
      shortDesc: item.shortDesc || "",
      longDesc: item.longDesc || "",
      note: item.note || "",

      amenities: [
        ...prevState.amenities,
        ...item.amenities.map((amenity) => ({
          id: String(amenity.id),
          amenity: String(
            amenity.amenity?.id || amenity.amenityId || amenity.amenity
          ),
        })),
      ],

      tag: [
        ...prevState.tag,
        ...item.tag.map((tag) => ({
          id: String(tag.id),
          masTagWise: String(
            tag.masTagWise?.id || tag.masTagWiseId || tag.masTagWise
          ),
        })),
      ],

      bannerImg: item.bannerImg || null,
      thumbImg: item.thumbImg || null,
      logoImg: item.logoImg || null,

      hotelImage: [
        ...prevState.hotelImage,
        ...item.hotelImage.map((img) => ({
          id: String(img.id),
          imageName: img.imageName || "",
          altTag: img.altTag || "",
          imageUrl: img.imageUrl || null,
        })),
      ],

      headingImage: [
        ...prevState.headingImage,
        ...item.headingImage.map((img) => ({
          id: String(img.id),
          heading: img.heading || "",
          description: img.description || "",
          imageUrl: img.imageUrl || null,
        })),
      ],
    }));

    setEditId(item.id);
    setEditMode(true);
    setShowForm(true);
  };

  const handleUpdateFormSubmit = async (e) => {
    e.preventDefault();
    // validateForm();
    if (!editId) {
      console.error("ID is missing or null");
      return;
    }

    const formDataToSubmit = new FormData();

    formDataToSubmit.append("hotelTypeId", formData.hotelTypeId);
    formDataToSubmit.append("hotelName", formData.hotelName);
    formDataToSubmit.append("seoUrl", formData.seoUrl);
    formDataToSubmit.append("starRating", formData.starRating);
    formDataToSubmit.append("email", formData.email);
    formDataToSubmit.append("phoneNumber", formData.phoneNumber);
    formDataToSubmit.append("altTag", formData.altTag);
    formDataToSubmit.append("addressLine1", formData.addressLine1);
    formDataToSubmit.append("addressLine2", formData.addressLine2);
    formDataToSubmit.append("landmark", formData.landmark);
    formDataToSubmit.append("countryId", formData.countryId);
    formDataToSubmit.append("stateId", formData.stateId);
    formDataToSubmit.append("cityId", formData.cityId);
    formDataToSubmit.append("postalCode", formData.postalCode);
    formDataToSubmit.append("latitude", formData.latitude);
    formDataToSubmit.append("longitude", formData.longitude);
    formDataToSubmit.append("youTubeLink", formData.youTubeLink);
    formDataToSubmit.append("isFeature", formData.isFeature);
    formDataToSubmit.append("shortDesc", formData.shortDesc);
    formDataToSubmit.append("longDesc", formData.longDesc);
    formDataToSubmit.append("note", formData.note);

    if (formData.bannerImg instanceof File) {
      formDataToSubmit.append("bannerImg", formData.bannerImg);
    }
    if (formData.thumbImg instanceof File) {
      formDataToSubmit.append("thumbImg", formData.thumbImg);
    }
    if (formData.logoImg instanceof File) {
      formDataToSubmit.append("logoImg", formData.logoImg);
    }

    formData.amenities.forEach((amenity, index) => {
      formDataToSubmit.append(`amenities[${index}].id`, amenity.id || "");
      formDataToSubmit.append(`amenities[${index}].amenity`, amenity.amenity);
    });

    formData.tag.forEach((tag, index) => {
      formDataToSubmit.append(`tag[${index}].id`, tag.id || "");
      formDataToSubmit.append(`tag[${index}].masTagWise`, tag.masTagWise);
    });

    formData.hotelImage.forEach((img, index) => {
      formDataToSubmit.append(`hotelImage[${index}].id`, img.id || "");
      formDataToSubmit.append(`hotelImage[${index}].imageName`, img.imageName);
      formDataToSubmit.append(`hotelImage[${index}].altTag`, img.altTag);
      if (img.imageUrl instanceof File) {
        formDataToSubmit.append(`hotelImage[${index}].imageUrl`, img.imageUrl);
      }
    });

    formData.headingImage.forEach((img, index) => {
      formDataToSubmit.append(`headingImage[${index}].id`, img.id || "");
      formDataToSubmit.append(`headingImage[${index}].heading`, img.heading);
      formDataToSubmit.append(
        `headingImage[${index}].description`,
        img.description
      );

      if (img.imageUrl instanceof File) {
        formDataToSubmit.append(
          `headingImage[${index}].imageUrl`,
          img.imageUrl
        );
      }
    });

    try {
      setLoading(true);

      const response = await fetch(`${API_HOST}${MAS_HOTEL}/${editId}`, {
        method: "PUT",
        body: formDataToSubmit,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to update hotel: ${response.statusText}`);
      }

      const data = await response.json();
      showPopup(data?.message || "Hotel updated successfully!", "success");
      setShowForm(false);
      setEditMode(false);
      setEditId(null);
      resetForm();
    } catch (error) {
      console.error("Hotel update failed", error);
      showPopup(
        error?.response?.message || "Failed to update hotel. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (id, status, hotelName) => {
    setSelectedItem(id);
    setNewStatus(status);
    setItemName(hotelName);
    setShowConfirmation(true);
  };

  const confirmStatusChange = async (e) => {
    e.preventDefault();
    try {
      const status = newStatus ? "y" : "n";
      const response = await putRequest(
        `${MAS_HOTEL}/status/${selectedItem}?status=${status}`
      );

      if (response.status === 200) {
        showPopup(
          response.message || "Status updated successfully!",
          "success"
        );
        fetchHotelData();
        setShowConfirmation(false);
        setSelectedItem(null);
        setNewStatus(false);
      } else {
        showPopup(
          response?.message || "Failed to update status. Please try again.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
      showPopup(
        error?.response?.message ||
          "An error occurred while updating the status.",
        "error"
      );
    }
  };

  const paginatedData = hotelData.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );


  const filterHotels = (hotels) => {
    if (!searchTerm.trim()) return hotels;
    return hotels.filter(
      (item) =>
        item.hotelName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.hotelType?.hotelTypeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.state?.stateName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.country?.countryName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.city?.cityName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.status?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredHotels = filterHotels(hotelData);
  const totalFilteredProducts = filteredHotels.length;
  const filteredTotalPages = Math.ceil(totalFilteredProducts / resultsPerPage);
  const indexOfLastHotel = currentPage * resultsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - resultsPerPage;
  const currentHotels = filteredHotels.slice(
    indexOfFirstHotel,
    indexOfLastHotel
  );
  return (
    <div className="content-wrapper">
      <div className="row">
        <div className="col-12 grid-margin stretch-card">
          {popupMessage && (
            <Popup
              message={popupMessage.message}
              type={popupMessage.type}
              onClose={popupMessage.onClose}
            />
          )}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          {errors.server && <p className="text-red-500">{errors.server}</p>}

          <div className="card form-card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="card-title">Hotel</h4>
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
                          id="search"
                          value={searchTerm}
                          onChange={handleInputChange}
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
                    <button type="button" className="btn btn-warning me-2">
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
                          <th>Edit</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentHotels.length > 0 ? (
                          currentHotels.map((hotel, index) => (
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
                                <button
                                  className={`btn btn-sm btn-success me-2 ${
                                    hotel.status === "n" ? "disabled" : ""
                                  }`}
                                  disabled={hotel.status === "n"}
                                  onClick={() => {
                                    if (hotel.status === "y") {
                                      handleEdit(hotel);
                                    }
                                  }}
                                >
                                  <i className="mdi mdi-square-edit-outline"></i>
                                </button>
                              </td>
                              <td>
                                <div className="form-check form-switch">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={hotel.status === "y"}
                                    onChange={() =>
                                      handleStatusChange(
                                        hotel.id,
                                        hotel.status !== "y",
                                        hotel.hotelName
                                      )
                                    }
                                  />
                                  <label className="form-check-label px-0">
                                    {hotel.status === "y"
                                      ? "Active"
                                      : "Deactivated"}
                                  </label>
                                </div>
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
                      Page {currentPage} of {filteredTotalPages} | Total
                      Records: {totalFilteredProducts}
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
                <>
                  {showForm && (
                    <form
                      className="forms row"
                      onSubmit={
                        editMode
                          ? handleUpdateFormSubmit
                          : handleCreateFormSubmit
                      }
                    >
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
                        <label>Hotal Name</label>
                        <input
                          type="text"
                          required
                          className="form-control"
                          id="hotelName"
                          placeholder="Hotal Name"
                          onChange={handleInputChange}
                          value={formData.hotelName}
                        />
                      </div>

                      <div className="form-group col-md-6">
                        <label>Seo URL</label>
                        <input
                          type="text"
                          required
                          className="form-control"
                          id="seoUrl"
                          placeholder="Seo URL"
                          onChange={handleInputChange}
                          value={formData.seoUrl}
                        />
                      </div>

                      <div className="form-group col-md-6">
                        <label>No. of Stars</label>
                        <input
                          type="number"
                          required
                          className="form-control"
                          id="starRating"
                          placeholder="No. of Stars"
                          onChange={handleInputChange}
                          value={formData.starRating}
                        />
                      </div>

                      <div className="form-group col-md-6">
                        <label>Email</label>
                        <input
                          type="text"
                          required
                          className="form-control"
                          id="email"
                          placeholder="Email"
                          onChange={handleInputChange}
                          value={formData.email}
                        />
                      </div>

                      <div className="form-group col-md-6">
                        <label>Contact No.</label>
                        <input
                          type="text"
                          required
                          className="form-control"
                          id="phoneNumber"
                          placeholder="Contact No."
                          onChange={handleInputChange}
                          value={formData.phoneNumber}
                        />
                      </div>

                      <div className="form-group col-md-6">
                        <label htmlFor="imagePicker">Logo Image</label>
                        <input
                          type="file"
                          className="form-control"
                          id="logoImg"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, "logoImg")}
                        />
                      </div>

                      <div className="form-group col-md-6">
                        <label htmlFor="imagePicker">Thumb Image</label>
                        <input
                          type="file"
                          className="form-control"
                          id="thumbImg"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, "thumbImg")}
                        />
                      </div>

                      <div className="form-group col-md-4">
                        <label>ALT Tag</label>
                        <input
                          type="text"
                          required
                          className="form-control"
                          id="altTag"
                          placeholder="ALT Tag"
                          onChange={handleInputChange}
                          value={formData.altTag}
                        />
                      </div>

                      <div className="form-group col-md-4">
                        <label htmlFor="imagePicker">Banner Image</label>
                        <input
                          type="file"
                          className="form-control"
                          id="bannerImg"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, "bannerImg")}
                        />
                      </div>

                      <div className="form-group col-md-4">
                        <label>Address 1</label>
                        <input
                          type="text"
                          required
                          className="form-control"
                          id="addressLine1"
                          placeholder="Address 1"
                          onChange={handleInputChange}
                          value={formData.addressLine1}
                        />
                      </div>

                      <div className="form-group col-md-6">
                        <label>Address 2</label>
                        <input
                          type="text"
                          required
                          className="form-control"
                          id="addressLine2"
                          placeholder="Address 2"
                          onChange={handleInputChange}
                          value={formData.addressLine2}
                        />
                      </div>

                      <div className="form-group col-md-6">
                        <label>Landmark</label>
                        <input
                          type="text"
                          required
                          className="form-control"
                          id="landmark"
                          placeholder="Landmark"
                          onChange={handleInputChange}
                          value={formData.landmark}
                        />
                      </div>

                      <div className="form-group col-md-6">
                        <label htmlFor="COUNTRYDropdown">Select Country</label>
                        <select
                          className="form-select"
                          value={formData.countryId}
                          onChange={(e) => {
                            const selectedCountry = countryData.find(
                              (country) =>
                                country.id.toString() === e.target.value
                            );
                            handleCountryChange(
                              selectedCountry.countryCode,
                              selectedCountry.id
                            );
                          }}
                          disabled={loading}
                        >
                          <option value="">Select Country</option>
                          {countryData.map((country) => (
                            <option key={country.id} value={country.id}>
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
                          onChange={(e) => {
                            const selectedState = stateData.find(
                              (state) => state.id.toString() === e.target.value
                            );
                            handleStateChange(
                              selectedState.stateCode,
                              selectedState.id
                            );
                          }}
                          disabled={loading || !formData.countryId}
                        >
                          <option value="">Select State</option>
                          {stateData.map((state) => (
                            <option key={state.id} value={state.id}>
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
                          required
                          className="form-control"
                          id="postalCode"
                          placeholder="Pincode"
                          onChange={handleInputChange}
                          value={formData.postalCode}
                        />
                      </div>

                      <div className="form-group col-md-4">
                        <label>Latitude</label>
                        <input
                          type="text"
                          required
                          className="form-control"
                          id="latitude"
                          placeholder="Latitude"
                          onChange={handleInputChange}
                          value={formData.latitude}
                        />
                      </div>

                      <div className="form-group col-md-4">
                        <label>Longitude</label>
                        <input
                          type="text"
                          required
                          className="form-control"
                          id="longitude"
                          placeholder="Longitude"
                          onChange={handleInputChange}
                          value={formData.longitude}
                        />
                      </div>

                      <div className="form-group col-md-4">
                        <label>YouTube Link</label>
                        <input
                          type="text"
                          required
                          className="form-control"
                          id="youTubeLink"
                          placeholder="YouTube Link"
                          onChange={handleInputChange}
                          value={formData.youTubeLink}
                        />
                      </div>

                      <div className="container mt-4">
                        <div className="row mb-3 align-items-center">
                          <div className="col">
                            <h4 className="mb-0">Amenities</h4>
                          </div>
                          <div className="col-auto">
                            <form
                              className="d-inline-block serachform"
                              role="search"
                            >
                              <div className="input-group searchinput d-flex justify-content-end">
                                <input
                                  type="search"
                                  className="form-control"
                                  placeholder="Search"
                                  aria-label="Search"
                                  aria-describedby="search-icon"
                                  id="search"
                                />
                                <span
                                  className="input-group-text"
                                  id="search-icon"
                                >
                                  <i className="mdi mdi-magnify"></i>
                                </span>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                      <div className="p-2 border rounded">
                        <div className="row mx-0 g-3">
                          {loading ? (
                            <div>Loading amenities...</div>
                          ) : (
                            amenityData.map((amenities) => (
                              <div className="col-md-3" key={amenities.id}>
                                <div className="d-flex align-items-center p-2 border rounded">
                                  <input
                                    className="form-check-input me-2"
                                    type="checkbox"
                                    id={amenities.id}
                                    onChange={handleAmenityChange}
                                    checked={formData.amenities.some(
                                      (a) => a.amenity === String(amenities.id)
                                    )}
                                  />
                                  <label
                                    className="form-check-label text-black mb-0"
                                    htmlFor={amenities.id}
                                  >
                                    {amenities.amenityName}
                                  </label>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>

                      <div className="container mt-4">
                        <div className="row mb-3 align-items-center">
                          <div className="col">
                            <h4 className="mb-0">Tag</h4>
                          </div>
                          <div className="col-auto">
                            <form
                              className="d-inline-block serachform"
                              role="search"
                            >
                              <div className="input-group searchinput d-flex justify-content-end">
                                <input
                                  type="search"
                                  className="form-control"
                                  placeholder="Search"
                                  aria-label="Search"
                                  aria-describedby="search-icon"
                                  id="search"
                                />
                                <span
                                  className="input-group-text"
                                  id="search-icon"
                                >
                                  <i className="mdi mdi-magnify"></i>
                                </span>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                      <div className="p-2 border rounded">
                        <div className="row mx-0 g-3">
                          {loading ? (
                            <div>Loading tags...</div>
                          ) : (
                            tagData.map((tag) => (
                              <div className="col-md-3" key={tag.id}>
                                <div className="d-flex align-items-center p-2 border rounded">
                                  <input
                                    className="form-check-input me-2"
                                    type="checkbox"
                                    id={tag.id}
                                    onChange={handleTagChange}
                                    checked={formData.tag.some(
                                      (t) => t.masTagWise === String(tag.id)
                                    )}
                                  />
                                  <label
                                    className="form-check-label text-black mb-0"
                                    htmlFor={tag.id}
                                  >
                                    {tag.tagName}
                                  </label>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>

                      <div className="form-group col-md-12 mt-4">
                        <label>Short Description</label>
                        <div ref={shortDescToolbarRef}></div>
                        <CKEditor
                          editor={DecoupledEditor}
                          data={formData.shortDesc}
                          config={{
                            toolbar: {
                              shouldNotGroupWhenFull: true,
                            },
                            id: "shortDesc",
                          }}
                          onReady={(editor) => {
                            const toolbarContainer =
                              shortDescToolbarRef.current;
                            toolbarContainer.innerHTML = "";
                            toolbarContainer.appendChild(
                              editor.ui.view.toolbar.element
                            );
                          }}
                          onChange={(event, editor) =>
                            handleEditorChange(event, editor, "shortDesc")
                          }
                        />
                      </div>

                      <div className="form-group col-md-12">
                        <label>Long Description</label>
                        <div ref={longDescToolbarRef}></div>
                        <CKEditor
                          editor={DecoupledEditor}
                          data={formData.longDesc}
                          config={{
                            toolbar: {
                              shouldNotGroupWhenFull: true,
                            },
                            id: "longDesc",
                          }}
                          onReady={(editor) => {
                            const toolbarContainer = longDescToolbarRef.current;
                            toolbarContainer.innerHTML = "";
                            toolbarContainer.appendChild(
                              editor.ui.view.toolbar.element
                            );
                          }}
                          onChange={(event, editor) =>
                            handleEditorChange(event, editor, "longDesc")
                          }
                        />
                      </div>

                      <div className="form-group col-md-12">
                        <label>Note</label>
                        <div ref={noteToolbarRef}></div>
                        <CKEditor
                          editor={DecoupledEditor}
                          data={formData.note}
                          config={{
                            toolbar: {
                              shouldNotGroupWhenFull: true,
                            },
                            id: "note",
                          }}
                          onReady={(editor) => {
                            const toolbarContainer = noteToolbarRef.current;
                            toolbarContainer.innerHTML = "";
                            toolbarContainer.appendChild(
                              editor.ui.view.toolbar.element
                            );
                          }}
                          onChange={(event, editor) =>
                            handleEditorChange(event, editor, "note")
                          }
                        />
                      </div>

                      <div className="form-group col-md-12">
                        <div className="d-flex align-items-center">
                          <div className="form-check me-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="isFeature"
                              checked={formData.isFeature === "y"}
                              onChange={handleChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="isFeature"
                            >
                              isFeature
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="container mt-4">
                        {/* Hotel Image Section */}
                        <div className="row mb-3 align-items-center">
                          <div className="col">
                            <h4 className="mb-0">Hotel Images</h4>
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
                        {formData.hotelImage.map((image, index) => (
                          <div
                            key={image.id}
                            className="row mb-3 pb-3 border-bottom position-relative"
                          >
                            <div className="form-group col-md-4">
                              <label>Image Name #{index + 1}</label>
                              <input
                                type="text"
                                className="form-control"
                                value={image.imageName}
                                placeholder="Image Name"
                                onChange={(e) =>
                                  handleImageChange(
                                    image.id,
                                    "imageName",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div className="form-group col-md-4">
                              <label>Alt Tag #{index + 1}</label>
                              <input
                                type="text"
                                className="form-control"
                                value={image.altTag}
                                placeholder="Alt Tag"
                                onChange={(e) =>
                                  handleImageChange(
                                    image.id,
                                    "altTag",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div className="form-group col-md-4">
                              <label>Image File #{index + 1}</label>
                              <input
                                type="file"
                                className="form-control"
                                accept="image/*"
                                onChange={(e) =>
                                  handleImageChange(
                                    image.id,
                                    "imageUrl",
                                    e.target.files[0]
                                  )
                                }
                              />
                            </div>
                            {index > 0 && (
                              <button
                                onClick={() => removeImageRow(image.id)}
                                className="btn btn-danger btn-sm position-absolute top-0 end-0 mt-2 me-2"
                                style={{
                                  width: "30px",
                                  height: "30px",
                                  padding: "0",
                                  borderRadius: "50%",
                                }}
                              >
                                X
                              </button>
                            )}
                          </div>
                        ))}

                        {/* Heading Image Section */}
                        <div className="mt-4">
                          <div className="row mb-3 align-items-center">
                            <div className="col">
                              <h4>Heading Images</h4>
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

                          {formData.headingImage.map((hotel, index) => (
                            <div
                              key={hotel.id || index}
                              className="row mb-3 pb-3 border-bottom position-relative"
                            >
                              {/* Heading Input */}
                              <div className="form-group col-md-4">
                                <label>Heading #{index + 1}</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={hotel.heading}
                                  placeholder="Heading"
                                  onChange={(e) =>
                                    handleHotelFileChange(
                                      hotel.id,
                                      "heading",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>

                              {/* Image Input */}
                              <div className="form-group col-md-4">
                                <label>Image File #{index + 1}</label>
                                <input
                                  type="file"
                                  className="form-control"
                                  accept="image/*"
                                  onChange={(e) =>
                                    handleHotelFileChange(
                                      hotel.id,
                                      "imageUrl",
                                      e.target.files[0]
                                    )
                                  }
                                />
                              </div>

                              <div className="form-group col-md-12">
                                <label>Content #{index + 1}</label>
                                <div
                                  ref={(el) => {
                                    if (el)
                                      uploadHeadContent.current[index] = el;
                                  }}
                                ></div>
                                <CKEditor
                                  editor={DecoupledEditor}
                                  data={hotel.description || ""}
                                  config={{
                                    toolbar: {
                                      shouldNotGroupWhenFull: true,
                                    },
                                    id: `description-${index}`, 
                                  }}
                                  onReady={(editor) => {
                                    const toolbarContainer =
                                      uploadHeadContent.current[index];
                                    if (toolbarContainer) {
                                      toolbarContainer.innerHTML = "";
                                      toolbarContainer.appendChild(
                                        editor.ui.view.toolbar.element
                                      );
                                    }
                                  }}
                                  onChange={(event, editor) =>
                                    handleEditorChanges(
                                      hotel.id,
                                      editor.getData()
                                    )
                                  }
                                />
                              </div>

                              {/* Remove Button */}
                              {index > 0 && (
                                <button
                                  onClick={() => removeHotelRow(hotel.id)}
                                  className="btn btn-danger btn-sm position-absolute top-0 end-0 mt-2 me-2"
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    padding: "0",
                                    borderRadius: "50%",
                                  }}
                                >
                                  X
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="form-group col-md-12 d-flex justify-content-end">
                        <button
                          type="submit"
                          className="btn btn-primary me-2"
                          disabled={!formData.hotelName}
                        >
                          {editMode ? "Save Changes" : "Submit"}
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {showConfirmation && (
        <div className="modal d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Status Change</h5>
              </div>
              <div className="modal-body">
                <p className="text-lg mb-4 text-center">
                  Are you sure you want to{" "}
                  <strong>{newStatus ? "Activate" : "Deactivate"}</strong> To{" "}
                  <strong>{itemName}</strong> ?
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowConfirmation(false)}
                >
                  No
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={confirmStatusChange}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hoteldetails;
