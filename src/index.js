import React from 'react';
import ReactDOMServer from 'react-dom/server';


/**
 * Create a HTML Webpack Plugin template render function for a given
 * React `HtmlComponent`.
 *
 * The created render function will render the `<HtmlComponent .../>`
 * passing as props:
 *   * all `scripts` and `styles` used by the `entrypoint` specified in the
 *    `htmlWebpackPlugin.options` in the webpack config.
 *   * the `htmlWebpackPlugin` and `webpack` object the render function
 *     received so that the componen can customize it's output.
 */
const renderer = (HtmlComponent)=> ({htmlWebpackPlugin, webpack})=> {
  const {options, files} = htmlWebpackPlugin;
  const {entrypoint} = options;

  const {entrypoints} = webpack;
  const {assets} = entrypoints[entrypoint];

  const jsFiles = files.js.filter((path)=> assets.includes(path));
  const cssFiles = files.css.filter((path)=> assets.includes(path));
  
  const html = ReactDOMServer.renderToStaticMarkup(
    <HtmlComponent
      scripts={jsFiles} styles={cssFiles}
      htmlWebpackPlugin={htmlWebpackPlugin}
      webpack={webpack}
    />
  );
  return `<!DOCTYPE html>${html}`;
};

export default renderer;
