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
