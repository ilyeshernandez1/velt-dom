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
export {
  reactive,
  setReactivity
};
//# sourceMappingURL=index.mjs.map