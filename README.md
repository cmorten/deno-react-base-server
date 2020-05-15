# deno-react-base-server

Minimal React SSR Base Server in Deno.

## Example

Write your React application and export the top level component as the default export:

```tsx
import { React } from "https://unpkg.com/es-react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: any;
      h1: any;
    }
  }
}

const App = () => {
  return (
    <div>
      <h1>Hello Deno!</h1>
    </div>
  );
};

export default App;
```

Then create an entrypoint script to run your React application on a specified port:

```tsx
import baseServer from "https://raw.githubusercontent.com/asos-craigmorten/deno-react-base-server/master/mod.tsx";

baseServer({
  appModulePath: "https://raw.githubusercontent.com/asos-craigmorten/deno-react-base-server/master/example/app.tsx",
  port: 3000
});
```

Then you can run your application using `deno`:

```console
deno run --allow-net --allow-read --reload "https://raw.githubusercontent.com/asos-craigmorten/deno-react-base-server/master/example/entrypoint.tsx"
```
