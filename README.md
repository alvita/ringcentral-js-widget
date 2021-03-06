# ringcentral-js-widget

[![Build Status](https://travis-ci.org/ringcentral/ringcentral-js-widget.svg?branch=master)](https://travis-ci.org/ringcentral/ringcentral-js-widget)
[![Coverage Status](https://coveralls.io/repos/github/ringcentral/ringcentral-js-widget/badge.svg?branch=master)](https://coveralls.io/github/ringcentral/ringcentral-js-widget?branch=master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/81c5e5334eff454b9404b05b5c29e09b)](https://www.codacy.com/app/RingCentral/ringcentral-js-widget?utm_source=github.com&utm_medium=referral&utm_content=ringcentral/ringcentral-js-widget&utm_campaign=badger)

## Introduction

RingCentral integration widgets aims to provide reusable UI components to allow developers to integration RingCentral unified communication service into third party processes or tools more easily.

This project is built based on [RingCentral Integration Common Library](https://www.npmjs.com/package/ringcentral-integration) and [React](https://facebook.github.io/react/). The basic idea is to connect modules in RingCentral Integration Common Library with React components to provide ready to use UI widgets.

## Play with Development Server

A development server is delivered with source so that developers can use it to get familiar with the project or do further development. To get development server running

Clone the repo

```bash
git clone https://github.com/ringcentral/ringcentral-js-widget.git
```

Create a file named api-config.js in following format in folder `dev-server` to specify app related info 

```javascript
export default {
  appKey: ${app key},
  appSecret: ${app secret},
  server: ${server url},
};
```

Run following command to start development server

```bash
npm run dev-server
```

The development server is listening on port 8191 by default. Open up your browser and access `localhost:8191` to see how it works. Notice that as the development server is using OAuth for authorization process, please make sure the app configuration you specify above is setup with correct RedirectUri. 
