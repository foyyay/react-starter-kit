import React from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';
import config from '../config';

import LatoBlack from '../fonts/lato-black-webfont.woff';
import LatoBlack2 from '../fonts/lato-black-webfont.woff2';
import LatoHeavy from '../fonts/lato-heavy-webfont.woff';
import LatoHeavy2 from '../fonts/lato-heavy-webfont.woff2';
import LatoMediumItalic from '../fonts/lato-mediumitalic-webfont.woff';
import LatoMediumItalic2 from '../fonts/lato-mediumitalic-webfont.woff2';
import LatoRegular from '../fonts/lato-regular-webfont.woff';
import LatoRegular2 from '../fonts/lato-regular-webfont.woff2';
import LatoSemibold from '../fonts/lato-semibold-webfont.woff';
import LatoSemibold2 from '../fonts/lato-semibold-webfont.woff2';

const fonts = [
  {
    name: 'Lato Regular',
    sources: [
      { url: LatoRegular2, format: 'woff2' },
      { url: LatoRegular, format: 'woff' },
    ],
  },
  {
    name: 'Lato Medium',
    sources: [
      { url: LatoMediumItalic2, format: 'woff2' },
      { url: LatoMediumItalic, format: 'woff' },
    ],
  },
  {
    name: 'Lato Semibold',
    sources: [
      { url: LatoSemibold2, format: 'woff2' },
      { url: LatoSemibold, format: 'woff' },
    ],
  },
  {
    name: 'Lato Heavy',
    sources: [
      { url: LatoHeavy2, format: 'woff2' },
      { url: LatoHeavy, format: 'woff' },
    ],
  },
  {
    name: 'Lato Black',
    sources: [
      { url: LatoBlack2, format: 'woff2' },
      { url: LatoBlack, format: 'woff' },
    ],
  },
];

/* eslint-disable react/no-danger */

class Html extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    styles: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        cssText: PropTypes.string.isRequired,
      }).isRequired
    ),
    scripts: PropTypes.arrayOf(PropTypes.string.isRequired),
    app: PropTypes.object, // eslint-disable-line
    children: PropTypes.string.isRequired,
  };

  static defaultProps = {
    styles: [],
    scripts: [],
  };

  render() {
    const { title, description, styles, scripts, app, children } = this.props;
    return (
      <html className="no-js" lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {scripts.map(script =>
            <link key={script} rel="preload" href={script} as="script" />
          )}
          <link rel="apple-touch-icon" href="apple-touch-icon.png" />
          {fonts.map(font =>
            <style
              key={font.name}
              dangerouslySetInnerHTML={{
                __html: `@font-face {
                font-family: "${font.name}";
                src:  ${font.sources
                  .map(
                    source => `url("${source.url}") format("${source.format}")`
                  )
                  .join(',')};
              }`,
              }}
            />
          )}
          {styles.map(style =>
            <style
              key={style.id}
              id={style.id}
              dangerouslySetInnerHTML={{ __html: style.cssText }}
            />
          )}
        </head>
        <body>
          <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
          <script
            dangerouslySetInnerHTML={{ __html: `window.App=${serialize(app)}` }}
          />
          {scripts.map(script => <script key={script} src={script} />)}
          {config.analytics.googleTrackingId &&
            <script
              dangerouslySetInnerHTML={{
                __html:
                  'window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;' +
                    `ga('create','${config.analytics
                      .googleTrackingId}','auto');ga('send','pageview')`,
              }}
            />}
          {config.analytics.googleTrackingId &&
            <script
              src="https://www.google-analytics.com/analytics.js"
              async
              defer
            />}
        </body>
      </html>
    );
  }
}

export default Html;
