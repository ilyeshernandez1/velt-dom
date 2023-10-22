type Listener<T> = (newValue: T) => void;
interface ReactiveState<T> {
    value: T;
    subscribe(listener: Listener<T>): void;
}

/**
 * Creates a reactive state with an initial value.
 *
 * @template T - The type of the reactive state.
 * @param {T} initialValue - The initial value of the reactive state.
 * @returns {ReactiveState<T>} The reactive state object.
 */
declare function reactive<T>(initialValue: T): ReactiveState<T>;

type DependentState<T extends Object> = {
    name: string;
    state: ReactiveState<T>;
};

/**
 * Sets reactivity within an HTML container by replacing {{}} tags with values from reactive dependencies.
 *
 * @template T - The type of reactive dependencies.
 * @param {HTMLElement | null} container - The HTML element where reactivity should be activated.
 * @param {DependentState<T>[]} dependencies - The list of reactive dependencies.
 */
declare function setReactivity<T extends Object>(container: HTMLElement | null, dependencies: DependentState<T>[]): void;

export { DependentState, Listener, ReactiveState, reactive, setReactivity };
