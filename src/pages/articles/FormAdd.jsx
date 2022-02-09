import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useForm } from "react-hook-form";
import { object, string, mixed } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import articlesApi from './api/queries';

const FormAdd = () => {
    const [loading, setLoading] = useState(false);
    const [toastShow, setToastShow] = useState("");


    const schema = object().shape({
        title: string().required("Title is a required field"),
        image: mixed().test("required", "Image is a required field", (value) => {
            if (value?.length) return true;
            return false;
        }),
    });

    const handleChangeImage = (event) => {
        const files = event.target.files;
        const file = files[0];
        const reader = new FileReader();
        register("image");
        reader.readAsDataURL(file);
        reader.onload = () => {
            const fileInfo = {
                name: file.name,
                type: file.type,
                size: Math.round(file.size / 1000) + ' kB',
                base64: reader.result,
                file: file,
            };
            setValue("image", fileInfo?.base64);
        }
    }

    const handleChangeContent = (event) => {
        const { value } = event.target;
        register("content");
        setValue("content", value);
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: yupResolver(schema),
        resolvers: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        setLoading(true);
        await articlesApi.postData(data)
            .then(() => {
                setToastShow("fade show");
            })
            .catch((error) => {
                console.log(error);
            }).finally(() => {
                setLoading(false);
                setTimeout(() => {
                    setToastShow("");
                }, 1500);
            });
    };

    return (
        <>
            <div className={`toast ${toastShow}`}>
                <div className="toast-header success">
                    <span className="mr-auto">Success</span>
                    <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                        <span aria-hidden="true"><i className="toast-close icon icon-close"></i></span>
                    </button>
                </div>
                <div className="toast-body">
                    You have successfully saved the data
                </div>
            </div>
            <div className="modal fade" id="modalAdd" tabIndex={-1} aria-labelledby="modalAddLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className={`spinner ${loading ? `active` : ``}`}>
                            <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalAddLabel">Add article</h5>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="needs-validation" noValidate>
                            <div className="modal-body">
                                <div className="form-group mb-3">
                                    <label htmlFor="title">Title</label>
                                    <input id="title" {...register("title")} className={`form-control ${errors?.title?.message ? `is-invalid` : ``}`} name="title" type="text" placeholder="Title articles" />
                                    <div className="invalid-feedback">{errors?.title?.message}</div>
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="Image">Image</label>
                                    <input id="image" className={`form-control form-control-file ${errors?.image?.message ? `is-invalid` : ``}`} name="image" type="file" accept="image/*" onChange={handleChangeImage} />
                                    {/* <FileBase64 id="image" className={`form-control form-control-file ${errors?.image?.message ? `is-invalid` : ``}`} name="image" accept="image/*" onDone={() => getFiles.bind(this)} /> */}
                                    <div className="invalid-feedback">{errors?.image?.message}</div>
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="content">Content</label>
                                    <CKEditor id="content" editor={ClassicEditor}
                                        onChange={(_, editor) => {
                                            let data = editor.getData();
                                            const e = { target: { name: "content", value: data } }
                                            handleChangeContent(e)
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" type="button" data-dismiss="modal">Close</button>
                                <input className="btn btn-primary" type="submit" id="submit" value="Save" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FormAdd