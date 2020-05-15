import { parse } from "https://deno.land/std/flags/mod.ts";
import baseServer from "./mod.tsx";

if (import.meta.main) {
  const { args } = Deno;
  const { path, port = 3000 } = parse(args);

  baseServer({ appModulePath: path, port: port });
}
