import React, { useState } from "react";

const Similarhotel = () => {
    const [showForm, setShowForm] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 2;
    const totalProducts = 0;

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
            <div className="row">
                <div className="col-12 grid-margin stretch-card">
                    <div className="card form-card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h4 className="card-title">Similar Hotel </h4>
                            <div>
                                {!showForm ? (
                                    <>
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
                                                    <th>SNo.</th>
                                                    <th>Name</th>
                                                    <th>Similar Hotels</th>
                                                    <th>Status</th>
                                                    <th>Action</th>

                                                </tr>
                                            </thead>

                                                <tbody>
                                                <tr>
                                                    <td colSpan="5" className="text-center">
                                                        No Data Available
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <nav className="d-flex justify-content-between align-items-center mt-3">
                                        <div>
                                            <span>
                                                Page {currentPage} of {totalPages} | Total Products: {totalProducts}
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
                                <form className="forms row">
                                <div className="form-group col-md-12">
                                            <label htmlFor="hotelDropdown">Select Hotel</label>
                                            <select
                                                className="form-control"
                                                id="hotelDropdown"
                                                onChange={(e) => console.log(e.target.value)} 
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
                                        <div className="form-group col-md-12">
                                            <label htmlFor="hotelDropdown">Similar Hotel</label>
                                            <select
                                                className="form-control"
                                                id="hotelDropdown"
                                                onChange={(e) => console.log(e.target.value)} 
                                            >
                                                <option value="" disabled selected>
                                                    Similar Hotel
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

                                <div className="form-group col-md-12 d-flex justify-content-end">
                                    <button type="submit" className="btn btn-primary me-2">
                                        Save
                                    </button>
                                   
                                </div>
                            </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Similarhotel;


