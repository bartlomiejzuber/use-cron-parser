## use-cron-parser

![react hook](https://badgen.net/badge/icon/react-hook?icon=libraries&label)
![fully typed](https://badgen.net/badge/icon/fully-typed?icon=typescript&label) 
[![npm](https://img.shields.io/npm/l/hooked-react-stopwatch.svg)](https://www.npmjs.com/package/use-cron-parser)
[![npm](https://badgen.net/bundlephobia/minzip/use-cron-parser)](https://www.npmjs.com/package/use-cron-parser)
[![Coverage Status](https://coveralls.io/repos/github/bartlomiejzuber/use-cron-parser/badge.svg)](https://coveralls.io/github/bartlomiejzuber/use-cron-parser)
[![Build Status](https://travis-ci.org/bartlomiejzuber/use-cron-parser.svg?branch=master)](https://travis-ci.org/bartlomiejzuber/use-cron-parser)
[![License](https://img.shields.io/npm/v/use-cron-parser.svg)](https://github.com/bartlomiejzuber/use-cron-parser/blob/master/LICENSE)
[![Netlify Status](https://api.netlify.com/api/v1/badges/d360c27d-3707-4eb8-a0bd-b6e0d65a3e22/deploy-status)](https://app.netlify.com/sites/use-cron-parser-demo/deploys)
<p align="center">
  <img src="https://raw.githubusercontent.com/bartlomiejzuber/use-cron-parser/master/assets/icon.jpeg" alt="hook icon"/>
</p>

Useful & super tiny (less than 1KB ✔️) (❤️obvious dep on React only) hook to parse cron expression and get Date object with next cron occurrence.

## Installation

```sh
npm i use-cron-parser --save
```

Alternatively you may use `yarn`:

```sh
yarn add use-cron-parser
```

Link to npm:
[https://www.npmjs.com/package/use-cron-parser](https://www.npmjs.com/package/use-cron-parser)

## Usage


  ```javascript
  import React from 'react';
  import { useCronParser }  from 'use-cron-parser';

  const App = () => {
    const cronExpression = "10 * * * *";
    const cron = useCronParser(cronExpression);
    
    return (
      <div className="App">
        <div>{cronExpression}</div>
        <div>{cron.next()}</div>
      </div>
    );
  }

  export default App;
  ```

[DEMO](https://use-cron-parser-demo.netlify.app/)

## Hook params

 | Parameter | Type                   | Description                                             | Required |
|-----------|------------------------|---------------------------------------------------------|----------|
| cronExpression       | string                 | Cron expression to parse                           | Y        |
| options   | useCronParserOptions | Set of hook options (skipValidation etc.) | N        |

## Options

| Option       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Default   |
|--------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|
| skipValidation        | Flag to skip/or not validation.                                                                                                                                                                                                                                                                                                                                                                                                                  | false      |
|

Dependencies ![Deps](https://badgen.net/npm/dependents/use-cron-parser)
--------
None. Self source code only. (❤️obvious peer dep on React only)

Reliability
--------
This package is fully tested with total coverage set to [![Coverage Status](https://coveralls.io/repos/github/bartlomiejzuber/use-cron-parser/badge.svg)](https://coveralls.io/github/bartlomiejzuber/use-cron-parser). If you found any issue please report it [here](https://github.com/bartlomiejzuber/use-cron-parser/issues/new).

License
--------

Made with :sparkling_heart: by [Bartlomiej Zuber (bartlomiej.zuber@outlook.com)](mailto:bartlomiej.zuber@outlook.com) while traveling around the world, and licensed under the [MIT License](LICENSE)
