# postcss-typescript-css

[![Travis](https://img.shields.io/travis/ezavile/postcss-typescript-css.svg?style=flat-square)](https://travis-ci.org/ezavile/postcss-typescript-css)
[![Codecov](https://img.shields.io/codecov/c/github/ezavile/postcss-typescript-css.svg?style=flat-square)](https://codecov.io/gh/ezavile/postcss-typescript-css)
[![npm](https://img.shields.io/npm/v/postcss-typescript-css.svg?style=flat-square)](https://www.npmjs.com/package/postcss-typescript-css)
[![MIT License](https://img.shields.io/npm/l/postcss-typescript-css.svg?style=flat-square)](http://opensource.org/licenses/MIT)

A [PostCSS] plugin to create a TypeScript file by each CSS file.

## Installation
```
npm install postcss-typescript-css
```

What is this? For example, you have the following CSS file:

**componentName.css**
```css
.ComponentName {
   color: green;
}
.ComponentName-descendentName {
   color: yellow;
}
.ComponentName--modifierName {
   color: red;
}
```
And the plugin will give you a TypeScript file like this:

**componentName.ts**
```javascript
export const componentNameStyle = {
   componentName: 'ComponentName',
   componentDescendentName: 'ComponentName-descendentName',
   componentModifierName: 'ComponentName--modifierName',
};
```
So, you can import the TypeScript file

**Note: you have to import first the componentName.css**
```javascript
import './componentName.css';
import { componentNameStyle } from './componentName';

const element = document.createElement('div');
element.className = componentNameStyle.componentName;
```
## Usage
```javascript
postcss([
   require('postcss-typescript-css')
]);
```
**if you are using [postcss-modules] you need to do this:**

```javascript
postcss([
   require('postcss-modules')({
      getJSON: (cssFileName, json) => {
         require('postcss-typescript-css')({
            cssFileName: cssFileName,
            content: json,
         })();
      }
   })
]);
```
## Options

### Note: only use the options if you are using [postcss-modules]

#### cssFileName
Type: string

#### content
Type: object (JSON object)

## Testing
This will build scripts, run tests and generate a code coverage report. Anything less than 100% coverage will throw an error.
```javascript
npm test
```
## Example
Take a look a this [repo]. Here you could see the plugin in action with webpack2 and react with TypeScript and PostCSS.

See [PostCSS] docs for examples for your environment.

## Thanks
Inspired by [postcss-generate-ts-hash], [postcss-modules] and [postcss-font-pack] to create the structure of the project

## Contributing
* ⇄ Pull requests and ★ Stars are always welcome.
* For bugs and feature requests, please create an issue.
* Pull requests must be accompanied by passing automated tests (`npm test`).

[MIT License]

[PostCSS]: https://github.com/postcss/postcss
[postcss-modules]: https://github.com/css-modules/postcss-modules
[repo]: https://github.com/ezavile/postcss-typescript-css-example
[postcss-font-pack]: https://github.com/jedmao/postcss-font-pack
[postcss-generate-ts-hash]: https://github.com/mohsen1/postcss-generate-ts-hash
[MIT License]: https://github.com/ezavile/postcss-typescript-css/blob/master/LICENSE
