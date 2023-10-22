# [Velt DOM](https://www.npmjs.com/package/velt-dom)

Velt DOM is a simple library for managing reactive states in TypeScript applications. It allows you to create and manage reactive data that automatically updates the user interface when values change. This library is designed to provide a straightforward way to build reactive applications.

## Features

- Create reactive states with initial values.
- Subscribe to changes in reactive states.
- Automatically update the user interface when reactive states change.

## Installation

You can install the library using npm or yarn:

```bash
npm install velt-dom
```
or 
```bash
yarn add velt-dom
```
or 
```bash
pnpm add velt-dom
```

# Getting Started
To get started, you need to import the library and use its functions to create and manage reactive states. Here's a basic example of how to use the library:
```ts
import { reactive, setReactivity } from 'velt-dom';

// Create a reactive state with an initial value
const count = reactive<number>(0);

// Set up reactivity in the DOM
setReactivity(document.getElementById('app'), [count]);

// Now, changes to 'count' will automatically update the DOM
setInterval(() => {
    count.value++;
}, 2000);
```

# Contributing
We welcome contributions from the community. If you find a bug, have a feature request, or want to improve the library, make a pull request or issue.

# License
This library is released under the MIT License.