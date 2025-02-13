import { useLocation } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import { getRequest } from "../../service/apiService";
import { ITINERARY } from "../../config/apiConfig";
import Popup from "../../../src/components/popup";


const Itinerary = ({ item, newPackageId }) => {
  const [itineraryData, setItineraryData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const editorRefs = useRef([]);
  const location = useLocation();
  const receivedItem = location.state?.item || null;
  const resultsPerPage = 10;
  const pkgId = item?.id;
  const [showHotelModal, setShowHotelModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferType, setTransferType] = useState("");
  const [transferOptions, setTransferOptions] = useState([]);
  const [selectedTransfer, setSelectedTransfer] = useState(null);
  const [transferList, setTransferList] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [popupMessage, setPopupMessage] = useState("");
  const [transferLists, setTransferLists] = useState({});
  const [currentEditingDay, setCurrentEditingDay] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [transferToRemove, setTransferToRemove] = useState(null);

  useEffect(() => {
    const packageId = item?.id || newPackageId;
    if (packageId) {
      fetchItineraryData(packageId);
    }
  }, [item?.id, newPackageId]);


  console.log("Received package ID:", newPackageId || pkgId);

  const fetchItineraryData = async (pkgId) => {
    if (!pkgId) return;

    setLoading(true);

    try {
      const data = await getRequest(`${ITINERARY}/${pkgId}`);

      if (data?.status === 200 && Array.isArray(data?.response)) {
        setItineraryData(data.response);
        setTotalPages(Math.ceil(data.response.length / resultsPerPage));

        console.log("Fetched Itinerary Data:", data.response);

        editorRefs.current = data.response.map(() => []);
      } else {
        console.warn("Unexpected API response format:", data);
        setItineraryData([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching itinerary data:", error);

      if (error.message.includes("401")) {
        console.warn("Unauthorized access. Redirecting to login...");
      } else if (error.message.includes("500")) {
        console.warn("Server error. Please try again later.");
      }

      setItineraryData([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  // Group itineraries by sequenceColumn
  const groupedItineraries = itineraryData.reduce((acc, itinerary) => {
    const key = itinerary.sequenceColumn;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(itinerary);
    return acc;
  }, {});

  const handleTransferTypeChange = (type) => {
    setTransferType(type);
    switch (type) {
      case "Car":
        setTransferOptions(["Maruti Ertiga", "Honda City"]);
        break;
      case "Van":
        setTransferOptions(["6 Seater Van"]);
        break;
      case "Bus":
        setTransferOptions(["10 Seater Bus"]);
        break;
      default:
        setTransferOptions([]);
    }
  };


  const handleAddTransfer = () => {
    if (transferType && currentEditingDay) {
      const { sequenceColumn, index, dayIndex } = currentEditingDay;
      const dayKey = `${sequenceColumn}-${index}-${dayIndex}`;
      setTransferLists(prevLists => ({
        ...prevLists,
        [dayKey]: [...(prevLists[dayKey] || []), transferType]
      }));
    }
    setShowTransferModal(false);
  };

  const handleRemoveTransfer = (sequenceColumn, index, dayIndex, transfer) => { // Change transferToRemove to transfer
    const dayKey = `${sequenceColumn}-${index}-${dayIndex}`;
    setTransferToRemove({ sequenceColumn, index, dayIndex, transfer }); // Use transfer here
    setShowConfirmationModal(true);
  };

  const confirmRemoveTransfer = () => {
    const { sequenceColumn, index, dayIndex, transfer } = transferToRemove;
    const dayKey = `${sequenceColumn}-${index}-${dayIndex}`;
    setTransferLists(prevLists => ({
      ...prevLists,
      [dayKey]: prevLists[dayKey].filter(t => t !== transfer)
    }));
    setShowConfirmationModal(false);
    setTransferToRemove(null);
    showPopup(
      "Transfer removed successfully!",
      "success"
    );
  };

  const cancelRemoveTransfer = () => {
    setShowConfirmationModal(false);
    setTransferToRemove(null);
  };


  const showPopup = (message, type = "success") => {
    setPopupMessage({
      message,
      type,
      onClose: () => {
        setPopupMessage(null);
      },
    });
  };


  return (
    <>
      {loading && <p>Loading...</p>}
      <form className="forms row">
        {Object.entries(groupedItineraries).map(([sequenceColumn, itineraries]) => {
          return itineraries.map((item, index) => {
            const numDays = item.dayNumber || 1;

            return Array.from({ length: numDays }).map((_, dayIndex) => {
              if (!editorRefs.current[index]) {
                editorRefs.current[index] = {};
              }

              console.log(`City: ${item.masCity?.cityName}, SequenceColumn: ${sequenceColumn}, DayIndex: ${dayIndex + 1}`);

              return (
                <div key={`${sequenceColumn}-${index}-${dayIndex}`} className="form-group row">
                  <div className="form-group col-md-6">
                    <label>
                      City: {item.masCity?.cityName}, Day # {dayIndex + 1} Heading & Description
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control border border-danger"
                      id={`name-${sequenceColumn}-${index}-${dayIndex}`}
                      name={`name-${sequenceColumn}-${index}-${dayIndex}`}
                      placeholder="Heading"
                      required
                      defaultValue={item.heading || ""}
                    />
                  </div>

                  <div className="form-group col-md-6">
                    <label htmlFor={`imagePicker-${sequenceColumn}-${index}-${dayIndex}`}>
                      Image <span className="text-danger">*</span>
                    </label>
                    <input
                      type="file"
                      className="form-control border border-danger"
                      id={`imagePicker-${sequenceColumn}-${index}-${dayIndex}`}
                      accept="image/*"
                      placeholder="No image chosen"
                    />
                  </div>

                  <div className="form-group col-md-12">
                    <label>Description</label>
                    <div ref={(el) => (editorRefs.current[index][dayIndex] = el)}></div>
                    <CKEditor
                      editor={DecoupledEditor}
                      config={{ toolbar: { shouldNotGroupWhenFull: true } }}
                      onReady={(editor) => {
                        const toolbarContainer = editorRefs.current[index][dayIndex];
                        if (toolbarContainer) {
                          toolbarContainer.innerHTML = "";
                          toolbarContainer.appendChild(editor.ui.view.toolbar.element);
                        }
                        editor.editing.view.change((writer) => {
                          writer.setStyle("min-height", "100px", editor.editing.view.document.getRoot());
                        });
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        console.log(`Day ${dayIndex + 1} Content:`, data);
                      }}
                    />
                  </div>

                  <div className="form-group col-md-12 d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn btn-danger me-2"
                      onClick={() => {
                        setSelectedCity(item.masCity);
                        setShowHotelModal(true);
                      }}
                    >
                      Add Hotel
                    </button>
                    <button type="button" className="btn btn-primary me-2"
                      onClick={() => {
                        setShowTransferModal(true);
                        setSelectedCity(item.masCity);
                        setCurrentEditingDay({
                          sequenceColumn,
                          index,
                          dayIndex
                        });
                      }}>
                      Add Transfer
                    </button>
                  </div>

                  <div className="d-flex justify-content-end me-5">
                    {transferLists[`${sequenceColumn}-${index}-${dayIndex}`]?.length > 0 && (
                      <div>
                        <h5 className="text-black" style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Selected Transfers:</h5>
                        <ul className="list-unstyled">
                          {(transferLists[`${sequenceColumn}-${index}-${dayIndex}`] || []).map((transfer, idx) => (
                            <li key={idx} className="text-black d-flex justify-content-between align-items-center">
                              {idx + 1}-{transfer}
                              <button
                                className="btn btn-link text-danger"
                                onClick={() => handleRemoveTransfer(sequenceColumn, index, dayIndex, transfer)}
                                aria-label="Remove transfer"
                              >
                                X
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                   

                    {showConfirmationModal && (
                      <div className="popup" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)', zIndex: 1000 }}>
                        <div className="popup-header d-flex justify-content-between align-items-center">
                          <h5 className="popup-title">Confirm Removal</h5>
                          <button type="button" className="btn-close" onClick={cancelRemoveTransfer}>X</button>
                        </div>
                        <div className="popup-body">
                          <p>You are about to remove this Transfer. This action cannot be undone.</p>
                        </div>
                        <div className="popup-footer d-flex justify-content-center">
                          <button type="button" className="btn btn-danger me-4" onClick={confirmRemoveTransfer}>
                            Yes, remove it
                          </button>
                          <button type="button" className="btn btn-secondary" onClick={cancelRemoveTransfer}>
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                </div>

              );
            });
          });
        })}




      </form>
      {popupMessage && (
                      <Popup
                        message={popupMessage.message}
                        type={popupMessage.type}
                        onClose={popupMessage.onClose}
                      />
                    )}
      {showHotelModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedCity?.cityName || 'Add Hotel'}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowHotelModal(false)}
                >X</button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <label className="form-label text-black">Hotel Type</label>
                    <select className="form-select">
                      <option value="">Select hotel type</option>
                      <option value="business">Business</option>
                      <option value="budget">Budget</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label text-black">Hotel</label>
                    <select className="form-select">
                      <option value="">Select hotel</option>
                      {/* Add hotel options here */}
                    </select>
                  </div>
                </div>

              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowHotelModal(false)}
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showTransferModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedCity?.cityName || 'Add Hotel'}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowTransferModal(false)}
                >X</button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <label className="form-label text-black">Transfer Type</label>
                    <select className="form-select" onChange={(e) => handleTransferTypeChange(e.target.value)}>
                      <option value="">Select Transfer type</option>
                      <option value="Car">Car</option>
                      <option value="Van">Van</option>
                      <option value="Bus">Bus</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label text-black">Transfer</label>
                    <select className="form-select" disabled={!transferOptions.length}>
                      <option value="">Select Transfer</option>
                      {transferOptions.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>

              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowTransferModal(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddTransfer}
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

export default Itinerary;