import { ReactiveState } from "../types/reactive.types";
import { DependentState } from "../types/setReactivity.types";



/**
 * Sets reactivity within an HTML container by replacing {{}} tags with values from reactive dependencies.
 *
 * @template T - The type of reactive dependencies.
 * @param {HTMLElement | null} container - The HTML element where reactivity should be activated.
 * @param {DependentState<T>[]} dependencies - The list of reactive dependencies.
 */
export function setReactivity<T extends Object>(container: HTMLElement | null, dependencies: DependentState<T>[]) {
    if (container === null) {
        container = document.body;
    }

    const templateHTML = container.innerHTML;

    /**
     * Updates the view by replacing {{}} tags with values from reactive dependencies.
     */
    const updateView = () => {
        const updatedHTML = interpolate(templateHTML, dependencies);
        container!.innerHTML = updatedHTML;
    }

    updateView();

    dependencies.forEach((dep) => {
        dep.state.subscribe(updateView);
    });
}

/**
 * Interpolates text by replacing {{}} tags with values from reactive dependencies.
 *
 * @template T - The type of reactive dependencies.
 * @param {string} text - The text with tags to be replaced.
 * @param {DependentState<T>[]} dependencies - The list of reactive dependencies.
 * @returns {string} The text with tags replaced by values from dependencies.
 */
function interpolate<T extends Object>(text: string, dependencies: DependentState<T>[]) {
    return text.replace(/{{\s*([^}\s]+)\s*}}/g, (match, prop) => {
        const dependency = dependencies.find((d) => d.name === prop);
        if (dependency) {
            return dependency.state.value.toString();
        }
        return match;
    });
}
