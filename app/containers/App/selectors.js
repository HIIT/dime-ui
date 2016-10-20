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

const selectDocumentsPageLoading = () => state => state.getIn(['eventsPage', 'loading']);

const selectEventsPageLoading = () => state => state.getIn(['documentsPage', 'loading']);

const selectProfilesPageLoading = () => state => state.getIn(['profilesPage', 'loading']);

const selectTimelinePageLoading = () => state => state.getIn(['timelinePage', 'loading']);

const selectDocumentsPageError = () => state => {
  try {
    return state.getIn(['eventsPage', 'error']).toJS();
  } catch (e) {
    return undefined;
  }
};
const selectEventsPageError = () => state => {
  try {
    return state.getIn(['documentsPage', 'error']).toJS();
  } catch (e) {
    return undefined;
  }
};
const selectProfilesPageError = () => state => {
  try {
    return state.getIn(['profilesPage', 'error']).toJS();
  } catch (e) {
    return undefined;
  }
};

const selectTimelinePageError = () => state => {
  try {
    return state.getIn(['timelinePage', 'error']).toJS();
  } catch (e) {
    return undefined;
  }
};

export default selectLocationState;
export {
  selectLocationState,
  selectAuthDomain,
  selectDocumentsPageLoading,
  selectEventsPageLoading,
  selectProfilesPageLoading,
  selectTimelinePageLoading,
  selectDocumentsPageError,
  selectEventsPageError,
  selectProfilesPageError,
  selectTimelinePageError,
};
