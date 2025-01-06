import React, { useState } from "react";

const Rooms = () => {
    const [showForm, setShowForm] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 3;
    const totalProducts = 12;
    const [rows, setRows] = useState([{ id: 1 }])

    const addRow = () => {
        const newRow = {
            id: rows.length + 1
        }
        setRows([...rows, newRow])
    }

    const removeRow = (id) => {
        setRows(rows.filter(row => row.id !== id))
    }

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
                            <h4 className="card-title">Rooms</h4>
                            <div>
                                {!showForm ? (
                                    <>
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

                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>The Lalit Grand Palace Srinagar</td>
                                                    <td></td>


                                                    <td>
                                                        <button className="btn btn-sm btn-success me-2"><i className="mdi mdi-square-edit-outline"></i></button>
                                                        <button className="btn btn-sm btn-danger"><i className="mdi mdi-trash-can"></i></button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td>ibis Styles Goa Calangute Resort An AccorHotels B</td>
                                                    <td></td>

                                                    <td>
                                                        <button className="btn btn-sm btn-success me-2"><i className="mdi mdi-square-edit-outline"></i></button>
                                                        <button className="btn btn-sm btn-danger"><i className="mdi mdi-trash-can"></i></button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>3</td>
                                                    <td>	Treeya Lanta</td>
                                                    <td></td>

                                                    <td>
                                                        <button className="btn btn-sm btn-success me-2"><i className="mdi mdi-square-edit-outline"></i></button>
                                                        <button className="btn btn-sm btn-danger"><i className="mdi mdi-trash-can"></i></button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>4</td>
                                                    <td>The dream garden</td>
                                                    <td></td>

                                                    <td>
                                                        <button className="btn btn-sm btn-success me-2"><i className="mdi mdi-square-edit-outline"></i></button>
                                                        <button className="btn btn-sm btn-danger"><i className="mdi mdi-trash-can"></i></button>
                                                    </td>
                                                </tr> <tr>
                                                    <td>5</td>
                                                    <td>MOSH by the shore</td>
                                                    <td></td>

                                                    <td>
                                                        <button className="btn btn-sm btn-success me-2"><i className="mdi mdi-square-edit-outline"></i></button>
                                                        <button className="btn btn-sm btn-danger"><i className="mdi mdi-trash-can"></i></button>
                                                    </td>
                                                </tr> <tr>
                                                    <td>6</td>
                                                    <td>Hilton Bali Resort</td>
                                                    <td></td>

                                                    <td>
                                                        <button className="btn btn-sm btn-success me-2"><i className="mdi mdi-square-edit-outline"></i></button>
                                                        <button className="btn btn-sm btn-danger"><i className="mdi mdi-trash-can"></i></button>
                                                    </td>
                                                </tr> <tr>
                                                    <td>7</td>
                                                    <td>Radisson Blu</td>
                                                    <td></td>

                                                    <td>
                                                        <button className="btn btn-sm btn-success me-2"><i className="mdi mdi-square-edit-outline"></i></button>
                                                        <button className="btn btn-sm btn-danger"><i className="mdi mdi-trash-can"></i></button>
                                                    </td>
                                                </tr> <tr>
                                                    <td>8</td>
                                                    <td>Timhotel Tour Montparnasse</td>
                                                    <td></td>

                                                    <td>
                                                        <button className="btn btn-sm btn-success me-2"><i className="mdi mdi-square-edit-outline"></i></button>
                                                        <button className="btn btn-sm btn-danger"><i className="mdi mdi-trash-can"></i></button>
                                                    </td>
                                                </tr> <tr>
                                                    <td>9</td>
                                                    <td>Hotel Opera Lafayette</td>
                                                    <td></td>

                                                    <td>
                                                        <button className="btn btn-sm btn-success me-2"><i className="mdi mdi-square-edit-outline"></i></button>
                                                        <button className="btn btn-sm btn-danger"><i className="mdi mdi-trash-can"></i></button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>10</td>
                                                    <td>Casa De Goa - Boutique Resort - Calangute</td>
                                                    <td></td>

                                                    <td>
                                                        <button className="btn btn-sm btn-success me-2"><i className="mdi mdi-square-edit-outline"></i></button>
                                                        <button className="btn btn-sm btn-danger"><i className="mdi mdi-trash-can"></i></button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>11</td>
                                                    <td> Crystal Goa Turquoise Edition</td>
                                                    <td></td>

                                                    <td>
                                                        <button className="btn btn-sm btn-success me-2"><i className="mdi mdi-square-edit-outline"></i></button>
                                                        <button className="btn btn-sm btn-danger"><i className="mdi mdi-trash-can"></i></button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>12</td>
                                                    <td>Thomson House Stay at Calangute Goa</td>
                                                    <td></td>

                                                    <td>
                                                        <button className="btn btn-sm btn-success me-2"><i className="mdi mdi-square-edit-outline"></i></button>
                                                        <button className="btn btn-sm btn-danger"><i className="mdi mdi-trash-can"></i></button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>13</td>
                                                    <td>Taj Bekal Resort & Spa, Kerala</td>
                                                    <td></td>

                                                    <td>
                                                        <button className="btn btn-sm btn-success me-2"><i className="mdi mdi-square-edit-outline"></i></button>
                                                        <button className="btn btn-sm btn-danger"><i className="mdi mdi-trash-can"></i></button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>14</td>
                                                    <td>	Hotel Tide</td>
                                                    <td></td>

                                                    <td>
                                                        <button className="btn btn-sm btn-success me-2"><i className="mdi mdi-square-edit-outline"></i></button>
                                                        <button className="btn btn-sm btn-danger"><i className="mdi mdi-trash-can"></i></button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td >15</td>
                                                    <td> Coral Beach Resort</td>
                                                    <td></td>

                                                    <td>
                                                        <button className="btn btn-sm btn-success me-2"><i className="mdi mdi-square-edit-outline"></i></button>
                                                        <button className="btn btn-sm btn-danger"><i className="mdi mdi-trash-can"></i></button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>16</td>
                                                    <td>Heritage Resort</td>
                                                    <td></td>

                                                    <td>
                                                        <button className="btn btn-sm btn-success me-2"><i className="mdi mdi-square-edit-outline"></i></button>
                                                        <button className="btn btn-sm btn-danger"><i className="mdi mdi-trash-can"></i></button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>17</td>
                                                    <td>Coorg Wilderness Resort & Spa</td>
                                                    <td></td>

                                                    <td>
                                                        <button className="btn btn-sm btn-success me-2"><i className="mdi mdi-square-edit-outline"></i></button>
                                                        <button className="btn btn-sm btn-danger"><i className="mdi mdi-trash-can"></i></button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>18</td>
                                                    <td>Beach House Shore House Ocean Pearl or Similar</td>
                                                    <td></td>

                                                    <td>
                                                        <button className="btn btn-sm btn-success me-2"><i className="mdi mdi-square-edit-outline"></i></button>
                                                        <button className="btn btn-sm btn-danger"><i className="mdi mdi-trash-can"></i></button>
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
                                <>
                                    <form className="forms row">
                                        <div className="form-group col-md-4">
                                            <label htmlFor="imagePicker">Thumb Image</label>
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
                                            <label htmlFor="hotelDropdown">Select Hotel</label>
                                            <select
                                                className="form-control"
                                                id="hotelDropdown"
                                                onChange={(e) => console.log(e.target.value)} // Replace with actual handler
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
                                            <label htmlFor="currencyDropdown">Select Currency</label>
                                            <select
                                                className="form-control"
                                                id="currencyDropdown"
                                                onChange={(e) => console.log(e.target.value)} // Replace with actual handler
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
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="star"
                                                placeholder="Enter the description here"
                                            />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label>Inclusion</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="star"
                                                placeholder="Enter the Inclusion here"
                                            />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label>Exclusion</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="star"
                                                placeholder="Enter the Exclusion here"
                                            />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label>Terms & condition</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="star"
                                                placeholder="Enter the Terms & condition here"
                                            />
                                        </div>



                                    </form>
                                    {/* <div className="table-responsive w-100">
                                        <table className="table table-bordered align-middle">
                                            <thead className="bg-light">
                                                <tr>
                                                    <th className="px-4 py-2">S.No.</th>
                                                    <th className="px-4 py-2">Room Type</th>
                                                    <th className="px-4 py-2">From Date</th>
                                                    <th className="px-4 py-2">To Date</th>
                                                    <th className="px-4 py-2">Meal</th>
                                                    <th className="px-4 py-2">Bed</th>
                                                    <th className="px-4 py-2">RoomSize</th>
                                                    <th className="px-4 py-2">Room Img</th>
                                                    <th className="px-4 py-2">Base Price</th>
                                                    <th className="px-4 py-2">Per Adult Extra Price</th>
                                                    <th className="px-4 py-2">Per Child Extra N.B. Price</th>
                                                    <th className="px-4 py-2">Per Child Extra W.B. Price</th>
                                                    <th className="px-4 py-2">Age</th>
                                                    <th className="px-4 py-2">Weekend Price</th>
                                                    <th className="px-4 py-2">M.O.F Child Allowed</th>
                                                    <th className="px-4 py-2">B.O.F Adults Allowed</th>
                                                    <th className="px-4 py-2">B.O.F</th>
                                                    <th className="px-4 py-2">
                                                        <button className="btn btn-primary btn-sm">+</button>
                                                    </th>
                                                    

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {rows.map((row) => (
                                                    <tr key={row.id}>
                                                        <td className="px-4 py-2">{row.id}</td>
                                                        <td className="px-4 py-2">
                                                            <select className="form-select">
                                                                <option value="">Select Room Type</option>
                                                                <option value="standard">Standard</option>
                                                                <option value="deluxe">Deluxe</option>
                                                                <option value="suite">Suite</option>
                                                            </select>
                                                        </td>
                                                        <td className="px-4 py-2">
                                                            <input type="date" className="form-control" />
                                                        </td>
                                                        <td className="px-4 py-2">
                                                            <input type="date" className="form-control" />
                                                        </td>
                                                        <td className="px-4 py-2">
                                                            <select className="form-select">
                                                                <option value="">Select Meal</option>
                                                                <option value="breakfast">Breakfast</option>
                                                                <option value="half-board">Half Board</option>
                                                                <option value="full-board">Full Board</option>
                                                            </select>
                                                        </td>
                                                        <td className="px-4 py-2">
                                                            <select className="form-select">
                                                                <option value="">Select Bed</option>
                                                                <option value="single">Single</option>
                                                                <option value="double">Double</option>
                                                                <option value="king">King</option>
                                                            </select>
                                                        </td>
                                                        <td className="px-4 py-2">
                                                            <input type="text" className="form-control" placeholder="Size" />
                                                        </td>
                                                        <td className="px-4 py-2">
                                                            <input type="file" className="form-control" accept="image/*" />
                                                        </td>
                                                        <td className="px-4 py-2">
                                                            <input type="number" className="form-control" placeholder="Price" />
                                                        </td>
                                                       
                                                        <td className="px-4 py-2">
                                                            <input type="number" className="form-control" placeholder="Adult Price" />
                                                        </td>
                                                        <td className="px-4 py-2">
                                                            <input type="number" className="form-control" placeholder="Child N.B. Price" />
                                                        </td>
                                                        <td className="px-4 py-2">
                                                            <input type="number" className="form-control" placeholder="Child W.B. Price" />
                                                        </td>
                                                        <td className="px-4 py-2">
                                                            <input type="number" className="form-control" placeholder="Age" />
                                                        </td>
                                                        <td className="px-4 py-2">
                                                            <input type="number" className="form-control" placeholder="Weekend Price" />
                                                        </td>
                                                        <td className="px-4 py-2">
                                                            <input type="number" className="form-control" placeholder="MOF Child" />
                                                        </td>
                                                        <td className="px-4 py-2">
                                                            <input type="number" className="form-control" placeholder="BOF Adults" />
                                                        </td>
                                                        <td className="px-4 py-2">
                                                            <input type="text" className="form-control" placeholder="BOF" />
                                                        </td>
                                                       
                                                        <td className="px-4 py-2">
                                                            <button
                                                                className="btn btn-danger btn-sm"
                                                                onClick={() => removeRow(row.id)}
                                                            >
                                                                ×
                                                            </button>
                                                        </td>
                                                    </tr>


                                                ))}
                                            </tbody>
                                        </table>
                                    </div> */}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Rooms;
