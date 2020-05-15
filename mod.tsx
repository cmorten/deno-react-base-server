import { serve } from "https://deno.land/std/http/server.ts";
import { posix } from "https://deno.land/std/path/mod.ts";
import { React } from "https://unpkg.com/es-react";
import ReactDOMServer from "https://dev.jspm.io/react-dom/server";

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
      req.respond({
        body:
          `<html><head><script type="module" src="${browserBundlePath}"></script></head><body>${
            ReactDOMServer.renderToString(
              <App />,
            )
          }</body></html>`,
      });
    } else if (url === browserBundlePath) {
      const headers = new Headers();
      headers.set("content-type", "application/javascript");

      req.respond({
        body:
          `import { React, ReactDOM } from "https://unpkg.com/es-react";\nconst App = ${App};\nReactDOM.hydrate(<App />, document.body);`,
        headers,
      });
    } else {
      req.respond({ body: "404 Not Found" });
    }
  }
};

export default baseServer;
