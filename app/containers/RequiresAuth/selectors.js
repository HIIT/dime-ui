const selectAuthDomain = () => state => state.getIn(['app', 'auth']).toJS();

export default selectAuthDomain;
export {
  selectAuthDomain,
};
