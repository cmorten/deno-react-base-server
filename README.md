# deno-react-base-server

Minimal React SSR Base Server in Deno.

> As featured in [Open JS World 2020](https://www.youtube.com/watch?v=doug6st5vAs).

Please use this as an a small demo of how you _could_ write a React SSR application in Deno, and as a useful utility for quickly rendering any React component with SSR. For a walk-through check out [this article](https://dev.to/craigmorten/writing-a-react-ssr-app-in-deno-2m7).

This server uses the [Opine](https://github.com/asos-craigmorten/opine) web framework for Deno. For a more complex React SSR example using bundling, check out the [React example](https://github.com/asos-craigmorten/opine/tree/main/examples/react) on the Opine project.

## Usage

### Using the module

You can use `deno-react-base-server` as an imported module through the [mod.ts](./mod.ts) module.

Write your React application and export the top level component as the _default export_:

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

/**
 * Export the component as the _default export_.
 */
export default App;
```

Then create an entrypoint script to run your React application on a specified port:

```tsx
// Import deno-react-base-server
import baseServer from "https://raw.githubusercontent.com/asos-craigmorten/deno-react-base-server/main/mod.tsx";

// Update `appModulePath` from the example React component to your own.
baseServer({
  appModulePath:
    "https://raw.githubusercontent.com/asos-craigmorten/deno-react-base-server/main/example/app.tsx",
  port: 3000,
});
```

Where `appModulePath` is the path to your app component module. This can be any path that Deno's import supports, i.e. relative / absolute file path, URL etc.

Then you can run your application using the Deno `run` command and passing the path to your entrypoint script. For example:

```console
deno run --allow-net --allow-read "https://raw.githubusercontent.com/asos-craigmorten/deno-react-base-server/main/example/entrypoint.ts"
```

### Using the CLI

You can also use the [cli.ts](./cli.ts) module to run your React application direct from the command line.

For example, to start the example application in this repo on port 3000 we run the [cli.ts](./cli.ts) module and pass the port and path to our top-level React component module as flags.

```console
deno run --allow-net --allow-read "https://raw.githubusercontent.com/asos-craigmorten/deno-react-base-server/main/cli.ts" --port 3000 --path "https://raw.githubusercontent.com/asos-craigmorten/deno-react-base-server/main/example/app.tsx"
```

**Note:** As with the [module](#using-the-module) usage, the top-level React component module provided to the `--path` flag must be exported as the _default export_.

## Supported Deno Versions

This project has been tested with the following versions:

- 1.1.2

Once Deno is installed, you can easily switch between Deno versions using the `upgrade` command:

```bash
# Upgrade to latest version:
deno upgrade

# Upgrade to a specific version, replace `<version>` with the version you want (e.g. `1.0.0`):
deno upgrade --version <version>
```
