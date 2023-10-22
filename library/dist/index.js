var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  reactive: () => reactive,
  setReactivity: () => setReactivity
});
module.exports = __toCommonJS(src_exports);

// src/lib/reactive.ts
function reactive(initialValue) {
  let value = initialValue;
  const listeners = [];
  const state = {
    /**
     * Gets the current value of the reactive state.
     * @type {T}
     */
    get value() {
      return value;
    },
    /**
     * Subscribes a listener function to be called when the state changes.
     * @param {Listener<T>} listener - The listener function.
     */
    subscribe(listener) {
      listeners.push(listener);
    }
  };
  const handler = {
    set(target, prop, newValue) {
      if (value !== newValue) {
        value = newValue;
        listeners.forEach((listener) => listener(newValue));
      }
      return true;
    }
  };
  return new Proxy(state, handler);
}

// src/lib/setReactivity.ts
function setReactivity(container, dependencies) {
  if (container === null) {
    container = document.body;
  }
  const templateHTML = container.innerHTML;
  const updateView = () => {
    const updatedHTML = interpolate(templateHTML, dependencies);
    container.innerHTML = updatedHTML;
  };
  updateView();
  dependencies.forEach((dep) => {
    dep.state.subscribe(updateView);
  });
}
function interpolate(text, dependencies) {
  return text.replace(/{{\s*([^}\s]+)\s*}}/g, (match, prop) => {
    const dependency = dependencies.find((d) => d.name === prop);
    if (dependency) {
      return dependency.state.value.toString();
    }
    return match;
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  reactive,
  setReactivity
});
//# sourceMappingURL=index.js.map