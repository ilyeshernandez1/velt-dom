import { ReactiveState } from "./reactive.types";

export type DependentState<T extends Object> = {
    name: string;
    state: ReactiveState<T>;
};