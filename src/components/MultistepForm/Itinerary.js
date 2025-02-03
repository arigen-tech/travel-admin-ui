import React, { useState, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";




const Itinerary = ({ cityList }) => {
    const [showForm, setShowForm] = useState(false);
    const editorRefs = useRef(cityList.map(item => Array.from({ length: item.days }, () => React.createRef())));


    const northgoa2Ref = useRef(null);
    const northgoaref = useRef(null);
    const pratapgarhRef = useRef(null);
    const pratapgarh2Ref = useRef(null);


    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        console.log({ event, editor, data });
    }
    return (
        <>
            
            <form className="forms row">
                {cityList.map((item, index) => (
                    Array.from({ length: item.days }).map((_, dayIndex) => (
                        
                        <div key={`${index}-${dayIndex}`} className="form-group row">
                            
                            <div className="form-group col-md-6">
                                <label>City: {item.city}, Day # {dayIndex + 1} Heading & Description
                                    <span className="text-danger">*</span></label>
                                <input
                                    type="text"
                                    className="form-control border border-danger"
                                    id={`name-${index}-${dayIndex}`}
                                    name={`name-${index}-${dayIndex}`}
                                    placeholder="Heading"
                                    required
                                    defaultValue={''}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor={`imagePicker-${index}-${dayIndex}`}> Image  <span className="text-danger ">*</span></label>
                                <input
                                    type="file"
                                    className="form-control border border-danger"
                                    id={`imagePicker-${index}-${dayIndex}`}
                                    accept="image/*"
                                    placeholder="No image chosen"
                                />
                            </div>

                            <div className="form-group col-md-12">
                                <label></label>
                                <div ref={editorRefs.current[index][dayIndex]}></div>
                                <CKEditor
                                    editor={DecoupledEditor}
                                    config={{
                                        toolbar: {
                                            shouldNotGroupWhenFull: true,
                                        },
                                    }}
                                    onReady={(editor) => {
                                        const toolbarContainer = editorRefs.current[index][dayIndex].current;
                                        toolbarContainer.innerHTML = "";
                                        toolbarContainer.appendChild(editor.ui.view.toolbar.element);
                                        editor.editing.view.change((writer) => {
                                            writer.setStyle("min-height", "100px", editor.editing.view.document.getRoot());
                                        });
                                    }}
                                    onChange={handleEditorChange}
                                />
                            </div>

                            <div className="form-group col-md-12 d-flex justify-content-end">
                               
                                <button
                                    type="button"
                                    className="btn btn-danger me-2"
                                >
                                    Add Hotel
                                </button>
                                <button
                                    className="btn btn-primary me-2">
                                    Add Transfer
                                </button>
                            </div>
                        </div>
                    ))
                ))}
            </form>
        </>
    )
};

export default Itinerary;