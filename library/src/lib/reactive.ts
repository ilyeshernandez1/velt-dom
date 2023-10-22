import { Listener, ReactiveState } from "../types/reactive.types";

/**
 * Creates a reactive state with an initial value.
 *
 * @template T - The type of the reactive state.
 * @param {T} initialValue - The initial value of the reactive state.
 * @returns {ReactiveState<T>} The reactive state object.
 */
export function reactive<T>(initialValue: T): ReactiveState<T> {
    let value: T = initialValue;
    const listeners: Listener<T>[] = [];

    const state: ReactiveState<T> = {
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
        subscribe(listener: Listener<T>) {
            listeners.push(listener);
        },
    };

    const handler = {
        set(target: any, prop: string, newValue: T) {
            if (value !== newValue) {
                value = newValue;
                listeners.forEach((listener) => listener(newValue));
            }
            return true;
        },
    };

    return new Proxy(state, handler);
}
