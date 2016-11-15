const selectAPI = () => (state) => state.getIn(['app', 'API']).toJS();
const selectLocationBeforeSignIn = () => (state) => {
  if (state.getIn(['app', 'auth', 'locationBeforeSignIn'])) {
    return state.getIn(['app', 'auth', 'locationBeforeSignIn', 'pathName']);
  }
  return null;
};

export default selectAPI;
export {
  selectLocationBeforeSignIn,
  selectAPI,
};
