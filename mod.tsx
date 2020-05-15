import { serve } from "https://deno.land/std/http/server.ts";
import { posix } from "https://deno.land/std/path/mod.ts";
import React from "https://dev.jspm.io/react@16.13.1";
import ReactDOMServer from "https://dev.jspm.io/react-dom@16.13.1/server";

const browserBundlePath = "/browser.js";

const baseServer = async ({
  appModulePath,
  port = 8080,
}: {
  appModulePath: string;
  port: number;
}): Promise<void> => {
  const app = serve({ port });

  for await (const req of app) {
    const url = posix.normalize(req.url);
    const { default: App } = await import(appModulePath);

    if (url === "/") {
      const headers = new Headers();
      headers.set("content-type", "text/html; charset=utf-8");

      req.respond({
        body:
          `<html><head><script type="module" src="${browserBundlePath}"></script><style>* { font-family: Helvetica; }</style></head><body>${
            ReactDOMServer.renderToString(<App />)
          }</body></html>`,
        headers,
      });
    } else if (url === browserBundlePath) {
      const headers = new Headers();
      headers.set("content-type", "application/javascript");

      req.respond({
        body:
          `import React from "https://dev.jspm.io/react@16.13.1";\nimport ReactDOM from "https://dev.jspm.io/react-dom@16.13.1";\nconst App = ${App};\nReactDOM.hydrate(React.createElement(App), document.body);`,
        headers,
      });
    } else {
      req.respond({ body: "404 Not Found" });
    }
  }
};

export default baseServer;
