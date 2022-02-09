import axiosClient from '../../../axiosClient';

class ArticlesApi {
    getList = (params) => {
        const url = '/blogs';
        return axiosClient.get(url, { params });
    };
    
    getDetail = (params) => {
        const url = `/blogs/${params.id}`;
        return axiosClient.get(url);
    };

    postData = (params) => {
        const url = '/blogs';
        return axiosClient.post(url, params)
    };

    putData = (params) => {
        const url = `/blogs/${params.id}`;
        return axiosClient.put(url, params)
    };
}

const articlesApi = new ArticlesApi();

export default articlesApi;