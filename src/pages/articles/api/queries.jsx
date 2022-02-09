import axiosClient from '../../../axiosClient';

class ArticlesApi {
    getList = (params) => {
        const url = '/blogs';
        return axiosClient.get(url, { params });
    };
}
const articlesApi = new ArticlesApi();
export default articlesApi;