<h1 align="center">Fintoc.js ES Module</h1>

<p align="center">
    <em>
        Use the <a href="https://docs.fintoc.com/docs/widget" target="_blank">Fintoc widget</a> as an ES module.
    </em>
</p>

<p align="center">
<a href="https://www.npmjs.com/package/@fintoc/fintoc-js" target="_blank">
    <img src="https://img.shields.io/npm/v/@fintoc/fintoc-js?label=version&logo=nodedotjs&logoColor=%23fff&color=306998" alt="NPM - Version">
</a>

<a href="https://github.com/fintoc-com/fintoc-js/actions?query=workflow%3Alinters" target="_blank">
    <img src="https://img.shields.io/github/workflow/status/fintoc-com/fintoc-js/linters?label=linters&logo=github" alt="Linters">
</a>
</p>

## Installation

Install using npm! (or your favourite package manager)

```sh
# Using npm
npm install @fintoc/fintoc-js

# Using yarn
yarn add @fintoc/fintoc-js
```

**Note:** This library requires [**Node 10+**](https://nodejs.rg/en/blog/release/v10.0.0).

## Usage

`Fintoc.js` exports a single method called `getFintoc`. This is an `async` method that returns the `Fintoc` object from [the documentation](https://docs.fintoc.com/docs/widget-web-integration#how-it-works). To get the `Fintoc` object, use the following _snippet_:

```js
import { getFintoc } from '@fintoc/fintoc-js';

const Fintoc = await getFintoc();
```

After retrieving the `Fintoc` object, you are ready to instantiate the widget:

```js
const options = { ... };

const widget = Fintoc.create(options);
```

Here, `options` corresponds to an object with the parameters received by the widget (you can read more about these parameters [here](https://docs.fintoc.com/docs/widget-web-integration#how-it-works)).

Finally, you can use any of the widget methods:

```js
widget.open();
widget.close();
widget.destroy();
```

You can read more about these methods [here](https://docs.fintoc.com/docs/widget-web-integration#methods-of-the-widget-object).

## TypeScript support

This package includes TypeScript declarations for the Fintoc widget.

## Developing

To develop the package, you need to use `npm`. Install the dependencies:

```sh
npm install
```

Build the library and watch for changes to the code:

```sh
npm run watch:build
```

If you want to create a new _release_, you can run:

```sh
git switch master
npm run bump! <major|minor|patch>
```

This will create a new branch with the updated version from `master`.
