import React from 'react';
import renderer from '.';
import {Scripts, Styles} from './injectors';

// eslint-disable-next-line react/prop-types
const TestPage = ({scripts, styles})=> (
  <html>
    <head>
      <tile>test-page</tile>
      <Styles files={styles} />
      <Scripts files={scripts} />
    </head>
    <body>
    </body>
  </html>
);


describe('renderer()', ()=> {
  it('renders scripts and styles ', ()=> {
    const render = renderer(TestPage);
    const renderOptions = {
      htmlWebpackPlugin: {
        options: {
          entrypoint: 'test'
        },
        files: {
          js: ['foo', 'bar', 'ni'],
          css: ['spam', 'shrub']
        }
      },
      webpack: {
        entrypoints: {
          test: {assets: ['foo', 'bar', 'spam']}
        }
      }
    };

    const html = render(renderOptions);
    expect(html).toBe(
      '<!DOCTYPE html><html><head><tile>test-page</tile>' +
      '<link href="spam" rel="stylesheet"/>' +
      '<script type="text/javascript" async="" src="foo"></script>' +
      '<script type="text/javascript" async="" src="bar"></script>' +
      '</head><body></body></html>'
    );
  });
});
