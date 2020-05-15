# deno-react-base-server

Minimal React SSR Base Server in Deno.

## Example

Write your React application and export the top level component as the default export:

```tsx
import React from "https://dev.jspm.io/react@16.13.1";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      button: any;
      div: any;
      h1: any;
      p: any;
    }
  }
}

const App = () => {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <h1>Hello DenoLand!</h1>
      <button onClick={() => setCount(count + 1)}>Click the 🦕</button>
      <p>You clicked the 🦕 {count} times</p>
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

Where `appModulePath` is the path to your app component module. Can be any path that Deno's import supports, i.e. relative / absolute file path, URL etc.

Then you can run your application using `deno`:

```console
deno run --allow-net --allow-read --reload "https://raw.githubusercontent.com/asos-craigmorten/deno-react-base-server/master/example/entrypoint.tsx"
```
