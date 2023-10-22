export type Listener<T> = (newValue: T) => void;

export interface ReactiveState<T> {
    value: T;
    subscribe(listener: Listener<T>): void;
}