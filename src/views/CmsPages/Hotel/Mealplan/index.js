import React, { useState, useEffect } from "react";
import Popup from "../../../../components/popup";

const initialMealPlans = [
  { id: 1, name: "CP", isActive: true },
  { id: 2, name: "MAP", isActive: false },
];

const Mealplan = () => {
  const [showForm, setShowForm] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [mealPlans, setMealPlans] = useState(initialMealPlans);
  const [popupMessage, setPopupMessage] = useState(null);
  const [editingMealPlan, setEditingMealPlan] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, mealPlanId: null, newStatus: false });
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMealPlans, setFilteredMealPlans] = useState([]);

  const totalPages = 1;
  const totalRecords = mealPlans.length;
  const resultsPerPage = 10;

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredMealPlans(mealPlans);
    } else {
      const filtered = mealPlans.filter(plan => 
        plan.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMealPlans(filtered);
    }
  }, [searchTerm, mealPlans]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
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

  const handleSwitchChange = (id, newStatus) => {
    setConfirmDialog({ isOpen: true, mealPlanId: id, newStatus });
  };

  const handleConfirm = (confirmed) => {
    if (confirmed) {
      setMealPlans(mealPlans.map(plan => 
        plan.id === confirmDialog.mealPlanId ? { ...plan, isActive: confirmDialog.newStatus } : plan
      ));
    }
    setConfirmDialog({ isOpen: false, mealPlanId: null, newStatus: false });
  };

  const handleEdit = (mealPlan) => {
    setEditingMealPlan(mealPlan);
    setShowForm(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    const updatedName = e.target.elements.mealName.value;
    const updatedIcon = e.target.elements.icon.files[0];

    if (editingMealPlan) {
        // Editing existing meal plan
        setMealPlans(mealPlans.map(plan => 
            plan.id === editingMealPlan.id ? { ...plan, name: updatedName } : plan
        ));
    } else {
        // Adding new meal plan
        const newMealPlan = {
            id: mealPlans.length + 1, // or generate a unique ID
            name: updatedName,
            isActive: true
        };
        setMealPlans([...mealPlans, newMealPlan]);
    }

    setEditingMealPlan(null);
    setShowForm(false);
    showPopup("Changes saved successfully!", "success");
  };

  const handleCancel = () => {
    setEditingMealPlan(null);
    setShowForm(false);
  };

  return (
    <div className="content-wrapper">
      <div className="row">
        <div className="col-12 grid-margin stretch-card">
          <div className="card form-card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="card-title">Meal Plan</h4>
              <div>
                {!showForm ? (
                  <>
                    <form className="d-inline-block serachform" role="search">
                      <div className="input-group searchinput">
                        <input
                          type="search"
                          className="form-control"
                          placeholder="Search meal plans..."
                          aria-label="Search"
                          aria-describedby="search-icon"
                          value={searchTerm}
                          onChange={handleSearch}
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
                    onClick={handleCancel}
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
                        {filteredMealPlans.length > 0 ? (
                          filteredMealPlans.map((plan, index) => (
                            <tr key={plan.id}>
                              <td>{index + 1}</td>
                              <td>{plan.name}</td>
                              <td>
                                <button 
                                  className="btn btn-sm btn-success me-2"
                                  onClick={() => handleEdit(plan)}
                                  disabled={!plan.isActive}
                                >
                                  <i className="mdi mdi-square-edit-outline"></i>
                                </button>
                              </td>
                              <td>
                                <div className="form-check form-switch">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={plan.isActive}
                                    onChange={() => handleSwitchChange(plan.id, !plan.isActive)}
                                  />
                                  <label className="form-check-label px-0">
                                    {plan.isActive ? 'Active' : 'Deactivated'}
                                  </label>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="4" className="text-center">
                              {searchTerm ? "No matching meal plans found." : "No meal plans available."}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <nav className="d-flex justify-content-between align-items-center mt-3">
                    <div>
                      <span>
                        Page {currentPage} of {Math.ceil(filteredMealPlans.length / resultsPerPage)} | 
                        Total Records: {filteredMealPlans.length}
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
                <form className="forms row" onSubmit={handleSave}>
                  <div className="form-group col-md-6">
                    <label htmlFor="icon">Icon</label>
                    <input
                      type="file"
                      className="form-control"
                      id="icon"
                      name="icon"
                      accept="image/*"
                      placeholder="No image chosen"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Meal Name <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      id="mealName"
                      name="mealName"
                      placeholder="Name"
                      defaultValue={editingMealPlan ? editingMealPlan.name : ""}
                      required
                      onChange={(e) => setIsFormValid(e.target.value.trim() !== '')}
                    />
                  </div>
                  <div className="form-group col-md-12 d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary me-2" disabled={!isFormValid}>
                      Save
                    </button>
                    <button type="button" className="btn btn-danger" onClick={handleCancel}>
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      {popupMessage && (
        <Popup
          message={popupMessage.message}
          type={popupMessage.type}
          onClose={popupMessage.onClose}
        />
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
                <p>Are you sure you want to {confirmDialog.newStatus ? 'activate' : 'deactivate'} <strong>{mealPlans.find(plan => plan.id === confirmDialog.mealPlanId)?.name}</strong>?</p>
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

export default Mealplan;

