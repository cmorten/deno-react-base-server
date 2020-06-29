import { parse } from "./deps.ts";
import baseServer from "./mod.tsx";

if (import.meta.main) {
  const { args } = Deno;
  const { path, port = 3000 } = parse(args);

  if (!path) {
    console.log("Missing '--path' flag. A valid URL / path to a module which exports a React component (which is the default export) must be provided.");
    Deno.exit(1);
  }

  baseServer({ appModulePath: path, port: port });

  console.log(`Listening on port ${port}`);
}
