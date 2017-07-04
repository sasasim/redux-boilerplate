import stats from './stats.json';

export default (content = '') => `
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <link href="${stats.css}" rel="stylesheet">
    </head>
    <body>
      <div id="root">${content}</div>
      <script type="text/javascript" src="${stats.js}"></script>
    </body>
  </html>
`;
