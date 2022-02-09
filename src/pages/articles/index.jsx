import React from 'react';
import ArticlesList from './ArticlesList';

const Articles = () => {
    document.title = "Nals - Articles list";

    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-md-9 col-xl-8 pl-md-5 bd-content">
                    <ArticlesList />
                </div>
            </div>
        </div>
    )
}

export default Articles