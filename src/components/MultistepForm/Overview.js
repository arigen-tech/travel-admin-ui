import React, { useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";

const Overview = ({onAddCity}) => {
    const editorToolbarRef = useRef(null);
    const summaryEditorToolbarRef = useRef(null);
    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        console.log({ event, editor, data });
    }

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
        { id: 12, name: "Jacksonville" }
    ];

    const [isCityModalOpen, setCityModalOpen] = useState(false);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDays, setSelectedDays] = useState(1);
    const [cityList, setCityList] = useState([]);
    const [totalPackageDays, setTotalPackageDays] = useState(10); 
    const [totalDaysAllocated, setTotalDaysAllocated] = useState(0); 
    const [noOfDays, setNoOfDays] = useState('');

    const handleAddCity = (e) => {
        e.preventDefault();
        const newCity = { city: selectedCity, days: selectedDays };
        onAddCity(selectedCity, selectedDays);
        setCityList([...cityList, newCity]);
        setTotalDaysAllocated(totalDaysAllocated + selectedDays); 
        setCityModalOpen(false);
    };

    const remainingDays = Math.max(totalPackageDays - totalDaysAllocated, 0);
    const isSelectCitiesDisabled =   noOfDays === '' ||  selectedDays <= 0 || remainingDays <= 0;

    const handleRemoveCity = (index) => {
        const cityToRemove = cityList[index];
        const updatedCityList = cityList.filter((_, i) => i !== index);
        setCityList(updatedCityList);
        setTotalDaysAllocated(totalDaysAllocated - cityToRemove.days); 
    };

   
    return (
        <>
            <div>
                <form className="forms row">
                    <div className="form-group col-md-6">
                        <label>Package Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="PackageName"
                            placeholder="Enter Package Name"
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label>URL</label>
                        <input
                            type="text"
                            className="form-control"
                            id="url"
                            placeholder="Enter SEO URL"
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label>YouTube URL</label>
                        <input
                            type="text"
                            className="form-control"
                            id="youtubeUrl"
                            placeholder="Enter YouTube URL"
                        />
                    </div>
                    <div className="form-group col-md-3">
                        <label>Valid From</label>
                        <input
                            type="date"
                            className="form-control"
                            id="validFrom"
                            placeholder="Enter Valid From"
                        />
                    </div>
                    <div className="form-group col-md-3">
                        <label>Valid To</label>
                        <input
                            type="date"
                            className="form-control"
                            id="validTo"
                            placeholder="Enter Valid To"
                        />
                    </div>
                    <div className="form-group col-md-4">
                        <label>Package Code</label>
                        <input
                            type="text"
                            className="form-control"
                            id="packageCode"
                            placeholder="Enter Package Code"
                        />
                    </div>
                    <div className="form-group col-md-4">
                        <label>Meta Keyword</label>
                        <input
                            type="text"
                            className="form-control"
                            id="metaKeyword"
                            placeholder="Enter Meta Keyword"
                        />
                    </div>
                    <div className="form-group col-md-4">
                        <label>Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            placeholder="Enter SEO Title"
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label>Og Tag</label>
                        <textarea
                            className="form-control"
                            id="ogTag"
                            placeholder="Enter Og Tag"
                            rows="3"
                            style={{ height: 'auto' }}
                        ></textarea>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Meta Description</label>
                        <textarea
                            className="form-control"
                            id="metaDescription"
                            placeholder="Enter Meta Description"
                            rows="3"
                            style={{ height: 'auto' }}
                        ></textarea>
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
                    <div className="form-group col-md-5">
                        <label>Thumb Image</label>
                        <input type="file" className="form-control" id="thumbImage" />
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
                                if (value <= 99) { // Ensure the value does not exceed 99
                                    setNoOfDays(value);
                                    setTotalPackageDays(value); // Update total package days
                                }
                            }}
                        />
                    </div>
                    <div className="form-group col-md-2 mt-4 d-flex justify-content-end">
                        <button className="btn btn-primary btn-sm me-5" onClick={(e) => { e.preventDefault(); setCityModalOpen(true); }}  disabled={isSelectCitiesDisabled}>
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
                                    <th>
                                        <button className="btn btn-sm btn-danger"><i className="mdi mdi-trash-can"></i></button>
                                    </th>

                                </tr>
                            </thead>
                            <tbody>
                                {cityList.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.city}</td>
                                        <td>{item.days}</td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-danger"
                                                onClick={() => handleRemoveCity(index)}
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
                        <div className="row">
                            <div className="form-check col-md-2">
                                <input className="form-check-input" type="checkbox" id="flights" />
                                <label className="form-check-label" htmlFor="flights">Flights</label>
                            </div>
                            <div className="form-check col-md-2">
                                <input className="form-check-input" type="checkbox" id="hotelStay" />
                                <label className="form-check-label" htmlFor="hotelStay">Hotel Stay</label>
                            </div>
                            <div className="form-check col-md-2">
                                <input className="form-check-input" type="checkbox" id="meals" />
                                <label className="form-check-label" htmlFor="meals">Meals</label>
                            </div>
                            <div className="form-check col-md-2">
                                <input className="form-check-input" type="checkbox" id="transfers" />
                                <label className="form-check-label" htmlFor="transfers">Transfers</label>
                            </div>
                            <div className="form-check col-md-2">
                                <input className="form-check-input" type="checkbox" id="sightseeing" />
                                <label className="form-check-label" htmlFor="sightseeing">Sightseeing</label>
                            </div>
                            <div className="form-check col-md-2">
                                <input className="form-check-input" type="checkbox" id="cruise" />
                                <label className="form-check-label" htmlFor="cruise">Cruise</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group col-md-12">
                        <label>Tags</label>
                        <div className="row">
                            <div className="form-check col-md-2">
                                <input className="form-check-input" type="checkbox" id="honeymoonHolidays" />
                                <label className="form-check-label" htmlFor="honeymoonHolidays">Honeymoon Holidays</label>
                            </div>
                            <div className="form-check col-md-2">
                                <input className="form-check-input" type="checkbox" id="adventureHoliday" />
                                <label className="form-check-label" htmlFor="adventureHoliday">Adventure Holiday</label>
                            </div>
                            <div className="form-check col-md-2">
                                <input className="form-check-input" type="checkbox" id="internationalHoliday" />
                                <label className="form-check-label" htmlFor="internationalHoliday">International Holiday</label>
                            </div>
                            <div className="form-check col-md-2">
                                <input className="form-check-input" type="checkbox" id="domesticHoliday" />
                                <label className="form-check-label" htmlFor="domesticHoliday">Domestic Holiday</label>
                            </div>
                            <div className="form-check col-md-2">
                                <input className="form-check-input" type="checkbox" id="hillStationHoliday" />
                                <label className="form-check-label" htmlFor="hillStationHoliday">Hill Station Holiday</label>
                            </div>
                            <div className="form-check col-md-2">
                                <input className="form-check-input" type="checkbox" id="beachHoliday" />
                                <label className="form-check-label" htmlFor="beachHoliday">Beach Holiday</label>
                            </div>
                            <div className="form-check col-md-2">
                                <input className="form-check-input" type="checkbox" id="pilgrimHoliday" />
                                <label className="form-check-label" htmlFor="pilgrimHoliday">Pilgrim Holiday</label>
                            </div>
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
                                        <button type="button" className="close" onClick={() => setCityModalOpen(false)}>
                                            <span>&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="form-group">
                                            <label>City</label>
                                            <select className="form-control" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
                                                <option value="">Select a city</option>
                                                {cities.map(city => (
                                                    <option key={city.id} value={city.name}>{city.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>No of Days</label>
                                            <select 
                                                className="form-control" 
                                                value={selectedDays} 
                                                onChange={(e) => setSelectedDays(Number(e.target.value))}
                                            >
                                                {[...Array(remainingDays).keys()].map(day => (
                                                    <option key={day + 1} value={day + 1}>{day + 1}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={() => setCityModalOpen(false)}>Cancel</button>
                                        <button type="button" className="btn btn-primary" onClick={handleAddCity}>Add</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
        </>
    );
};

export default Overview;
