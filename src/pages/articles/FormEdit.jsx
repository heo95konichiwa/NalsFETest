import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import articlesApi from './api/queries';

const FormEdit = (props) => {
    const { id, setDt } = props;

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [toastShow, setToastShow] = useState("");

    const schema = object().shape({
        title: string().required("Title is a required field")
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
        setValue
    } = useForm({
        resolver: yupResolver(schema),
        resolvers: yupResolver(schema),
    });

    const onSubmit = async (_data) => {
        setLoading(true);
        await articlesApi.putData(_data)
            .then((reps) => {
                setToastShow("fade show");
            })
            .catch((error) => {
                console.log(error);
            }).finally(() => {
                setLoading(false);
                setTimeout(() => {
                    setToastShow("");
                }, 1800);
            });

        const resp = await articlesApi.getList({ page: 1, limit: 10 });
        setDt(resp);
    };

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                setLoading(true);
                try {
                    const param = { id: parseInt(id) };
                    const resp = await articlesApi.getDetail(param);
                    setData(resp);
                    register("id");
                    register("image");
                    setValue("id", resp?.id);
                    setValue("title", resp?.title);
                    setValue("image", resp?.image);
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, setDt, setData]);

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
                    You have successfully updated the data
                </div>
            </div>
            <div className="modal fade" id="modalEdit" tabIndex={-1} aria-labelledby="modalEditLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className={`spinner ${loading ? `active` : ``}`}>
                            <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalEditLabel">Edit article</h5>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="needs-validation" noValidate>
                            <div className="modal-body">
                                <div className="form-group mb-3">
                                    <label htmlFor="title">Title <span className="form-required">*</span></label>
                                    <input id="title" {...register("title")} className={`form-control ${errors?.title?.message ? `is-invalid` : ``}`} name="title" type="text" placeholder="Title articles" defaultValue={data?.title} />
                                    <div className="invalid-feedback">{errors?.title?.message}</div>
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="Image">Image <span className="form-required">*</span></label>
                                    <input id="image" className="form-control form-control-file" name="image" type="file" accept="image/*" onChange={handleChangeImage} />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="content">Content</label>
                                    <CKEditor id="content" editor={ClassicEditor}
                                        data={data?.content}
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
                                <input className="btn btn-primary" type="submit" id="submit" value="Update" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FormEdit