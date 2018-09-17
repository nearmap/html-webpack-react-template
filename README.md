# html-webpack-react-template
Write your HTML webpack plugin templates using React


## Installation
```bash
npm install --save-dev html-webpack-react-template
```


## Usage

Create a module that exports a template render function:

`./src/page1.template.js`
```javascript
import React from 'react';

import renderer from 'html-webpack-react-template';
import {Styles, Scripts} from 'html-webpack-react-template/injectors';


const Html = ({scripts, styles})=> (
  <html>
    <head>
      <title>Page 1</title>
      <Styles files={styles} async />
      <Scripts files={scripts} async />
    </head>
    <body>
      <div id="page1" />
    </body>
  </html>
);

export default renderer(Html);
```

Tell the `HtmlWebpackPlugin` to use the template module.
Specify an `entrypoint` option so that the template will only inject
the scripts and styles which are required by the given `entrypoint`.
You will also need to tell the plugin to not do any injection itself.


`webpack.config.babel.js`
```javascript
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default ()=> ({
  entry: {
    page1: './src/page1.js',
    page2: './src/page2.js',
  },

  plugins: [
    new HtmlWebpackPlugin({
      // Needed by the template to know what scripts and styles to use
      entrypoint: 'page1',
      template: './src/page1.template.js',
      filename: 'page1.html',
      // let the template handle injection rather than the plugin
      inject: false,
    }),
    new HtmlWebpackPlugin({
      entrypoint: 'page2',
      template: './src/page2.template.js',
      filename: 'page1.html',
      inject: false,
    })
  ]
});
```
