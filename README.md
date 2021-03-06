# dime-ui

React-based user interface for [dime-server](https://github.com/HIIT/dime-server)

# Prerequisites
1. install node.js <https://nodejs.org/en/>, this will also install the NPM package manager.
2. ``npm install`` to fetch NPM dependencies.
4. ``npm start`` and open <http://localhost:3000> in your browser.
5. Happy coding.

# Development

The architecture of dime-ui is based on a boilerplate [react-boilerplate](https://github.com/mxstbr/react-boilerplate). The introduction of [react-boilerplate](https://github.com/mxstbr/react-boilerplate/tree/master/docs/general) is a good read if you don't have previous knowledge on ReactJS + Redux project.

There are many well-written articles on ReactJS and Redux. I will focus on explaining how to create an new React component ``<VersionNumber />`` in our UI. 

As its name suggested, ``<VersionNumber />`` is a HTML text node (``<span>v1.2</span>``) showing the version number of dime-server. ``<VersionNumber />`` is composed by a pair of HTML tags (``<span></span>``) and the text(a string `v1.2`) showing the respond Data by an API call to dime-server. 

This is a common pattern for any UI component in our dime-ui project. The visible UI element represents an application state. The application needs to know where and how to get data(often done by an API call) to mutate the application state. This scenario should apply to any further UI developments in our project.

init a component -> compoent call API -> use respond data to mutates application state -> visible UI changes accoriding to the (mutated) application state 

## Create a React Component (see source code in [this commit](https://github.com/HIIT/dime-ui/commit/404aa7bc486e3bd031facf555816543ad371f090))
1. Go to the root of the project, type ``npm run generate`` and:
	1. Select ``component`` in the terminal.
  2. Select ``ES6 Class``.
	3. Name the component ``VersionNumer``.
	4. 'Does it have stying?' -> ``Y``.
	5. 'Do you want i18n messages?' ``N``. (no need)

	This will run the scripts that generate a React component. The new component will appear in ``./app/components/VersionNumber``. In this folder, there should have two files ``index.js``, ``style.css`` and a ``tests`` sub-folder.
2. Now we have the ``<VersionNumer />`` component but we want to put it in the ``<NavBar />``, a horizontal navigation bar place on the top of the page. Go to ``./app/components/VersionNumber`` and edit the ``index.js``.
3. Please add ``import VersionNumber from 'components/VersionNumber';`` at the beginning of the file and add ``<VersionNumber value={this.props.value} />`` in the ``render()`` method of ``NavBar`` component.
4. Edit ``app/containers/App/index.js``, add ``value={this.props.value}`` on ``<NavBar />`` in the ``render()`` method.
5. To play safe, we should remind [React to do type-checking](https://facebook.github.io/react/docs/typechecking-with-proptypes.html) by ``value: React.PropTypes.number`` in both two components and the ``App`` container.
6. Go back to ``VersionNumber`` component and replace the ``render()`` with following code:
```
<div className={styles.value}>
  <span>{this.props.value}</span>
</div>
```
Note there is a ``{this.props.value}`` in the ``<span>`` tag. If you are familiar with [JSX syntax](https://facebook.github.io/react/docs/jsx-in-depth.html) , you will know the ``{this.props.value}`` should render the value of ``this.props.value``.

Now, we have a component ``<VersionNumber />`` and it has been included in anther upper-level component ``<NavBar />``. The ``<App />`` container then includes ``<NavBar />``. The  value of version will be passed (as `props`) from ``<App />`` to ``<NavBar />`` and then to ``<VersionNumber />``. 

You may wonder what is the [difference between components and containers](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.muim22gny).

## Connect React-Redux (see source code in [this commit](https://github.com/HIIT/dime-ui/commit/404aa7bc486e3bd031facf555816543ad371f090))
1. The next thing we will do is to 'connect' the application state in Redux store and pass it to the PropTypes of ``<App />`` container. By doing so, when the state in Redux store has been changed, the 'connection' will pass the new value to PropTypes and, the UI will then changes accordingly.
2. Go to ``app/containers/App/index.js``, at the end of file, you will see a constant ``mapStateToProps``, add an new line ``versionNumber: selectVersionNumber()``. The ``selectVersionNumber()`` is a 'selector' function of Redux state wrapped by [a selector library for Redux](https://github.com/reactjs/reselect). Basically, the 'selector' will substrate the data you want from Redux store. We have to create a new selector for current state-binding.
3. Go to ``app/containers/App/select.js`` and add ``const selectVersionNumber = () => state => state.getIn(['app', 'versionNumber']).toJS();``. Don't forget to export the selector and add it back to ``app/containers/App/index.js``.
4. Let's review the (unidirectional) data flow of our React application. It seems that the value of version number is stored in Redux. We create a selector to get a sub-state ``app > versionNumber`` from the redux store. The sub-state then connect/bind to the PropTypes of ``<App />``. The PropTypes then will be pass from from ``<App />`` container to ``<NavBar />`` component and then to ``<VersionNumber />`` compoment.

## Design UI Business Logic (see source code in [this commit](https://github.com/HIIT/dime-ui/commit/acb7a0b7cec94c75a7145a66354fdef1b202fa95))
1. The next thing we want to do is to modify the state that is stored as ``app > versionNumber``. In [Redux architecture](http://redux.js.org/docs/basics/DataFlow.html), we need to dispatch an 'action' describing what happened and create a reducer function computing the 'next' state. However, in real-world application, the business logic of UI is complicated. In our case, the logic is
  1. Fire a HTTP GET request.
  2. Receive responded data, check if there is error, handle the error.
  3. If no error, dispatch an Redux action.
  4. Reducer function received the action, compute the 'next' Redux state.
  5. Redux State change initials the UI change in step 11.
There are many discussions on [how to manage business logic](http://survivejs.com/blog/redux-saga-interview/) in React-Redux application. We choose [redux-saga](https://github.com/redux-saga/redux-saga).
2. In our application, the way we get the version number is done by an API call (in this case is a GET HTTP request) to dime-server's endpoint [
'/api/ping'](http://www.hiit.fi/g/reknow/apidoc/dime-server/#api-Status-Ping]). The question is when should we fire the HTTP GET request? From our understanding of React Component Life-cycle, the GET should be called immediately before compoment mounting occurs. That is, the [``compomentWillMount()``](https://facebook.github.io/react/docs/react-component.html#componentwillmount).
3. In order to do so, we design a Redux action ``getVersionNumber()`` in ``app/containers/App/actions.js`` with an action-type called ``GET_VERSION_NUMBER``. Import the action in ``app/containers/App/index.js``, bind the action with the help of ``mapDispatchToProps()`` and pass the action via PropTypes from ``<App />`` container to ``<NavBar />`` compoment and then to ``<VersionNumber />`` compoment. (Don't forget to add type checking of ``this.props.getVersionNumber`` in components.)
4. The ``getVersionNumber()`` will fire right before the mounting of ``<VersionNumber />``. To actually call the GET request, we add a new saga function ``getVersionNumberWatcher()`` in ``app/containers/App/sagas.js``. Note that the sagas are written as ES6 generator (Here is [the redux-saga tutorial](https://redux-saga.github.io/redux-saga/docs/introduction/BeginnerTutorial.html))
5. The business logic in our saga tells redux-saga to call ``getVersionNumberSuccess()`` if no there is no error. The ``getVersionNumberSuccess()`` is a Redux action that will dispatch an object with a type ``GET_VERSION_NUMBER_SUCCESS`` and the value of version number.
6. It is time to write the reducer for version number, add a new case in ``app/containers/App/reducer.js`` with the following code:
```
case GET_VERSION_NUMBER_SUCCESS:
  return state
    .setIn(['veriosnNumber'], action.version);
```
Note that we are using [Immutable](https://facebook.github.io/immutable-js/) to process the changes of Redux state. See the [full API of Immutable](https://facebook.github.io/immutable-js/docs/#/).

Let's review the business logic describe in step one and their the implementations.
  1. Fire a HTTP GET request. (implemented in ``compomentWillMount()`` of ``<VersionNumber />``)
  2. Receive responded data, check if there is error, handle the error. (implemented as ``getVersionNumberWatcher()`` saga in ``app/containers/App/sagas.js``)
  3. If no error, dispatch an Redux action. (implemented as ``getVersionNumberWatcher()`` saga in ``app/containers/App/sagas.js``)
  4. Reducer function received the action, compute the 'next' Redux state.  (implemented as a reducer-case in ``app/containers/App/reducer.js`` )
  5. Redux State change initials the UI change in step 11.
