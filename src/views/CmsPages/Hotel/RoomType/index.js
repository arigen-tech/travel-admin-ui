import React, { useState } from "react";
import Popup from "../../../../components/popup";

const RoomType = () => {
    const [showForm, setShowForm] = useState(false);
    const [popupMessage, setPopupMessage] = useState(null);
    const recordsPerPage = 5;

    const [currentPage, setCurrentPage] = useState(1);

    const [roomTypes, setRoomTypes] = useState([
        { id: 1, name: 'Standard', isActive: true },
        { id: 2, name: 'Deluxe', isActive: false },
        { id: 3, name: 'Luxury', isActive: true }
    ]);
    const [editingRoom, setEditingRoom] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, roomId: null, newStatus: false });
    const [nameInput, setNameInput] = useState(editingRoom?.name || '');


    const filteredRoomTypes = roomTypes.filter(room =>
        room.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const totalRecords = filteredRoomTypes.length; 
    const totalPages = Math.ceil(totalRecords / recordsPerPage);

    const handleNameChange = (e) => {
        setNameInput(e.target.value);
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const showPopup = (message, type = 'info') => {
        setPopupMessage({
            message,
            type,
            onClose: () => {
                setPopupMessage(null);
            }
        });
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleEdit = (room) => {
        setShowForm(true);
        setEditingRoom(room);
        setNameInput(room.name);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

   
    

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newName = formData.get('name');

        if (editingRoom) {
            setRoomTypes(prevRoomTypes => prevRoomTypes.map(roomType =>
                roomType.id === editingRoom.id ? { ...roomType, name: newName } : roomType
            ));
            showPopup('Room type updated successfully!', "success");
        } else {
            setRoomTypes(prevRoomTypes => [...prevRoomTypes, {
                id: prevRoomTypes.length + 1,
                name: newName,
                isActive: true
            }]);
            showPopup('Room type added successfully!', "success");
        }

        setShowForm(false);
        setEditingRoom(null);
    };

    const handleStatusToggle = (id, newStatus) => {
        const room = roomTypes.find(room => room.id === id);
        setConfirmDialog({
            isOpen: true,
            roomId: id,
            newStatus: newStatus
        });
    };

    const handleConfirm = (confirmed) => {
        if (confirmed) {
            setRoomTypes(prevRoomTypes =>
                prevRoomTypes.map(room =>
                    room.id === confirmDialog.roomId ? { ...room, isActive: confirmDialog.newStatus } : room
                )
            );
        }
        setConfirmDialog({ isOpen: false, roomId: null, newStatus: false });
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
                            <h4 className="card-title">Room Type</h4>
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
                                                    <th>Edit</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                {filteredRoomTypes.map((room, index) => ( // Use filteredRoomTypes here
                                    <tr key={room.id}>
                                        <td>{index + 1}</td>
                                        <td>{room.name}</td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-success me-2"
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
                                                    onChange={() => handleStatusToggle(room.id, !room.isActive)}
                                                />
                                                <label className="form-check-label px-0">
                                                    {room.isActive ? 'Active' : 'Deactive'}
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
                                        <label>Name(max-50) <span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            name="name"
                                            placeholder="Room type"
                                            required
                                            defaultValue={editingRoom?.name || ''}
                                            value={nameInput}
                                            onChange={handleNameChange}
                                        />
                                    </div>

                                    <div className="form-group col-md-12 d-flex justify-content-end">
                                        <button type="submit" className="btn btn-primary me-2" disabled={!nameInput.trim()}>

                                            {editingRoom ? 'Update' : 'Submit'}

                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={() => {
                                                setShowForm(false);
                                                setEditingRoom(null);
                                            }}
                                        >
                                            Cancel
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
                                <p>Are you sure you want to {confirmDialog.newStatus ? 'activate' : 'deactivate'} <strong>{roomTypes.find(room => room.id === confirmDialog.roomId)?.name}</strong>?</p>
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

export default RoomType;

