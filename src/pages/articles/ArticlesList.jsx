import React, { useEffect, useState } from 'react';
import articlesApi from './api/queries';
import NoImage from '../../assets/images/no-image.png';
import './style.scss';

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
            const listDataPagination = await articlesApi.getList(params);

            for (let i = 0; i < parseInt(listDataPagination.length / 10); i++) {
                arr.push(i + 1);
            }

            setData(listDataPagination);
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
            const listDataPagination = await articlesApi.getList(params);
            setData(listDataPagination);
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
            const listDataPagination = await articlesApi.getList(params);
            setData(listDataPagination);
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
                    const listDataPagination = await articlesApi.getList(params);
                    setData(listDataPagination);
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }

        const renderPagination = async () => {
            const listData = await articlesApi.getList();
            let arr = [];
            for (let i = 0; i < parseInt(listData.length / 10); i++) {
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
            <form className="mb-3">
                <div class="form-row justify-content-between">
                    <div className="form-group col-md-6">
                        <input className="form-control" type="search" placeholder="Input search text" onChange={handleSearch} />
                    </div>
                    <div class="form-group col-md-2">
                        <select class="form-control" placeholder="Sort by" onChange={handleSort}>
                            <option value="asc">Asc</option>
                            <option value="desc">Desc</option>
                        </select>
                    </div>
                </div>
            </form>
            <ul className="list-unstyled">
                {
                    data.length ? data.map((item, i) => (
                        <li key={i} className="mb-4 media">
                            <div className="mr-3 articles-img">
                                <img className="articles-src" src={item.image} onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src = NoImage;
                                }} alt={item.title} />
                            </div>
                            <div className="media-body">
                                <h5 className="mt-0 mb-1">{item.title}</h5>
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
    )
}

export default ArticlesList