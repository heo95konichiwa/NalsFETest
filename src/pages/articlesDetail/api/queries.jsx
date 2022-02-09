import axiosClient from '../../../axiosClient';

class ArticlesApi {
    getDetail = (params) => {
        const url = `/blogs/${params.id}`;
        return axiosClient.get(url);
    };
}
const articlesApi = new ArticlesApi();
export default articlesApi;