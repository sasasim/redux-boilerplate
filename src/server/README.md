# Node.js server

## Rendering

Boilerplate server is shipped with two options of how to render the content.

1. `src/server/rendering/plainRendering` statically renders the HTML template which is defined in `src/server/rendering/template.js` it does not render any content in `root` div, so it's basically used for client-side rendered only applications.

2. `src/server/rendering/serverSideRendering` renders React application (implemented in client) on the server, it also respects routing, HTTP status codes etc. Just like traditional non SPA application. When the page is rendered and loaded into the browser, React will kick in, attaches all the event handlers and from now on the application is traditional SPA.

Please, keep in mind that when SSR is not a requirement, it's not reccomended to use `serverSideRendering` module, because it simply makes things harder, we can't guarantee that all the code can be used altogether on the server and client. Server side rendering is also an operation which is not for free, theoretically in huge number of requests / second, this overhead is non marginal.


