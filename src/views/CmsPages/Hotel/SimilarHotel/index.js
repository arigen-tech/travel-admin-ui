import React, { useState , useEffect} from "react";
import Popup from "../../../../components/popup";

const Similarhotel = () => {
    const [hotels, setHotels] = useState([
        {
            id: 1,
            name: "Hotel Opera Lafayette",
            similarHotels: "Timhotel Tour Montparnasse, CAMPANILE VAL DE France",
            isActive: true
        },
        {
            id: 2,
            name: "Hilton Bali Resort",
            similarHotels: "The dream garden, Treeya Lanta",
            isActive: false
        },
        {
            id: 3,
            name: "Coorg Wilderness Resort & Spa",
            similarHotels: "Coorg Mandarin, Heritage Resort",
            isActive: true
        }
    ]);
    const [showForm, setShowForm] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    const [editingHotel, setEditingHotel] = useState(null);
    const [selectedHotel, setSelectedHotel] = useState("");
    const [selectedSimilarHotel, setSelectedSimilarHotel] = useState("");
    const [popupMessage, setPopupMessage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 2;
    const totalRecords = hotels.length;
    const [confirmDialog, setConfirmDialog] = useState({
        isOpen: false,
        roomId: null,
        newStatus: false
    });

    // List of all available hotels
    const hotelOptions = [
        "Hotel Opera Lafayette",
        "Timhotel Tour Montparnasse",
        "10 Avenue de la Fosse des Pressoirs, Disneyland, P",
        "CAMPANILE VAL DE France",
        "Beach House Shore House Ocean Pearl or Similar",
        "Coorg Wilderness Resort & Spa",
        "Coorg Mandarin",
        "Heritage Resort",
        "Regenta Kabini Spring Resort",
        "Coral Beach Resort",
        "Hotel Tide",
        "Taj Bekal Resort & Spa, Kerala",
        "Courtyard Kochi Airport",
        "Radisson Blu",
        "FabHotel Yahweh Beach Inn With Bar, Calangute",
        "Crystal Goa Turquoise Edition",
        "ibis Styles Goa Calangute Resort An AccorHotels B Calangute, Goa, India",
        "Thomson House Stay at Calangute Goa",
        "Casa De Goa - Boutique Resort - Calangute",
        "MOSH by the shore",
        "Hilton Bali Resort",
        "The dream garden",
        "Treeya Lanta",
        "The Lalit Grand Palace Srinagar"
    ];

    const showPopup = (message, type = 'info') => {
        setPopupMessage({
            message,
            type,
            onClose: () => {
                setPopupMessage(null);
            }
        });
    };

    const handleStatusToggle = (id, newStatus) => {
        const hotel = hotels.find(hotel => hotel.id === id);
        setConfirmDialog({
            isOpen: true,
            roomId: id,
            newStatus: newStatus
        });
    };

    const handleConfirm = (confirmed) => {
        if (confirmed) {
            setHotels(prevHotels => prevHotels.map(hotel =>
                hotel.id === confirmDialog.roomId ? { ...hotel, isActive: confirmDialog.newStatus } : hotel
            ));
        }
        setConfirmDialog({ isOpen: false, roomId: null, newStatus: false });
    };

    const handleEdit = (hotel) => {
        setShowForm(true);
        setEditingHotel(hotel);
        setSelectedHotel(hotel.name);
        setSelectedSimilarHotel(hotel.similarHotels);
    };
    useEffect(() => {
        setIsFormValid(selectedHotel.trim() && selectedSimilarHotel.trim());
      }, [selectedHotel, selectedSimilarHotel]);
      

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectedHotel || !selectedSimilarHotel) {
            showPopup('Please fill all required fields!', "error");
            return;
        }

        if (editingHotel) {
            setHotels(prevHotels => prevHotels.map(hotel =>
                hotel.id === editingHotel.id
                    ? {
                        ...hotel,
                        name: selectedHotel,
                        similarHotels: selectedSimilarHotel
                    }
                    : hotel
            ));
            showPopup('Hotel updated successfully!', "success");
        } else {
            setHotels(prevHotels => [...prevHotels, {
                id: prevHotels.length + 1,
                name: selectedHotel,
                similarHotels: selectedSimilarHotel,
                isActive: true
            }]);
            showPopup('Hotel added successfully!', "success");
        }

        resetForm();
    };

    const resetForm = () => {
        setShowForm(false);
        setEditingHotel(null);
        setSelectedHotel("");
        setSelectedSimilarHotel("");
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

    return (
        <div className="content-wrapper">
            {popupMessage && (
                <Popup
                    message={popupMessage.message}
                    type={popupMessage.type}
                    onClose={popupMessage.onClose}
                />
            )}
            <div className="row">
                <div className="col-12 grid-margin stretch-card">
                    <div className="card form-card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h4 className="card-title">Similar Hotel </h4>
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
                                        onClick={() => {
                                            setShowForm(false);
                                            setEditingHotel(null);
                                            setSelectedHotel("");
                                            setSelectedSimilarHotel("");
                                        }}
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
                                                    <th>SNo.</th>
                                                    <th>Name</th>
                                                    <th>Similar Hotels</th>
                                                    <th>Edit</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {hotels.length > 0 ? (
                                                    hotels.map((hotel, index) => (
                                                        <tr key={hotel.id}>
                                                            <td>{index + 1}</td>
                                                            <td>{hotel.name}</td>
                                                            <td>{hotel.similarHotels}</td>
                                                            <td>
                                                                <button
                                                                    className="btn btn-sm btn-success me-2"
                                                                    onClick={() => handleEdit(hotel)}
                                                                    disabled={!hotel.isActive}
                                                                >
                                                                    <i className="mdi mdi-square-edit-outline"></i>
                                                                </button>
                                                            </td>
                                                            <td>
                                                                <div className="form-check form-switch">
                                                                    <input
                                                                        className="form-check-input"
                                                                        type="checkbox"
                                                                        checked={hotel.isActive}
                                                                        onChange={() => handleStatusToggle(hotel.id, !hotel.isActive)}
                                                                    />
                                                                    <label className="form-check-label px-0">
                                                                        {hotel.isActive ? 'Active' : 'Deactive'}
                                                                    </label>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="5" className="text-center">
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
                                                Page {currentPage} of {totalPages} | Total Records: {totalRecords}
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
                                <form className="forms row" onSubmit={handleSubmit}>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="hotelDropdown">Select Hotel  <span className="text-danger">*</span></label>
                                        <select
                                            className="form-control"
                                            id="hotelDropdown"
                                            value={selectedHotel}
                                            onChange={(e) => setSelectedHotel(e.target.value)}
                                            required
                                        >
                                            <option value="" disabled>Select Hotel</option>
                                            {hotelOptions.map((hotel, index) => (
                                                <option key={index} value={hotel}>
                                                    {hotel}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group col-md-12">
                                        <label htmlFor="similarHotelDropdown">Similar Hotel  <span className="text-danger">*</span></label>
                                        <select
                                            className="form-control"
                                            id="similarHotelDropdown"
                                            value={selectedSimilarHotel}
                                            onChange={(e) => setSelectedSimilarHotel(e.target.value)}
                                            required
                                        >
                                            <option value="" disabled>Select Hotel</option>
                                            {hotelOptions
                                                .filter(hotel => hotel !== selectedHotel)
                                                .map((hotel, index) => (
                                                    <option key={index} value={hotel}>
                                                        {hotel}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>

                                    <div className="form-group col-md-12 d-flex justify-content-end">
                                        <button
                                            type="button"
                                            className="btn btn-secondary me-2"
                                            onClick={resetForm}
                                        >
                                            Cancel
                                        </button>
                                        <button type="submit" className="btn btn-primary"  disabled={!isFormValid}>
                                            {editingHotel ? 'Update' : 'Save'}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
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
                                <p>Are you sure you want to {confirmDialog.newStatus ? 'activate' : 'deactivate'} <strong>{hotels.find(hotel => hotel.id === confirmDialog.roomId)?.name}</strong>?</p>
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
    );
};

export default Similarhotel;

