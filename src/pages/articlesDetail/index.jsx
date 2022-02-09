import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';
import articlesApi from './api/queries';
import './style.scss';

const ArticlesDetail = () => {
    document.title = "Nals - Articles list";
    const [data, setData] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const param = { id: id };
                const resp = await articlesApi.getDetail(param);
                setData(resp);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    console.log(id, data);

    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-md-9 col-xl-8 pl-md-5 bd-content">
                    <div className="container-main articles-detail mt-4 mb-4">
                        {
                            ReactHtmlParser(data.content)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArticlesDetail