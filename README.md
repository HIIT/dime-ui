# dime-ui

* [ReactJS](https://facebook.github.io/react/) + [Redux](https://github.com/reactjs/redux)
* The project is written in [ES6/JSX](https://babeljs.io/docs/learn-es2015/) Harmony, the next generation JavaScript and compile into ES5(current version of javascript)with the help of [babel](https://babeljs.io)
* We chose [Webpack](https://webpack.github.io/) for bundling and development helper.

### For Development

1. install node.js <https://nodejs.org/en/> only tested with 5.6 but node.js 4 up should be fine.
2. ``npm install`` to install all the packages for developing
3. ``npm start`` and go to <http://localhost:3001>
4. You should change __const__ ``username``, __const__ ``password`` and __const__ ``RESTServerAddress`` in ``./src/actions/index.js`` to access the APIs from you local DiMe Server
5. edit js files in the ``./src``, webpack-dev-server will monitor the changes and recompile
6. for compiling static ``index.html`` and ``bundle.js``, see next section

### For Production

1. ``npm install`` to install packages for building static html & javascript
2. ``npm run build``
3. There will be an ``index.html`` and a ``bundle.js`` appear after build. They are the compiled static files that could be run in any browsers.