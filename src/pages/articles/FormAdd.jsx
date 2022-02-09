import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const FormAdd = () => {

    const handleChange = (event) => {

    }
    return (
        <div className="modal fade" id="modalAdd" tabIndex={-1} aria-labelledby="modalAddLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="modalAddLabel">Add articles</h5>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="title">Title articles</label>
                                <input id="title" className="form-control" type="text" placeholder="Title articles" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Image">Image articles</label>
                                <input id="Image" className="form-control form-control-file" type="file" accept="image/*" placeholder="Image articles" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="content">Content</label>
                                <CKEditor editor={ClassicEditor}
                                    onChange={(_, editor) => {
                                        let data = editor.getData();
                                        const e = { target: { name: 'content', value: data } }
                                        handleChange(e)
                                    }}
                                />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" type="button" data-dismiss="modal">Close</button>
                        <button className="btn btn-primary" type="button">Save</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default FormAdd