import "./styles.css";
import { renderApp, initEventListeners } from "./dom.js";
import { loadState } from "./state.js";

loadState(); // MUST happen first
initEventListeners();
renderApp();
