import test, { TestContext } from 'ava';
import { readFileSync } from 'fs';
const path = require('path');
import * as postcss from 'postcss';

import { PostcssTypescriptCss } from '../namespace/PostcssTypescriptCss';
import * as plugin from '../postcss-typescript-css';

function run(t: TestContext, input: {css: string, from: string}, opts?: PostcssTypescriptCss.Options) {
  return postcss([ plugin(opts) ]).process(input.css, { from: input.from })
  .then((result) => {
    let fakeComponentTS;
    if (opts) {
      fakeComponentTS = readFileSync(path.join(__dirname, 'postcss/fakeComponentModules.ts'), 'utf8');
      t.true(fakeComponentTS.includes('fakeComponentModulesStyle'));
      t.true(fakeComponentTS.includes('fakeComponentModules:'));
      t.true(fakeComponentTS.includes('fakeComponentModulesDescendentName:'));
      t.true(fakeComponentTS.includes('fakeComponentModulesModifierName:'));
    } else {
      fakeComponentTS = readFileSync(path.join(__dirname, 'postcss/fakeComponent.ts'), 'utf8');
      t.true(fakeComponentTS.includes('fakeComponentStyle'));
      t.true(fakeComponentTS.includes('fakeComponent:'));
      t.true(fakeComponentTS.includes('fakeComponentDescendentName:'));
      t.true(fakeComponentTS.includes('fakeComponentModifierName:'));
    }
  })
  .catch((err: string) => {
    if (opts) {
      if (!opts.cssFileName) {
        t.is(err, 'The property cssFileName can not be null');
      }
      if (!opts.content) {
        t.is(err, 'The property content can not be null');
      }
    } else {
      t.true(err.includes('TypeError: Path must be a string'));
    }
  });
}

test('should create a ts file', t => {
  const cssFile = path.join(__dirname, 'postcss/fakeComponent.postcss');
  const cssContent = readFileSync(cssFile, 'utf8');
  return run(t, { css: cssContent, from: cssFile });
});

test('should create a ts file with postcss-modules configuration', t => {
  const cssFileName = path.join(__dirname, 'postcss/fakeComponentModules.postcss');
  const content = JSON.parse(readFileSync(path.join(__dirname, 'postcss/fakeComponentModules.json'), 'utf8'));
  return run(t, { css: '', from: '' }, { cssFileName, content });
});

test('throws if cssFileName is null', t => {
  return run(t, { css: '', from: '' }, { cssFileName: null, content: ['.class'] });
});

test('throws if content is null', t => {
  const cssFileName = path.join(__dirname, 'postcss/fakeComponentModules.postcss');
  return run(t, { css: '', from: '' }, { cssFileName, content: null });
});
