import { parse } from "./dep.ts";
import baseServer from "./mod.tsx";

if (import.meta.main) {
  const { args } = Deno;
  const { path, port = 3000 } = parse(args);

  baseServer({ appModulePath: path, port: port });

  console.log(`Listening on port ${port}`);
}
