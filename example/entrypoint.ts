import baseServer from "../mod.tsx";

await baseServer({ appModulePath: "./example/app.tsx", port: 3000 });

console.log("Listening on port 3000");
