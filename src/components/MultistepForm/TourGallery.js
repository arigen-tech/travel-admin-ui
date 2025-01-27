import React, { useState } from 'react';

const TourGallery = () => {

    const [hotelRows, setHotelRows] = useState([]);
    const [rows, setRows] = useState([]);


    const addImageRow = (e) => {
        e.preventDefault();
        const newId = rows.length > 0 ? Math.max(...rows.map(r => r.id)) + 1 : 1
        setRows([...rows, { id: newId, name: '', alt: '', file: null }])
    }

    const removeImageRow = (id) => {
        setRows(rows.filter(row => row.id !== id))
    }



    return (
        <>
            <div className="container mt-4">
                <div className="row mb-3 align-items-center">
                    <div className="col">
                        <h4 className="mb-0">Select Image</h4>
                    </div>
                    <div className="col-auto">
                        <button onClick={addImageRow} className="btn btn-success">
                            <i className="bi bi-plus-lg me-1"></i> +
                        </button>
                    </div>
                </div>

                {rows.map((row, index) => (
                    <div key={row.id} className="row mb-3 pb-3 border-bottom position-relative">
                        <div className="form-group col-md-4">
                            <label>Image Name #{index + 1}</label>
                            <input
                                type="text"
                                className="form-control"
                                id={`imageName-${row.id}`} 
                                placeholder="Heading"
                                value={row.name}
                                onChange={(e) => {
                                    const updatedRows = [...rows];
                                    updatedRows[index].name = e.target.value; 
                                    setRows(updatedRows);
                                }}
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label>Alt Tag #{index + 1}</label>
                            <input
                                type="text"
                                className="form-control"
                                id={`altTag-${row.id}`} 
                                placeholder="Alt Tag"
                                value={row.alt} 
                                onChange={(e) => {
                                    const updatedRows = [...rows];
                                    updatedRows[index].alt = e.target.value; 
                                    setRows(updatedRows);
                                }}
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor={`imagePicker-${row.id}`}>Image File #{index + 1}</label>
                            <input
                                type="file"
                                className="form-control"
                                id={`imagePicker-${row.id}`} 
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    const updatedRows = [...rows];
                                    updatedRows[index].file = file; 
                                    setRows(updatedRows);
                                }}
                            />
                        </div>
                        {index > 0 && (
                            <button
                                onClick={() => removeImageRow(row.id)}
                                className="btn btn-danger btn-sm position-absolute top-0 end-0 mt-2 me-2"
                                style={{ width: '30px', height: '30px', padding: '0', borderRadius: '50%' }}
                            >
                                <i className="bi bi-cross">X</i>
                            </button>
                        )}
                    </div>
                ))}

            </div>
        </>

    );
}
export default TourGallery;