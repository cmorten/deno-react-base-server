import React from "https://dev.jspm.io/react@16.13.1";
import ReactDOMServer from "https://dev.jspm.io/react-dom@16.13.1/server";
import opine from "https://raw.githubusercontent.com/asos-craigmorten/opine/master/mod.ts";
import { Application } from "https://raw.githubusercontent.com/asos-craigmorten/opine/master/typings/index.d.ts";

const browserBundlePath = "/browser.js";

const baseServer = async ({
  appModulePath,
  port = 8080,
}: {
  appModulePath: string;
  port: number;
}): Promise<Application> => {
  const app = opine();

  const { default: App } = await import(appModulePath);

  const js =
    `import React from "https://dev.jspm.io/react@16.13.1";\nimport ReactDOM from "https://dev.jspm.io/react-dom@16.13.1";\nconst App = ${App};\nReactDOM.hydrate(React.createElement(App), document.body);`;

  const html =
    `<html><head><script type="module" src="${browserBundlePath}"></script><style>* { font-family: Helvetica; }</style></head><body>${
      (ReactDOMServer as any).renderToString(<App />)
    }</body></html>`;

  app.use(browserBundlePath, (_req, res, _next) => {
    res.type("application/javascript").send(js);
  });

  app.use("/", (_req, res, _next) => {
    res.type("text/html").send(html);
  });

  app.listen({ port });

  return app;
};

export default baseServer;
