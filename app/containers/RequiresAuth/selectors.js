const selectAuthDomain = () => state => state.getIn(['app', 'auth']);

export default selectAuthDomain;
export {
  selectAuthDomain,
};
