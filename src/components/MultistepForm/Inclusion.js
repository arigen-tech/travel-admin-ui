import React, { useState, useRef } from 'react';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";


const Inclusion = () => {


  const [expanded, setExpanded] = useState({});
  const insertRef = useRef(null);
  const secondRef = useRef(null);
  const toggleExpand = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    console.log({ event, editor, data });

  };


  return (
    <>
      <div className="container mt-4">
        <div className="row mb-3 align-items-center">
          <div className="col">
            <h4 className="mb-2">INCLUSION</h4>
            <h6>Display the inclusion icon based on your selection</h6>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="d-flex align-items-center gap-2 p-3 border rounded">
                <div className="form-check mb-0">
                  <input type="checkbox" className="form-check-input" id="breakfast" />
                  <label className="form-check-label" htmlFor="breakfast">
                    Breakfast
                  </label>
                </div>
                <a href="#" className="ms-auto text-primary text-decoration-none small" onClick={() => toggleExpand('breakfast')}>
                  {expanded['breakfast'] ? 'Read Less' : 'Read More'}
                </a>
              </div>
            </div>

            <div className="col-md-4">
              <div className="d-flex align-items-center gap-2 p-3 border rounded">
                <div className="form-check mb-0">
                  <input type="checkbox" className="form-check-input" id="transfer" />
                  <label className="form-check-label" htmlFor="transfer">
                    Inter-city transfer
                  </label>
                </div>
                <a href="#" className="ms-auto text-primary text-decoration-none small" onClick={() => toggleExpand('transfer')}>
                  {expanded['transfer'] ? 'Read Less' : 'Read More'}
                </a>
              </div>
            </div>

            <div className="col-md-4">
              <div className="d-flex align-items-center gap-2 p-3 border rounded">
                <div className="form-check mb-0">
                  <input type="checkbox" className="form-check-input" id="sightseeing" />
                  <label className="form-check-label" htmlFor="sightseeing">
                    Sightseeing
                  </label>
                </div>
                <a href="#" className="ms-auto text-primary text-decoration-none small" onClick={() => toggleExpand('sightseeing')}>
                  {expanded['sightseeing'] ? 'Read Less' : 'Read More'}
                </a>
              </div>
            </div>

            <div className="col-md-4">
              <div className="d-flex align-items-center gap-2 p-3 border rounded">
                <div className="form-check mb-0">
                  <input type="checkbox" className="form-check-input" id="services" />
                  <label className="form-check-label" htmlFor="services">
                    Services
                  </label>
                </div>
                <a href="#" className="ms-auto text-primary text-decoration-none small" onClick={() => toggleExpand('services')}>
                  {expanded['services'] ? 'Read Less' : 'Read More'}
                </a>
              </div>
            </div>

            <div className="col-md-4">
              <div className="d-flex align-items-center gap-2 p-3 border rounded">
                <div className="form-check mb-0">
                  <input type="checkbox" className="form-check-input" id="testagain" />
                  <label className="form-check-label" htmlFor="testagain">
                    test again
                  </label>
                </div>
                <a href="#" className="ms-auto text-primary text-decoration-none small" onClick={() => toggleExpand('testagain')}>
                  {expanded['testagain'] ? 'Read Less' : 'Read More'}
                </a>
              </div>
            </div>

            <div className="col-md-4">
              <div className="d-flex align-items-center gap-2 p-3 border rounded">
                <div className="form-check mb-0">
                  <input type="checkbox" className="form-check-input" id="testnew" />
                  <label className="form-check-label" htmlFor="testnew">
                    test new
                  </label>
                </div>
                <a href="#" className="ms-auto text-primary text-decoration-none small" onClick={() => toggleExpand('testnew')}>
                  {expanded['testnew'] ? 'Read Less' : 'Read More'}
                </a>
              </div>
            </div>

            <h6>Display the Inclusion Text based on your selection (choose only one).</h6>
            <div className="form-group col-md-12 ">
              <div ref={insertRef}></div>
              <CKEditor
                editor={DecoupledEditor}
                config={{
                  toolbar: {
                    shouldNotGroupWhenFull: true,
                  },
                  alignment: {
                    options: ["left", "center", "right", "justify"],
                  },
                  table: {
                    contentToolbar: [
                      "tableColumn",
                      "tableRow",
                      "mergeTableCells",
                      "tableProperties",
                      "tableCellProperties",
                    ],
                  },

                }}
                onReady={(editor) => {
                  const toolbarContainer = insertRef.current;
                  toolbarContainer.innerHTML = "";
                  toolbarContainer.appendChild(editor.ui.view.toolbar.element);
                  editor.editing.view.change((writer) => {
                    writer.setStyle("min-height", "100px", editor.editing.view.document.getRoot());
                  });
                }}
                onChange={handleEditorChange}
              />

            </div>

          </div>
        </div>
        <div className="row mb-3 align-items-center">
          <div className="col">
            <h4 className="mb-2">Exclusion</h4>
            <h6>Display the Inclusion Text based on your selection (choose only one).</h6>
          </div>

          <div className="row">
           <div className="col-md-4">
              <div className="d-flex align-items-center gap-2 p-3 border rounded">
                <div className="form-check mb-0">
                  <input type="checkbox" className="form-check-input" id="testnew" />
                  <label className="form-check-label" htmlFor="Insurance">
                    Insurance
                  </label>
                </div>
                <a href="#" className="ms-auto text-primary text-decoration-none small" onClick={() => toggleExpand('insurance')}>
                  {expanded['insurance'] ? 'Read Less' : 'Read More'}
                </a>
              </div>
            </div>
          </div>

          <div className="form-group col-md-12 mt-4">
            <div ref={secondRef}></div>
            <CKEditor
              editor={DecoupledEditor}
              config={{
                toolbar: {
                  shouldNotGroupWhenFull: true,
                },
                alignment: {
                  options: ["left", "center", "right", "justify"],
                },
                table: {
                  contentToolbar: [
                    "tableColumn",
                    "tableRow",
                    "mergeTableCells",
                    "tableProperties",
                    "tableCellProperties",
                  ],
                },

              }}
              onReady={(editor) => {
                const toolbarContainer = secondRef.current;
                toolbarContainer.innerHTML = "";
                toolbarContainer.appendChild(editor.ui.view.toolbar.element);
                editor.editing.view.change((writer) => {
                  writer.setStyle("min-height", "100px", editor.editing.view.document.getRoot());
                });
              }}
              onChange={handleEditorChange}
            />

          </div>

        </div>
      </div>

    </>
  )
};

export default Inclusion;