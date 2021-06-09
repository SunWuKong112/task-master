import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import Context from "./utils/context";

ReactDOM.render(
     <Context>
          <App />
     </Context>,
     document.getElementById("root")
);
registerServiceWorker();