// selectLocationState expects a plain JS object for the routing state
const selectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

const selectAuthDomain = () => state => state.getIn(['app', 'auth']).toJS();
const selectAPI = () => state => state.getIn(['app', 'API', 'url']);

const selectDocumentsPageLoading = () => state => state.getIn(['eventsPage', 'loading']);
const selectEventsPageLoading = () => state => state.getIn(['documentsPage', 'loading']);
const selectProfilesPageLoading = () => state => state.getIn(['profilesPage', 'loading']);
const selectTimelinePageLoading = () => state => state.getIn(['timelinePage', 'loading']);
const selectSignInPageLoading = () => state => state.getIn(['signInPage', 'loading']);

const selectAppError = () => state => state.getIn(['app', 'error']);

export default selectLocationState;
export {
  selectLocationState,
  selectAuthDomain,
  selectAPI,
  selectDocumentsPageLoading,
  selectEventsPageLoading,
  selectProfilesPageLoading,
  selectTimelinePageLoading,
  selectSignInPageLoading,
  selectAppError,
};
