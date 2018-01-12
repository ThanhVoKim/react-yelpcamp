const filter = {
  search: ''
};

export default (state = filter, action) => {
  switch (action.type) {
    case 'FILTER_SEARCH':
      return { ...state, search: action.search };
    default:
      return state;
  }
};