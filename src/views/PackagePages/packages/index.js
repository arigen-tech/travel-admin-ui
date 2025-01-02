import React, { useState } from "react";
import "./package.css";
import MultiStep from 'react-multistep';
import Overview from '../../../components/MultistepForm/Overview';
import Itinerary from '../../../components/MultistepForm/Itinerary';
import TourGallery from '../../../components/MultistepForm/TourGallery';
import PackagePolicy from '../../../components/MultistepForm/PackagePolicy';
import Inclusion from '../../../components/MultistepForm/Inclusion';
import Pricing from '../../../components/MultistepForm/Pricing';

const Package = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [showMultiStep, setShowMultiStep] = useState(false);
    const totalPages = 3;
    const totalProducts = 12;

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
                            <h4 className="card-title">Add New Package</h4>
                            <div>
                                {!showMultiStep ? (
                                    <>
                                        <button
                                            type="button"
                                            className="btn btn-success me-2"
                                            onClick={() => setShowMultiStep(true)} // Show MultiStep form
                                        >
                                            <i className="mdi mdi-plus"></i> Create
                                        </button>
                                        <button type="button" className="btn btn-warning me-2">
                                            <i className="mdi mdi-restore"></i> Recover
                                        </button>
                                        <button type="button" className="btn btn-info">
                                            <i className="mdi mdi-filter"></i> Filter
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => setShowMultiStep(false)} // Hide MultiStep form
                                    >
                                        <i className="mdi mdi-arrow-left"></i> Back
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="card-body multistep">
                            {!showMultiStep ? (
                                <>
                                <div className="table-responsive packagelist">
                                    <table className="table table-bordered table-hover align-middle">
                                        <thead className="table-light">
                                            <tr>
                                                <th>S.No.</th>
                                                <th>Package Code</th>
                                                <th>Name</th>
                                                <th>Days/Nights</th>
                                                <th>Valid From</th>
                                                <th>Valid To</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>BR000104</td>
                                            <td>Ladakh</td>
                                            <td>7 Days, 6 Nights</td>
                                            <td>26-Dec-2024</td>
                                            <td>31-Dec-2024</td>
                                            <td>
                                                <button className="btn btn-sm btn-outline-secondary">...</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>BR000103</td>
                                            <td>
                                                qwer <i className="bi bi-eye" />
                                            </td>
                                            <td>5 Days, 4 Nights</td>
                                            <td>23-Sep-2024</td>
                                            <td>31-Dec-2024</td>
                                            <td>
                                                <button className="btn btn-sm btn-outline-secondary">...</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>BR000103</td>
                                            <td>
                                                qwer <i className="bi bi-eye" />
                                            </td>
                                            <td>5 Days, 4 Nights</td>
                                            <td>23-Sep-2024</td>
                                            <td>31-Dec-2024</td>
                                            <td>
                                                <button className="btn btn-sm btn-outline-secondary">...</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td>BR000103</td>
                                            <td>
                                                qwer <i className="bi bi-eye" />
                                            </td>
                                            <td>5 Days, 4 Nights</td>
                                            <td>23-Sep-2024</td>
                                            <td>31-Dec-2024</td>
                                            <td>
                                                <button className="btn btn-sm btn-outline-secondary">...</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>5</td>
                                            <td>BR000103</td>
                                            <td>
                                                qwer <i className="bi bi-eye" />
                                            </td>
                                            <td>5 Days, 4 Nights</td>
                                            <td>23-Sep-2024</td>
                                            <td>31-Dec-2024</td>
                                            <td>
                                                <button className="btn btn-sm btn-outline-secondary">...</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>6</td>
                                            <td>BR000103</td>
                                            <td>
                                                qwer <i className="bi bi-eye" />
                                            </td>
                                            <td>5 Days, 4 Nights</td>
                                            <td>23-Sep-2024</td>
                                            <td>31-Dec-2024</td>
                                            <td>
                                                <button className="btn btn-sm btn-outline-secondary">...</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>7</td>
                                            <td>BR000103</td>
                                            <td>
                                                qwer <i className="bi bi-eye" />
                                            </td>
                                            <td>5 Days, 4 Nights</td>
                                            <td>23-Sep-2024</td>
                                            <td>31-Dec-2024</td>
                                            <td>
                                                <button className="btn btn-sm btn-outline-secondary">...</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>8</td>
                                            <td>BR000103</td>
                                            <td>
                                                qwer <i className="bi bi-eye" />
                                            </td>
                                            <td>5 Days, 4 Nights</td>
                                            <td>23-Sep-2024</td>
                                            <td>31-Dec-2024</td>
                                            <td>
                                                <button className="btn btn-sm btn-outline-secondary">...</button>
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
                                <MultiStep
                                    title="Order Workflow"
                                    className="multistepform"
                                    activeStep={0}
                                    prevButton={{ title: <><i className="mdi mdi-arrow-left"></i> Back</> }}
                                    nextButton={{ title: <>Save & Continue <i className="mdi mdi-arrow-right"></i></> }}
                                >
                                    <Overview title='Overview' />
                                    <Itinerary title='Itinerary' />
                                    <TourGallery title='TourGallery' />
                                    <PackagePolicy title='PackagePolicy' />
                                    <Inclusion title='Inclusion' />
                                    <Pricing title='Pricing' />
                                </MultiStep>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Package;
