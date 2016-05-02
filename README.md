# dime-ui

* [ReactJS](https://facebook.github.io/react/) + [Redux](https://github.com/reactjs/redux)
* The project is written in [ES6/JSX](https://babeljs.io/docs/learn-es2015/) Harmony, the next generation JavaScript and compile into ES5(current version of javascript)with the help of [babel](https://babeljs.io) and [Webpack](https://webpack.github.io/)

![screencast](http://hiit.github.io/dime-ui/screencast.gif)

### For Development

1. install node.js <https://nodejs.org/en/>
2. ``npm install`` to fetch all the necessary npm packages
4. ``npm start`` and open <http://localhost:3001> in your browsers.
5. edit js files in the ``./src``, webpack-dev-server will monitor the editing and recompile src.
6. your local dime-server must run at port 127.0.0.1:8080, if not, find ``let url = `http://${username}:${password}@127.0.0.1:8080${req.originalUrl}`` in ``./CORSenabler.js`` and modify ``127.0.0.1:8080`` to your port number/address.

### For Production

1. ``npm install`` to install packages for building static html and javascript
2. ``npm run build``
3. There will be an ``index.html`` and a ``bundle.js`` appear after build. They are the compiled static files that could be run in any (modern) browsers.