import React, { useState } from "react";

const RoomType = () => {
    const [showForm, setShowForm] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 3;
    const totalRecords = 12;
    const [roomTypes, setRoomTypes] = useState([
        { id: 1, name: 'Standard', isActive: true },
        { id: 2, name: 'Deluxe', isActive: false },
        { id: 3, name: 'Luxury', isActive: true }
    ]);
    const [editingRoom, setEditingRoom] = useState(null);
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, roomId: null, newStatus: false });

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

    const handleEdit = (room) => {
        setEditingRoom(room);
        setShowForm(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newName = formData.get('name');

        if (editingRoom) {
            setRoomTypes(roomTypes.map(roomTypes =>
                roomTypes.id === editingRoom.id ? { ...roomTypes, name: newName } : roomTypes
            ));
            alert('Room type updated successfully!');
        } else {
            setRoomTypes([...roomTypes, {
                id: roomTypes.length + 1,
                name: newName
            }]);
            alert('Room type added successfully!');
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
            <div className="row">
                <div className="col-12 grid-margin stretch-card">
                    <div className="card form-card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h4 className="card-title">Room Type</h4>
                            <div>
                                {!showForm ? (
                                    <>
                                        <form class="d-inline-block serachform" role="search">
                                            <div class="input-group searchinput">
                                                <input
                                                    type="search"
                                                    class="form-control"
                                                    placeholder="Search"
                                                    aria-label="Search"
                                                    aria-describedby="search-icon"
                                                />
                                                <span class="input-group-text" id="search-icon">
                                                    <i class="mdi mdi-magnify"></i>
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
                                                    <th> Name</th>
                                                    <th>Edit</th>
                                                    <th>Status</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {roomTypes.map((room, index) => (
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
                                        <label>Name(max-50)</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            name="name"
                                            placeholder="Room type"
                                            defaultValue={editingRoom?.name || ''}
                                        />
                                    </div>

                                    <div className="form-group col-md-12 d-flex justify-content-end">
                                        <button type="submit" className="btn btn-primary me-2">
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
                                <p>Are you sure you want to {confirmDialog.newStatus ? 'activate' : 'deactivate'} <strong>{roomTypes.find( room => room.id === confirmDialog.roomId)?.name}</strong>?</p>
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

