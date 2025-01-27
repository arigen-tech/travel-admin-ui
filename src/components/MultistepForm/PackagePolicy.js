import React, { useState, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';




const PackagePolicy = () => {
    const [modalContent, setModalContent] = useState("")
    const [showModal, setShowModal] = useState(false)

    const handleShow = (content) => {
        setModalContent(content)
        setShowModal(true)
    }

    const handleClose = () => setShowModal(false)

    


    const [rows, setRows] = useState([{ id: Date.now(), question: '', answer: '' }]);
    const editorRefs = useRef([]);

    const addFaqRow = () => {
        setRows([...rows, { id: Date.now(), question: '', answer: '' }]);
    };

    const removeFaqRow = (id) => {
        setRows(rows.filter(row => row.id !== id));
    };

    const handleEditorChange = (index, event, editor) => {
        const data = editor.getData();
        const updatedRows = [...rows];
        updatedRows[index].answer = data;
        setRows(updatedRows);
    };

    return (
        <>
            <div className="container py-4">
                <div className="row">
                    <div className="col-12">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title mb-4">Policy</h5>

                                <div className="row g-4">
                                    {/* First Row */}
                                    <div className="col-12 col-md-4">
                                        <div className="form-check d-flex align-items-center justify-content-spacebetween">
                                            <div>
                                                <input className="form-check-input" type="checkbox" id="terms" />
                                                <label className="form-check-label me-2" htmlFor="terms">
                                                    Terms & Conditions
                                                </label>
                                            </div>
                                            <button
                                                className="btn btn-link py-0 me-2"
                                                aria-label="View Terms"
                                                onClick={() => handleShow(
                                                    `<ol>
                                                        <li>
                                                            <p style="color: black;"><strong>Refund Policy:</strong></p>
                                                            <ul>
                                                                <li style="color: black;">The applicable refund amount will be processed within 10 business days.</li>
                                                                <li style="color: black;">All applicable refunds will be done in the traveler's Thrillophilia wallet as Thrillcash.</li>
                                                                <li style="color: black;">100.0% of total tour cost will have to be paid 0 days before the date of booking.</li>
                                                            </ul>
                                                        </li>
                                                    </ol>`
                                                )}
                                            >
                                                <i className="mdi mdi-information "></i>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="col-12 col-md-4">
                                        <div className="form-check d-flex align-items-center justify-content-spacebetween">
                                            <div>
                                                <input className="form-check-input" type="checkbox" id="package" />
                                                <label className="form-check-label me-2" htmlFor="package">
                                                    Package Policy
                                                </label>
                                            </div>
                                            <button className="btn btn-link py-0 me-2" aria-label="View Terms" onClick={() => handleShow(
                                                `<ol>
                                                    <li>
                                                        <p style="color: black;"><strong>Refund Policy:</strong></p>
                                                        <ul>
                                                            <li style="color: black;">The applicable refund amount will be processed within 10 business days.</li>
                                                            <li style="color: black;">All applicable refunds will be done in the traveler's Thrillophilia wallet as Thrillcash.</li>
                                                            <li style="color: black;">100.0% of total tour cost will have to be paid 0 days before the date of booking.</li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <p style="color: black;"><strong>Cancellation Policy:</strong></p>
                                                        <ul>
                                                            <li style="color: black;">If cancellation is made 30 days before the date of travel, then 25.0% of total tour cost will be charged as cancellation fees.</li>
                                                            <li style="color: black;">If cancellation is made 15 days to 30 days before the date of travel, then 50.0% of total tour cost will be charged as cancellation fees.</li>
                                                            <li style="color: black;">If cancellation is made 0 days to 15 days before the date of travel, then 100.0% of total tour cost will be charged as cancellation fees.</li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <p style="color: black;"><strong>Amendment Policy:</strong></p>
                                                        <ul>
                                                            <li style="color: black;">Describe the policy for making changes to the booking after it has been confirmed. This could include changes to travel dates, accommodations, or other components of the package.</li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <p style="color: black;"><strong>Travel Insurance:</strong></p>
                                                        <ul>
                                                            <li style="color: black;">Recommend or require that customers purchase travel insurance to cover unforeseen circumstances such as trip cancellations, medical emergencies, or lost baggage.</li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <p style="color: black;"><strong>Responsibilities of the Traveler:</strong></p>
                                                        <ul>
                                                            <li style="color: black;">Clearly outline the responsibilities of the traveler, such as ensuring they have the necessary travel documents (passport, visa, etc.), complying with local laws and customs, and behaving responsibly during the trip.</li>
                                                        </ul>
                                                    </li>
                                                </ol>`
                                            )}>
                                                <i className="mdi mdi-information"></i>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="col-12 col-md-4">
                                        <div className="form-check d-flex align-items-center justify-content-spacebetween">
                                            <div>
                                                <input className="form-check-input" type="checkbox" id="cancellation" />
                                                <label className="form-check-label me-2" htmlFor="cancellation">
                                                    Cancellation Policy
                                                </label>
                                            </div>
                                            <button
                                                className="btn btn-link py-0 me-2"
                                                aria-label="View Cancellation Policy"
                                                onClick={() => handleShow(
                                                    `<ol>
                                                        <li>
                                                            <p style="color: black;"><strong>Cancellation Fees:</strong></p>
                                                            <ul>
                                                                <li style="color: black;">If cancellation is made 30 days before the date of travel, then 25.0% of total tour cost will be charged as cancellation fees.</li>
                                                                <li style="color: black;">If cancellation is made 15 days to 30 days before the date of travel, then 50.0% of total tour cost will be charged as cancellation fees.</li>
                                                                <li style="color: black;">If cancellation is made 0 days to 15 days before the date of travel, then 100.0% of total tour cost will be charged as cancellation fees.</li>
                                                            </ul>
                                                        </li>
                                                    </ol>`
                                                )}
                                            >
                                                <i className="mdi mdi-information"></i>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Second Row */}
                                    <div className="col-12 col-md-4">
                                        <div className="form-check d-flex align-items-center justify-content-spacebetween">
                                            <div>
                                                <input className="form-check-input" type="checkbox" id="inclusion" />
                                                <label className="form-check-label me-2" htmlFor="inclusion">
                                                    Inclusion
                                                </label>
                                            </div>
                                            <button
                                                className="btn btn-link py-0 me-2"
                                                aria-label="View Inclusion"
                                                onClick={() => handleShow(
                                                    `<ol>
                                                        <li>
                                                            <p style="color: black;"><strong>Transportation:</strong></p>
                                                            <ul>
                                                                <li style="color: black;">Round-trip airfare or transportation to and from the destination.</li>
                                                                <li style="color: black;">Airport transfers to and from the hotel.</li>
                                                                <li style="color: black;">Transport for sightseeing tours, excursions, and transfers between cities.</li>
                                                            </ul>
                                                        </li>
                                                        <li>
                                                            <p style="color: black;"><strong>Accommodation:</strong></p>
                                                            <ul>
                                                                <li style="color: black;">Accommodation in well-reviewed hotels or resorts.</li>
                                                                <li style="color: black;">Breakfast included (some packages may include other meals).</li>
                                                                <li style="color: black;">Ensuring accommodations are centrally located for easy access to attractions and amenities.</li>
                                                            </ul>
                                                        </li>
                                                        <li>
                                                            <p style="color: black;"><strong>Sightseeing and Activities:</strong></p>
                                                            <ul>
                                                                <li style="color: black;">Guided tours of key attractions with knowledgeable local guides.</li>
                                                                <li style="color: black;">Entrance fees to museums, historical sites, and other attractions.</li>
                                                                <li style="color: black;">Optional activities or excursions (e.g., snorkeling, hiking, cultural experiences).</li>
                                                            </ul>
                                                        </li>
                                                        <li>
                                                            <p style="color: black;"><strong>Meals:</strong></p>
                                                            <ul>
                                                                <li style="color: black;">Some meals may be included, typically breakfast. However, depending on the package, additional meals may also be included (lunches, dinners).</li>
                                                                <li style="color: black;">Dietary preferences and restrictions should be accommodated wherever possible.</li>
                                                            </ul>
                                                        </li>
                                                    </ol>`
                                                )}
                                            >
                                                <i className="mdi mdi-information"></i>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="col-12 col-md-4">
                                        <div className="form-check d-flex align-items-center justify-content-spacebetween">
                                            <div>
                                                <input className="form-check-input" type="checkbox" id="exclusion" />
                                                <label className="form-check-label me-2" htmlFor="exclusion">
                                                    Exclusion
                                                </label>
                                            </div>
                                            <button
                                                className="btn btn-link py-0 me-2"
                                                aria-label="View exclusion"
                                                onClick={() => handleShow(
                                                    `<ol>
                                                        <li>
                                                            <p style="color: black;"><strong>Exclusions:</strong></p>
                                                            <ul>
                                                                <li style="color: black;">Airfare to and from the destination.</li>
                                                                <li style="color: black;">Visa fees and travel insurance.</li>
                                                                <li style="color: black;">Meals not specified in the itinerary.</li>
                                                                <li style="color: black;">Personal expenses such as laundry, phone calls, and tips.</li>
                                                                <li style="color: black;">Optional tours or activities not mentioned in the itinerary.</li>
                                                                <li style="color: black;">Excess baggage charges.</li>
                                                                <li style="color: black;">Any additional expenses incurred due to delays, strikes, natural disasters, or other unforeseen circumstances.</li>
                                                                <li style="color: black;">Medical expenses and medication.</li>
                                                                <li style="color: black;">Alcoholic beverages.</li>
                                                                <li style="color: black;">Any items not specifically mentioned as included in the tour package.</li>
                                                            </ul>
                                                        </li>
                                                    </ol>`
                                                )}
                                            >
                                                <i className="mdi mdi-information"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className={`modal ${showModal ? "show" : ""}`}
                                    style={{ display: showModal ? "block" : "none" }}
                                    tabIndex="-1"
                                    role="dialog"
                                >
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title">Details</h5>
                                                <button type="button" className="close" onClick={handleClose}>
                                                    <span>&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body" dangerouslySetInnerHTML={{ __html: modalContent }}></div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" onClick={handleClose}>
                                                    Close
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="container mt-4">
                                <div className="row mb-3 align-items-center">
                                    <div className="col">
                                        <h4 className="mb-0">FAQ</h4>
                                    </div>
                                    <div className="col-auto">
                                        <button onClick={addFaqRow} className="btn btn-success">
                                            <i className="bi bi-plus-lg me-1"></i> +
                                        </button>
                                    </div>
                                </div>

                                {rows.map((row, index) => (
                                    <div key={row.id} className="row mb-3 pb-3 border-bottom position-relative">
                                        <div className="form-group col-md-6">
                                            <label htmlFor={`question-${index}`}>Question #{index + 1}</label>
                                            <textarea
                                                type="text"
                                                className="form-control"
                                                id={`question-${index}`}
                                                placeholder=""
                                                rows="4"
                                                style={{ height: '180px' }}
                                                value={row.question}
                                                onChange={(e) => {
                                                    const updatedRows = [...rows];
                                                    updatedRows[index].question = e.target.value;
                                                    setRows(updatedRows);
                                                }}
                                            />
                                        </div>

                                        <div className="form-group col-md-6">
                                            <label htmlFor={`answer-${index}`}>Answer</label>
                                            <div ref={(el) => (editorRefs.current[index] = el)}></div>
                                            <CKEditor
                                                editor={DecoupledEditor}
                                                config={{
                                                    toolbar: {
                                                        shouldNotGroupWhenFull: true,
                                                    },
                                                }}
                                                onReady={(editor) => {
                                                    const toolbarContainer = editorRefs.current[index];
                                                    toolbarContainer.innerHTML = "";
                                                    toolbarContainer.appendChild(editor.ui.view.toolbar.element);
                                                    editor.editing.view.change((writer) => {
                                                        writer.setStyle("min-height", "100px", editor.editing.view.document.getRoot());
                                                    });
                                                }}
                                                onChange={(event, editor) => handleEditorChange(index, event, editor)}
                                            />
                                        </div>

                                        {index > 0 && (
                                            <button
                                                onClick={() => removeFaqRow(row.id)}
                                                className="btn btn-danger btn-sm position-absolute top-0 end-0 mt-2 me-2"
                                                style={{ width: '30px', height: '30px', padding: '0', borderRadius: '50%' }}
                                            >
                                                <i className="bi bi-x"></i>X
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PackagePolicy

