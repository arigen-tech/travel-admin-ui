import React, { useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";

const Overview = () => {
    const editorToolbarRef = useRef(null);
    const summaryEditorToolbarRef = useRef(null);
    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        console.log({ event, editor, data });
    }
    return (
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
                <div className="form-group col-md-6">
                    <label>Thumb Image</label>
                    <input type="file" className="form-control" id="thumbImage" />
                </div>
                <div className="form-group col-md-6">
                    <label>No of Days (Max 99 Days)</label>
                    <input
                        type="number"
                        className="form-control"
                        id="noOfDays"
                        placeholder="Enter No of Days"
                        max="99"
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
                    <label>Tags</label>
                    <div className="row mx-0">
                    <div className="form-check col-md-1">
                        <input className="form-check-input" type="checkbox" id="honeymoonHolidays" />
                        <label className="form-check-label" htmlFor="honeymoonHolidays">Honeymoon Holidays</label>
                    </div>
                    <div className="form-check col-md-1">
                        <input className="form-check-input" type="checkbox" id="adventureHoliday" />
                        <label className="form-check-label" htmlFor="adventureHoliday">Adventure Holiday</label>
                    </div>
                    <div className="form-check col-md-1">
                        <input className="form-check-input" type="checkbox" id="internationalHoliday" />
                        <label className="form-check-label" htmlFor="internationalHoliday">International Holiday</label>
                    </div>
                    <div className="form-check col-md-1">
                        <input className="form-check-input" type="checkbox" id="domesticHoliday" />
                        <label className="form-check-label" htmlFor="domesticHoliday">Domestic Holiday</label>
                    </div>
                    <div className="form-check col-md-1">
                        <input className="form-check-input" type="checkbox" id="hillStationHoliday" />
                        <label className="form-check-label" htmlFor="hillStationHoliday">Hill Station Holiday</label>
                    </div>
                    <div className="form-check col-md-1">
                        <input className="form-check-input" type="checkbox" id="beachHoliday" />
                        <label className="form-check-label" htmlFor="beachHoliday">Beach Holiday</label>
                    </div>
                    <div className="form-check col-md-1">
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
    );
};

export default Overview;
