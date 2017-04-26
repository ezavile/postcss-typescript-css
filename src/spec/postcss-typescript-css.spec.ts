import test, { TestContext } from 'ava';
import { readFileSync } from 'fs';
const path = require('path');
import * as postcss from 'postcss';

import { PostcssTypescriptCss } from '../namespace/PostcssTypescriptCss';
import * as plugin from '../postcss-typescript-css';

function run(t: TestContext, input: {css: string, from: string}) {
  return postcss([ plugin ]).process(input.css, { from: input.from })
  .then((result) => {
    const fakeComponentTS = readFileSync(path.join(__dirname, 'postcss/fakeComponent.ts'), 'utf8');
    t.true(fakeComponentTS.includes('fakeComponentStyle'));
    t.true(fakeComponentTS.includes('fakeComponent:'));
    t.true(fakeComponentTS.includes('fakeComponentDescendentName:'));
    t.true(fakeComponentTS.includes('fakeComponentModifierName:'));
  })
  .catch((err: string) => {
    t.true(err.includes('TypeError: Path must be a string'));
  });
}

test('should create a ts file', t => {
  const cssFile = path.join(__dirname, 'postcss/fakeComponent.postcss');
  const cssContent = readFileSync(cssFile, 'utf8');
  return run(t, { css: cssContent, from: cssFile });
});

test('throws if cssFileName is null', t => {
  return run(t, { css: '', from: '' });
});
