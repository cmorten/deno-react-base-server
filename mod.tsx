import {
  opine,
  React,
  ReactDOMServer,
} from "./deps.ts";

const browserBundlePath = "/browser.js";

const baseServer = async ({
  appModulePath,
  port = 3000,
}: {
  appModulePath: string;
  port: number;
}) => {
  const app = opine();

  const { default: App } = await import(appModulePath);

  const js =
    `import React from "https://dev.jspm.io/react@16.13.1";\nimport ReactDOM from "https://dev.jspm.io/react-dom@16.13.1";\nconst App = ${App};\nReactDOM.hydrate(React.createElement(App), document.getElementById("react-root"));`;

  const html =
    `<html><head><script type="module" src="${browserBundlePath}"></script><style>* { font-family: Helvetica; }</style></head><body><div id="react-root">${
      (ReactDOMServer as any).renderToString(<App />)
    }</div></body></html>`;

  app.use(browserBundlePath, (req, res, next) => {
    res.type("application/javascript").send(js);
  });

  app.use("/", (req, res, next) => {
    res.type("text/html").send(html);
  });

  app.listen({ port });

  return app;
};

export default baseServer;
