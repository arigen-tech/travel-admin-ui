import { useLocation } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import { getRequest } from "../../service/apiService";
import { ITINERARY } from "../../config/apiConfig";

const Itinerary = ({ item , newPackageId}) => {
  const [itineraryData, setItineraryData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const editorRefs = useRef([]);
  const location = useLocation();
  const receivedItem = location.state?.item || null;
  const resultsPerPage = 10;
  const pkgId = item?.id;

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

              // Print dayIndex to the console
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
                    <button type="button" className="btn btn-danger me-2">
                      Add Hotel
                    </button>
                    <button type="button" className="btn btn-primary me-2">
                      Add Transfer
                    </button>
                  </div>
                </div>
              );
            });
          });
        })}
      </form>
    </>
  );
};

export default Itinerary;