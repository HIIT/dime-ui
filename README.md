# dime-ui

React-based user interface for [dime-server](https://github.com/HIIT/dime-server)

1. get node.js <https://nodejs.org/en/>
2. ``npm install`` to fetch dependencies
4. ``npm start`` and open <http://localhost:3000> in your browser.
5. edit files in ``app/``, webpack-dev-server will monitor the editing and recompile
6. Unfortunately since dime-server does not have API to create accounts, the dime username and password are hardcoded in js. Modfiy your dime username/password/server address in ``app/containers/App/reducer.js``
7. ``npm run build`` and compiled html/js/css will be genreated in ``build/*``.
8. Copy ``build/index.html`` and replace ``[dime-server:branch=new-dime-ui]/src/main/resources/templates/index.html``
9. Copy all files except ``index.html`` in ``build/`` and replace everything in ``[dime-server:branch=new-dime-ui]/src/main/resources/static``
10. ``make run`` your dime-server

##### screencast
![screencast](http://hiit.github.io/dime-ui/screencast.gif)
