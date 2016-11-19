const selectAuthDomain = () => state => state.getIn(['app', 'auth']).toJS();
const selectCurrentPathname = () => (state) => state.getIn(['route', 'locationBeforeTransitions', 'pathname']);

export default selectAuthDomain;
export {
  selectAuthDomain,
  selectCurrentPathname,
};
