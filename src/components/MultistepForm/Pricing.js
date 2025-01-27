import React, { useState } from "react"

const Pricing = () => {
    const [showModal, setShowModal] = useState(false)
    const [rows, setRows] = useState([{ id: Date.now() }]);
    const [showTaxModal, setShowTaxModal] = useState(false);
    const [hotelType, setHotelType] = useState("");
    const [taxName, setTaxName] = useState("");
    const [taxPercentage, setTaxPercentage] = useState("");
    const [hotelData, setHotelData] = useState([]);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const handleAddRow = () => {
        setRows([...rows, { id: Date.now() }]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedHotelData = rows.map((row, index) => {
            const rowInputs = document.querySelectorAll(`tr[data-row="${index}"] input[type="number"]`);
            const hotelTypeSelect = document.querySelector(`tr[data-row="${index}"] select`);

            return {
                hotelType: hotelTypeSelect.value,
                onePax: rowInputs[0].value,
                twoPax: rowInputs[1].value,
                fourPax: rowInputs[2].value,
                sixPax: rowInputs[3].value,
                eightPax: rowInputs[4].value,
                extraAdult: rowInputs[5].value,
                extraChild: rowInputs[6].value,
                extraInfant: rowInputs[7].value,
            };
        });

    const newHotelData = {
        fromDate: fromDate,
        toDate: toDate,
        hotelData: updatedHotelData
    };

    setHotelData([newHotelData]);


        setRows([{ id: Date.now() }]);
        setFromDate("");
        setToDate("");
        setShowModal(false);
    };
    const handleDeleteTable = () => {
        setHotelData([]);
    };
    const handleEditRow = (dateData) => {
        setFromDate(dateData.fromDate);
        setToDate(dateData.toDate);

        const existingRows = dateData.hotelData.map(entry => ({
            id: Date.now() + Math.random(),
            hotelType: entry.hotelType,
            onePax: entry.onePax,
            twoPax: entry.twoPax,
            fourPax: entry.fourPax,
            sixPax: entry.sixPax,
            eightPax: entry.eightPax,
            extraAdult: entry.extraAdult,
            extraChild: entry.extraChild,
            extraInfant: entry.extraInfant
        }));

        setRows(existingRows);

        setShowModal(true);

        setTimeout(() => {
            dateData.hotelData.forEach((entry, rowIndex) => {
                const hotelTypeSelect = document.querySelector(`tr[data-row="${rowIndex}"] select`);
                if (hotelTypeSelect) {
                    hotelTypeSelect.value = entry.hotelType;
                }

                const inputs = document.querySelectorAll(`tr[data-row="${rowIndex}"] input[type="number"]`);
                if (inputs && inputs.length >= 8) {
                    inputs[0].value = entry.onePax || '';
                    inputs[1].value = entry.twoPax || '';
                    inputs[2].value = entry.fourPax || '';
                    inputs[3].value = entry.sixPax || '';
                    inputs[4].value = entry.eightPax || '';
                    inputs[5].value = entry.extraAdult || '';
                    inputs[6].value = entry.extraChild || '';
                    inputs[7].value = entry.extraInfant || '';
                }
            });
        }, 100);
    };
    const handleRemoveRow = (id) => {
        setRows(rows.filter(row => row.id !== id));
    };

    const handleSaveTax = () => {

        console.log("Tax Name:", taxName, "Tax Percentage:", taxPercentage);
        setShowTaxModal(false);
        setTaxName("");
        setTaxPercentage("");
    };

    

    return (
        <div className="row">
            <div className="col-12  ">
                <div className="">
                    <div className="d-flex justify-content-between align-items-center">
                        <h6 className="">Package List</h6>
                    </div>
                    <div>
                        <h6>View Price</h6>
                    </div>



                </div>
            </div>
            <div className="form-group col-md-12 d-flex justify-content-end">
                <button type="button" className="btn btn-primary me-2" onClick={() => setShowModal(true)}>
                    +Add Price
                </button>

            </div>

            <form className="forms row">
                <div className="form-group col-md-12 position-relative">

                </div>

                <div className="form-group col-md-12">
                    <label>
                        Discount
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="discount"
                        placeholder="Enter Discount"
                    />
                </div>
                <div className="form-group position-relative" style={{ position: "relative" }}>
                    <label className="form-label">Currency </label>
                    <div style={{ position: "relative" }}>
                        <select className="form-select" style={{ paddingRight: "40px" }}>
                            <option value="">Select Currency</option>
                            <option value="indianrupee">Indian Rupee</option>
                            <option value="dollar">Dollar</option>
                            <option value="euro">Euro</option>
                            <option value="pound">Pound</option>
                            <option value="yen">Yen</option>
                            <option value="ruble">Ruble</option>
                            <option value="yuan">Yuan</option>
                            <option value="krona">Krona</option>
                            <option value="krone">Krone</option>
                            <option value="lira">Lira</option>
                            <option value="franc">Franc</option>

                        </select>

                    </div>
                </div>
                <div className="form-group position-relative" style={{ position: "relative" }}>
                    <label className="form-label" >Tax</label>
                    <div style={{ position: "relative" }}>
                        <select className="form-select" style={{ paddingRight: "40px" }}>
                            <option value="">Select Tax</option>
                        </select>
                        <button
                            type="button"
                            className="btn btn-success ms-2 position-absolute d-flex justify-content-center align-items-center"
                            style={{
                                top: "34%",
                                right: "0px",
                                width: "26px",
                                height: "25px",
                                transform: "translateY(-50%)",
                                zIndex: 999,
                            }}
                            onClick={() => setShowTaxModal(true)}
                        >
                            <i className="mdi mdi-plus"></i>
                        </button>
                    </div>
                </div>
                {hotelData.length > 0 && hotelData.map((dateGroup, groupIndex) => (
    <div key={groupIndex} className="table-responsive mb-4">
        <div className="d-flex justify-content-between align-items-center" style={{ backgroundColor: '#f0f0f0', padding: '10px' }}>
            <h5>
                {dateGroup.fromDate && dateGroup.toDate ? (
                    `${new Date(dateGroup.fromDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })} to ${new Date(dateGroup.toDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}`
                ) : (
                    "Date range not specified"
                )}
            </h5>
            <div>
                <button
                    type="button"
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => handleEditRow(dateGroup)}
                >
                    <i className="mdi mdi-pencil"></i>
                </button>
                <button className="btn btn-sm btn-danger" onClick={handleDeleteTable}>
                    <i className="mdi mdi-trash-can"></i>
                </button>
            </div>
        </div>
        <table className="table">
            <thead>
                <tr>
                    <th>Hotel Type</th>
                    <th>1Pax</th>
                    <th>2Pax</th>
                    <th>4Pax</th>
                    <th>6Pax</th>
                    <th>8Pax</th>
                    <th>Extra Adult</th>
                    <th>Extra Child</th>
                    <th>Extra Infant</th>
                </tr>
            </thead>
            <tbody>
                {dateGroup.hotelData.map((entry, index) => (
                    <tr key={index}>
                        <td>{entry.hotelType}</td>
                        <td>{entry.onePax}</td>
                        <td>{entry.twoPax}</td>
                        <td>{entry.fourPax}</td>
                        <td>{entry.sixPax}</td>
                        <td>{entry.eightPax}</td>
                        <td>{entry.extraAdult}</td>
                        <td>{entry.extraChild}</td>
                        <td>{entry.extraInfant}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
))}
            </form>
            {showModal && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                    <div className="modal-dialog" style={{ maxWidth: '80%' }} role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Price Management</h5>
                                <button type="button" className="close" onClick={() => setShowModal(false)} aria-label="Close">
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="row mb-4">
                                    <div className="col-md-6 mb-3 mb-md-0">
                                        <label className="form-label" htmlFor="fromDate" style={{ color: 'black' }}  >
                                            From
                                        </label>
                                        <input type="date" className="form-control" id="fromDate" placeholder="Select From Date" style={{ color: 'black' }} value={fromDate} 
                                            onChange={(e) => setFromDate(e.target.value)} />
                                        <p className="text-danger">Please enter a value for this field.</p>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label" htmlFor="toDate" style={{ color: 'black' }}
                                        >To</label>
                                        <input type="date" className="form-control" id="toDate" placeholder="Select To Date" style={{ color: 'black' }} value={toDate} 
                                            onChange={(e) => setToDate(e.target.value)} />
                                        <p className="text-danger">Please enter a value for this field.</p>
                                    </div>
                                </div>

                                <div className="table-responsive mb-4" style={{ maxHeight: '700px', overflowY: 'auto' }}>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Hotel Type</th>
                                                <th>1Pax</th>
                                                <th>2Pax</th>
                                                <th>4Pax</th>
                                                <th>6Pax</th>
                                                <th>8Pax</th>
                                                <th>Extra Adult</th>
                                                <th>Extra Child</th>
                                                <th>Extra Infant</th>
                                                <th>
                                                    <button className="btn btn-sm btn-success" onClick={handleAddRow}>+</button>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {rows.map((row, index) => (
                                                <tr key={row.id} data-row={index}>
                                                    <td>
                                                        <select
                                                            className="form-select"
                                                            defaultValue={row.hotelType || ""}
                                                            onChange={(e) => setHotelType(e.target.value)}
                                                        >
                                                            <option value="">Select Hotel Type</option>
                                                            <option value="5star">5 Star</option>
                                                            <option value="4star">4 Star</option>
                                                            <option value="3star">3 Star</option>
                                                            <option value="deluxe">Deluxe</option>
                                                            <option value="standard">Standard</option>
                                                        </select>
                                                    </td>
                                                    <td><input type="number" className="form-control form-control-sm" defaultValue={row.onePax} /></td>
                                                    <td><input type="number" className="form-control form-control-sm" defaultValue={row.twoPax} /></td>
                                                    <td><input type="number" className="form-control form-control-sm" defaultValue={row.fourPax} /></td>
                                                    <td><input type="number" className="form-control form-control-sm" defaultValue={row.sixPax} /></td>
                                                    <td><input type="number" className="form-control form-control-sm" defaultValue={row.eightPax} /></td>
                                                    <td><input type="number" className="form-control form-control-sm" defaultValue={row.extraAdult} /></td>
                                                    <td><input type="number" className="form-control form-control-sm" defaultValue={row.extraChild} /></td>
                                                    <td><input type="number" className="form-control form-control-sm" defaultValue={row.extraInfant} /></td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-danger"
                                                            onClick={() => handleRemoveRow(row.id)}
                                                        >
                                                            <i className="mdi mdi-trash-can"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleSubmit} disabled={!fromDate || !toDate} >Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showTaxModal && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Tax</h5>
                                <button type="button" className="close" onClick={() => setShowTaxModal(false)} aria-label="Close">
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="taxName">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="taxName"
                                        value={taxName}
                                        onChange={(e) => setTaxName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="taxPercentage">Percentage (%)</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="taxPercentage"
                                        value={taxPercentage}
                                        onChange={(e) => setTaxPercentage(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowTaxModal(false)}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleSaveTax}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}



        </div>


    )
}

export default Pricing;

