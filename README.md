# dime-ui

* [ReactJS](https://facebook.github.io/react/) + [Redux](https://github.com/reactjs/redux)
* The project is written in [ES6/JSX](https://babeljs.io/docs/learn-es2015/) Harmony, the next generation JavaScript and compile into ES5(current version of javascript)with the help of [babel](https://babeljs.io) and [Webpack](https://webpack.github.io/)

### For Development

1. install node.js <https://nodejs.org/en/> only tested with 5.6 but node.js 4up should be fine.
2. ``npm install`` to fetch all the necessary npm packages
3. You should change __const__ ``username``, ``password`` and ``RESTServerAddress`` in ``./src/actions/index.js`` to access the APIs from you local DiMe Server. This could be done before or after ``npm start``.
4. ``npm start`` and open <http://localhost:3001> in your browsers.
5. edit js files in the ``./src``, webpack-dev-server will monitor the editing and recompile src.
6. for compiling static ``index.html`` and ``bundle.js``, see next section.

### For Production

1. ``npm install`` to install packages for building static html and javascript
2. ``npm run build``
3. There will be an ``index.html`` and a ``bundle.js`` appear after build. They are the compiled static files that could be run in any browsers.