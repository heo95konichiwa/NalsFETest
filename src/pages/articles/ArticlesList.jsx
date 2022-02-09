import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import articlesApi from './api/queries';
import NoImage from '../../assets/images/no-image.png';
import './style.scss';
import FormAdd from './FormAdd';

const ArticlesList = () => {
    const [data, setData] = useState([]);
    const [params, setParams] = useState({ page: 1, limit: 10, sortBy: 'createdAt', order: 'desc', search: '', filter: '', title: '' });
    const [pagination, setPagination] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (event) => {
        const { value } = event.target;
        setParams({ page: 1, limit: 10, sortBy: 'createdAt', order: 'desc', search: value, filter: value, title: value });
        setLoading(true);
        try {
            let arr = [];
            const resp = await articlesApi.getList(params);

            for (let i = 0; i < parseInt(resp.length / 10); i++) {
                arr.push(i + 1);
            }

            setData(resp);
            setPagination(arr);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSort = async (event) => {
        const { value } = event.target;
        setParams({ page: 1, limit: 10, sortBy: 'createdAt', order: value });
        setLoading(true);
        try {
            const resp = await articlesApi.getList(params);
            setData(resp);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleChangePage = async (value) => {
        setParams({ page: value, limit: 10, sortBy: 'createdAt', order: 'desc' });
        setLoading(true);
        try {
            const resp = await articlesApi.getList(params);
            setData(resp);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (params.page === 1) {
            const fetchData = async () => {
                setLoading(true);
                try {
                    const resp = await articlesApi.getList(params);
                    setData(resp);
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }

        const renderPagination = async () => {
            const resp = await articlesApi.getList();
            let arr = [];
            for (let i = 0; i < parseInt(resp.length / 10); i++) {
                arr.push(i + 1);
            }
            setPagination(arr);
        };
        renderPagination();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="articles">
            <div className={`spinner ${loading ? `active` : ``}`}>
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
            <div className="container-main mt-4 mb-4">
                <div className="d-flex justify-content-end">
                    <button type="button" className="btn btn-primary d-flex align-items-center" data-toggle="modal" data-target="#modalAdd">Add article<i className="icon icon-add"></i></button>
                </div>
            </div>
            <div className="container-main mb-4">
                <form className="mb-3">
                    <div className="form-row justify-content-between">
                        <div className="form-group col-md-6">
                            <input className="form-control" type="search" placeholder="Input search text" onChange={handleSearch} />
                        </div>
                        <div className="form-group col-md-2">
                            <select className="form-control" onChange={handleSort}>
                                <option value="desc">Oldest posting date</option>
                                <option value="asc">Last posted date</option>
                            </select>
                        </div>
                    </div>
                </form>
                <ul className="list-unstyled">
                    {
                        data.length ? data.map((item, i) => (
                            <li key={i} className="mb-4 media articles-item">
                                <div className="mr-3 articles-img">
                                    <img className="articles-src" src={item.image} onError={({ currentTarget }) => {
                                        currentTarget.onerror = null; // prevents looping
                                        currentTarget.src = NoImage;
                                    }} alt={item.title} />
                                </div>
                                <div className="media-body articles-content d-flex justify-content-between">
                                    <NavLink exact="true" to={`/articles-detail/${item.id}`}>
                                        <h5 className="mt-0 mb-1">{item.title}</h5>
                                    </NavLink>
                                    <i className="articles-icon icon icon-edit"></i>
                                </div>
                            </li>
                        )) : <></>
                    }
                </ul>
                {
                    pagination.length ? <nav aria-label="...">
                        <ul className="pagination justify-content-center">
                            <li className={`page-item ${params?.page === 1 ? `disabled` : ``}`}><span className="page-link" onClick={() => handleChangePage(params?.page - 1)}>Previous</span></li>
                            {
                                pagination.map((item, i) => (
                                    <li key={i} className={`page-item ${params?.page === item ? `active` : ``}`}><span className="page-link" onClick={() => handleChangePage(item)}>{item}</span></li>
                                ))
                            }
                            <li className={`page-item ${params?.page === pagination.length ? `disabled` : ``}`}><span className="page-link" onClick={() => handleChangePage(params?.page + 1)}>Next</span></li>
                        </ul>
                    </nav> : <></>
                }
            </div>
            <FormAdd />
        </div>
    )
}

export default ArticlesList