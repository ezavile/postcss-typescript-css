import test from 'ava';
import saveFile from './../saveFile';
const path = require('path');

const cssFileName = path.join(__dirname, 'postcss/fakeComponent2.postcss');

test('should create a new ts file', async (t) => {
  t.is(await saveFile({
    cssFileName,
    content: ['.FakeComponent', '.FakeComponent2-descendentName', '.FakeComponent2--modifierName']
  }), true);
  const tsFile = path.join(__dirname, 'postcss/fakeComponent2.ts');
  const tsFileName = path.basename(tsFile, '.ts');
  t.is(tsFileName, 'fakeComponent2');
});

test('throws if there is not a file name or content', async (t) => {
  saveFile({
    cssFileName: null,
    content: null
  }).catch((err: string) => {
    t.true(err.includes('TypeError: Path must be a string'));
  });
});
