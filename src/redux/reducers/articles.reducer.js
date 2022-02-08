const initialState = {
  articlesList: null,
  articlesInfo: { id: '', title: '', image: '', content: '', createdAt: '' },
  articlesError: null,
};

const articlesReducer = (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    // get list articles
    case "GET_DATA_LIST_SUCCESS": {
      return { ...state, articlesList: payload };
    }
    case "GET_DATA_LIST_FAILED": {
      return { ...state, articlesError: payload };
    }

    // get articles
    case "GET_DATA_SUCCESS": {
      return { ...state, articlesInfo: payload };
    }
    case "GET_DATA_FAILED": {
      return { ...state, articlesError: payload };
    }
    
    default:
      return state;
  }
};

export default articlesReducer;