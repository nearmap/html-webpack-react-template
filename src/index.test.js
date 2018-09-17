import React from 'react';
import renderer from '.';


// eslint-disable-next-line react/prop-types
const TestPage = ({scripts, styles})=> (
  <html>
    <head>
      <tile>test-page</tile>
    </head>
    <body>
      {scripts.join(',')}
      +
      {styles.join(',')}
    </body>
  </html>
);


describe('renderer()', ()=> {
  it('renders component with scripts and styles filtered on entrypoint', ()=> {
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
      '<!DOCTYPE html><html><head><tile>test-page</tile></head><body>' +
      'foo,bar+spam' +
      '</body></html>'
    );
  });
});
