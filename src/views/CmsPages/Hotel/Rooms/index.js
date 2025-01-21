import React, { useState, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";

const Rooms = () => {
    const [editRoom, setEditRoom] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const descriptionRef = useRef(null);
    const inclusionRef = useRef(null);
    const exclusionRef = useRef(null);
    const termsRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState("");
    const roomsPerPage = 5;


    const [thumbImage, setThumbImage] = useState(null);
    const [selectedHotel, setSelectedHotel] = useState("");
    const [selectedCurrency, setSelectedCurrency] = useState("");

    const isFormValid = thumbImage && selectedHotel && selectedCurrency;

    const [rows, setRows] = useState([{ id: 1 }])

    const [rooms, setRooms] = useState([
        { id: 1, hotel: "The Lalit Grand Palace Srinagar", isActive: true },
        { id: 2, hotel: "ibis Styles Goa Calangute Resort An AccorHotels B", isActive: false },
    ]);

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        console.log({ event, editor, data });
    }

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const addRow = () => {
        const newRow = {
            id: rows.length + 1
        }
        setRows([...rows, newRow])
    }

    const handleEdit = (room) => {
        setEditRoom(room);
        setShowForm(true);
    };

    const removeRow = (id) => {
        setRows(rows.filter(row => row.id !== id))
    }

    const filteredRooms = rooms.filter(room =>
        room.hotel.toLowerCase().includes(searchQuery.toLowerCase())
    );

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

    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, roomId: null, newStatus: false });

    const handleSwitchChange = (id, newStatus) => {
        setConfirmDialog({ isOpen: true, roomId: id, newStatus });
    };

    const handleConfirm = (confirm) => {
        if (confirm) {
            setRooms(rooms.map(room =>
                room.id === confirmDialog.roomId ? { ...room, isActive: confirmDialog.newStatus } : room
            ));
        }
        setConfirmDialog({ isOpen: false, roomId: null, newStatus: false });
    };

    const totalPages = Math.ceil(filteredRooms.length / roomsPerPage);
    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

    return (
        <div className="content-wrapper">
            <div className="row">
                <div className="col-12 grid-margin stretch-card">
                    <div className="card form-card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h4 className="card-title">Rooms</h4>

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
                                                    value={searchQuery}
                                                    onChange={handleSearchChange}
                                                />
                                                <span className="input-group-text" id="search-icon">
                                                    <i className="mdi mdi-magnify"></i>
                                                </span>
                                            </div>
                                        </form>
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
                                                    <th>Hotel</th>
                                                    <th>Image</th>

                                                    <th>Edit</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredRooms.map((room, index) => (
                                                    <tr key={room.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{room.hotel}</td>
                                                        <td>{ }</td>

                                                        <td>
                                                            <button
                                                                className={`btn btn-sm ${room.isActive ? 'btn-success' : 'btn-secondary'} me-2`}
                                                                onClick={() => handleEdit(room)}
                                                                disabled={!room.isActive}
                                                            >
                                                                <i className="mdi mdi-square-edit-outline"></i>
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <div className="form-check form-switch">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    checked={room.isActive}
                                                                    onChange={() => handleSwitchChange(room.id, !room.isActive)}
                                                                />
                                                                <label className="form-check-label px-0">
                                                                    {room.isActive ? 'Active' : 'Deactivated'}
                                                                </label>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <nav className="d-flex justify-content-between align-items-center mt-3">
                                        <div>
                                            <span>
                                                Page {currentPage} of {totalPages} | Total Records: {filteredRooms.length}
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
                                <>
                                    <form className="forms row">
                                        <div className="form-group col-md-4">
                                            <label htmlFor="imagePicker">Thumb Image  <span className="text-danger ">*</span></label>
                                            <input
                                                type="file"
                                                className="form-control border border-danger"
                                                id="imagePicker"
                                                accept="image/*"
                                                placeholder="No image chosen"
                                                onChange={(e) => setThumbImage(e.target.files[0])}
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
                                            <label>Alt Tag</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="star"
                                                placeholder="Alt Tag"
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="hotelDropdown">Select Hotel  <span className="text-danger">*</span></label>
                                            <select
                                                className="form-control border border-danger"
                                                id="hotelDropdown"
                                                onChange={(e) => setSelectedHotel(e.target.value)}
                                            >
                                                <option value="" disabled selected>
                                                    Select Hotel
                                                </option>
                                                <option value="Hotel Opera Lafayette">Hotel Opera Lafayette</option>
                                                <option value="Timhotel Tour Montparnasse">Timhotel Tour Montparnasse</option>
                                                <option value="10 Avenue de la Fosse des Pressoirs, Disneyland, P">10 Avenue de la Fosse des Pressoirs, Disneyland, P</option>
                                                <option value="CAMPANILE VAL DE France">CAMPANILE VAL DE France</option>
                                                <option value="Beach House Shore House Ocean Pearl or Similar">Beach House Shore House Ocean Pearl or Similar</option>
                                                <option value="Coorg Wilderness Resort & Spa">Coorg Wilderness Resort & Spa</option>
                                                <option value="Coorg Mandarin">Coorg Mandarin</option>
                                                <option value="Heritage Resort">Heritage Resort</option>
                                                <option value="Regenta Kabini Spring Resort">Regenta Kabini Spring Resort</option>
                                                <option value="Coral Beach Resort">Coral Beach Resort</option>
                                                <option value="Hotel Tide">Hotel Tide</option>
                                                <option value="Taj Bekal Resort & Spa, Kerala">Taj Bekal Resort & Spa, Kerala</option>
                                                <option value="Courtyard Kochi Airport">Courtyard Kochi Airport</option>
                                                <option value="Radisson Blu">Radisson Blu</option>
                                                <option value="FabHotel Yahweh Beach Inn With Bar, Calangute">FabHotel Yahweh Beach Inn With Bar, Calangute</option>
                                                <option value="Crystal Goa Turquoise Edition">Crystal Goa Turquoise Edition</option>
                                                <option value="ibis Styles Goa Calangute Resort An AccorHotels B Calangute, Goa, India">
                                                    ibis Styles Goa Calangute Resort An AccorHotels B Calangute, Goa, India
                                                </option>
                                                <option value="Thomson House Stay at Calangute Goa">Thomson House Stay at Calangute Goa</option>
                                                <option value="Casa De Goa - Boutique Resort - Calangute">Casa De Goa - Boutique Resort - Calangute</option>
                                                <option value="MOSH by the shore">MOSH by the shore</option>
                                                <option value="Hilton Bali Resort">Hilton Bali Resort</option>
                                                <option value="The dream garden">The dream garden</option>
                                                <option value="Treeya Lanta">Treeya Lanta</option>
                                                <option value="The Lalit Grand Palace Srinagar">The Lalit Grand Palace Srinagar</option>
                                            </select>
                                        </div>

                                        <div className="form-group col-md-6">
                                            <label htmlFor="currencyDropdown">Select Currency  <span className="text-danger">*</span></label>
                                            <select
                                                className="form-control border border-danger"
                                                id="currencyDropdown"
                                                onChange={(e) => setSelectedCurrency(e.target.value)}
                                            >
                                                <option value="" disabled selected>
                                                    Select Currency
                                                </option>
                                                <option value="Israeli new shekel (ILS)">Israeli new shekel (ILS)</option>
                                                <option value="Jamaican dollar (JMD)">Jamaican dollar (JMD)</option>
                                                <option value="Japanese yen (JPY)">Japanese yen (JPY)</option>
                                                <option value="Jordanian dinar (JOD)">Jordanian dinar (JOD)</option>
                                                <option value="Kazakhstani tenge (KZT)">Kazakhstani tenge (KZT)</option>
                                                <option value="Kenyan shilling (KES)">Kenyan shilling (KES)</option>
                                                <option value="Kuwaiti dinar (KWD)">Kuwaiti dinar (KWD)</option>
                                                <option value="Kyrgyzstani som (KGS)">Kyrgyzstani som (KGS)</option>
                                                <option value="Lao kip (LAK)">Lao kip (LAK)</option>
                                                <option value="Latvian lats (LVL)">Latvian lats (LVL)</option>
                                                <option value="Lebanese pound (LBP)">Lebanese pound (LBP)</option>
                                                <option value="Lesotho loti (LSL)">Lesotho loti (LSL)</option>
                                                <option value="Liberian dollar (LRD)">Liberian dollar (LRD)</option>
                                                <option value="Libyan dinar (LYD)">Libyan dinar (LYD)</option>
                                                <option value="Lithuanian litas (LTL)">Lithuanian litas (LTL)</option>
                                                <option value="Macanese pataca (MOP)">Macanese pataca (MOP)</option>
                                                <option value="Macedonian denar (MKD)">Macedonian denar (MKD)</option>
                                                <option value="Malagasy ariary (MGA)">Malagasy ariary (MGA)</option>
                                                <option value="Malawian kwacha (MWK)">Malawian kwacha (MWK)</option>
                                                <option value="Malaysian ringgit (MYR)">Malaysian ringgit (MYR)</option>
                                                <option value="Maldivian rufiyaa (MVR)">Maldivian rufiyaa (MVR)</option>
                                                <option value="Mauritanian ouguiya (MRU)">Mauritanian ouguiya (MRU)</option>
                                                <option value="Mauritian rupee (MUR)">Mauritian rupee (MUR)</option>
                                                <option value="Mexican peso (MXN)">Mexican peso (MXN)</option>
                                                <option value="Moldovan leu (MDL)">Moldovan leu (MDL)</option>
                                                <option value="Mongolian tögrög (MNT)">Mongolian tögrög (MNT)</option>
                                                <option value="Moroccan dirham (MAD)">Moroccan dirham (MAD)</option>
                                                <option value="Mozambican metical (MZN)">Mozambican metical (MZN)</option>
                                                <option value="Myanmar kyat (MMK)">Myanmar kyat (MMK)</option>
                                                <option value="Namibian dollar (NAD)">Namibian dollar (NAD)</option>
                                                <option value="Nepalese rupee (NPR)">Nepalese rupee (NPR)</option>
                                                <option value="Netherlands Antillean guilder (ANG)">Netherlands Antillean guilder (ANG)</option>
                                                <option value="New Taiwan dollar (TWD)">New Taiwan dollar (TWD)</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label>Description</label>
                                            <div ref={descriptionRef}></div>
                                            <CKEditor
                                                editor={DecoupledEditor}
                                                config={{
                                                    toolbar: {
                                                        shouldNotGroupWhenFull: true,
                                                    },
                                                }}
                                                onReady={(editor) => {
                                                    const toolbarContainer = descriptionRef.current;
                                                    toolbarContainer.innerHTML = "";
                                                    toolbarContainer.appendChild(editor.ui.view.toolbar.element);
                                                }}
                                                onChange={handleEditorChange}
                                            />
                                        </div>

                                        <div className="form-group col-md-12">
                                            <label>INCLUSIONS</label>
                                            <div ref={inclusionRef}></div>
                                            <CKEditor
                                                editor={DecoupledEditor}
                                                config={{
                                                    toolbar: {
                                                        shouldNotGroupWhenFull: true,
                                                    },
                                                }}
                                                onReady={(editor) => {
                                                    const toolbarContainer = inclusionRef.current;
                                                    toolbarContainer.innerHTML = "";
                                                    toolbarContainer.appendChild(editor.ui.view.toolbar.element);
                                                }}
                                                onChange={handleEditorChange}
                                            />
                                        </div>

                                        <div className="form-group col-md-12">
                                            <label>EXCLUSIONS</label>
                                            <div ref={exclusionRef}></div>
                                            <CKEditor
                                                editor={DecoupledEditor}
                                                config={{
                                                    toolbar: {
                                                        shouldNotGroupWhenFull: true,
                                                    },
                                                }}
                                                onReady={(editor) => {
                                                    const toolbarContainer = exclusionRef.current;
                                                    toolbarContainer.innerHTML = "";
                                                    toolbarContainer.appendChild(editor.ui.view.toolbar.element);
                                                }}
                                                onChange={handleEditorChange}
                                            />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label>Terms And Conditions</label>
                                            <div ref={termsRef}></div>
                                            <CKEditor
                                                editor={DecoupledEditor}
                                                config={{
                                                    toolbar: {
                                                        shouldNotGroupWhenFull: true,
                                                    },
                                                }}
                                                onReady={(editor) => {
                                                    const toolbarContainer = termsRef.current;
                                                    toolbarContainer.innerHTML = "";
                                                    toolbarContainer.appendChild(editor.ui.view.toolbar.element);
                                                }}
                                                onChange={handleEditorChange}
                                            />
                                        </div>

                                        {/* <div className="table-responsive">
                                            <table className="table table-hover">
                                                <thead className="thead-inverse">
                                                    <tr>
                                                        <th>SNo.</th>
                                                        <th style={{ minWidth: "160px" }}><a href="javascript:">Room&nbsp;Type</a></th>
                                                        <th style={{ minWidth: "150px" }}><a href="javascript:">From&nbsp;Date</a></th>
                                                        <th style={{ minWidth: "150px" }}><a href="javascript:">To&nbsp;Date</a></th>
                                                        <th style={{ minWidth: "150px" }}><a href="javascript:">Meal</a></th>
                                                        <th style={{ minWidth: "150px" }}><a href="javascript:">Bed</a></th>
                                                        <th style={{ minWidth: "80px" }}><a href="javascript:">RoomSize</a></th>
                                                        <th><a href="javascript:300px" className="roomimgsection-ssddd">Room Img</a></th>
                                                        <th><a href="javascript:">Base&nbsp;Price</a></th>
                                                        <th><a href="javascript:">Per&nbsp;Adult&nbsp;Extra&nbsp;Price</a></th>
                                                        <th><a href="javascript:">Per&nbsp;Child&nbsp;Extra&nbsp;N.B.&nbsp;Price</a></th>
                                                        <th><a href="javascript:">Per&nbsp;Child&nbsp;Extra&nbsp;W.B.&nbsp;Price</a></th>
                                                        <th style={{ minWidth: "80px" }}><a href="javascript:">Age</a></th>
                                                        <th><a href="javascript:">Weekend Price</a></th>
                                                        <th><a href="javascript:">M.O.F&nbsp;Child&nbsp;Allowed</a></th>
                                                        <th><a href="javascript:">B.O.F&nbsp;Adults&nbsp;Allowed</a></th>
                                                        <th><a href="javascript:">B.O.F&nbsp;Children&nbsp;Allowed</a></th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {rows.map((row) => (
                                                        <tr key={row.id} className="hover:bg-gray-50">
                                                            <td className="p-2 border">{row.id}</td>
                                                            <td className="p-2 border">
                                                                <select className="form-control">
                                                                    <option value="">Select Room Type</option>
                                                                    <option value="standard">Standard</option>
                                                                    <option value="deluxe">Deluxe</option>
                                                                    <option value="suite">Suite</option>
                                                                </select>
                                                            </td>
                                                            <td className="p-2 border">
                                                                <input type="date" className="form-control" />
                                                            </td>
                                                            <td className="p-2 border">
                                                                <input type="date" className="form-control" />
                                                            </td>
                                                            <td className="p-2 border">
                                                                <select className="form-control">
                                                                    <option value="">Select Meal</option>
                                                                    <option value="breakfast">Breakfast</option>
                                                                    <option value="half-board">Half Board</option>
                                                                    <option value="full-board">Full Board</option>
                                                                </select>
                                                            </td>
                                                            <td className="p-2 border">
                                                                <select className="form-control">
                                                                    <option value="">Select Bed</option>
                                                                    <option value="single">Single</option>
                                                                    <option value="double">Double</option>
                                                                    <option value="king">King</option>
                                                                </select>
                                                            </td>
                                                            <td className="p-2 border">
                                                                <input type="text" className="form-control" placeholder="Size" />
                                                            </td>
                                                            <td className="p-2 border">
                                                                <input type="file" className="form-control" accept="image/*" />
                                                            </td>
                                                            <td className="p-2 border">
                                                                <input type="number" className="form-control" placeholder="Price" />
                                                            </td>
                                                            <td className="p-2 border">
                                                                <input type="number" className="form-control" placeholder="Adult Price" />
                                                            </td>
                                                            <td className="p-2 border">
                                                                <input type="number" className="form-control" placeholder="Child N.B. Price" />
                                                            </td>
                                                            <td className="p-2 border">
                                                                <input type="number" className="form-control" placeholder="Child W.B. Price" />
                                                            </td>
                                                            <td className="p-2 border">
                                                                <input type="number" className="form-control" placeholder="Age" />
                                                            </td>
                                                            <td className="p-2 border">
                                                                <input type="number" className="form-control" placeholder="Weekend Price" />
                                                            </td>
                                                            <td className="p-2 border">
                                                                <input type="number" className="form-control" placeholder="MOF Child" />
                                                            </td>
                                                            <td className="p-2 border">
                                                                <input type="number" className="form-control" placeholder="BOF Adults" />
                                                            </td>
                                                            <td className="p-2 border">
                                                                <input type="text" className="form-control" placeholder="BOF" />
                                                            </td>
                                                            <td className="p-2 border">
                                                                <button
                                                                    className="btn btn-danger"
                                                                    onClick={() => removeRow(row.id)}
                                                                >
                                                                    &times;
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div> */}

                                        <div className="form-group col-md-12 d-flex justify-content-end">
                                            <button type="submit" className="btn btn-primary me-2" disabled={!isFormValid}>
                                                {editRoom ? 'Update' : 'Submit'}
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={() => {
                                                    setShowForm(false);
                                                    setEditRoom(null);
                                                }}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </>
                            )}

                            {confirmDialog.isOpen && (
                                <div className="modal d-block" tabIndex="-1" role="dialog">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title">Confirm Status Change</h5>
                                                <button type="button" className="close" onClick={() => handleConfirm(false)}>
                                                    <span>&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <p>Are you sure you want to {confirmDialog.newStatus ? 'activate' : 'deactivate'} <strong>{rooms.find(room => room.id === confirmDialog.roomId)?.hotel}</strong>?</p>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" onClick={() => handleConfirm(false)}>No</button>
                                                <button type="button" className="btn btn-primary" onClick={() => handleConfirm(true)}>Yes</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Rooms;
