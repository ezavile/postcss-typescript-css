import test from 'ava';
import saveFile from './../saveFile';
const path = require('path');


test('should create a new ts file', async (t) => {
  const cssFileName = path.join(__dirname, 'styles/fakeComponent2.postcss');
  t.is(await saveFile({
    cssFileName,
    content: ['.FakeComponent2', '.FakeComponent2-descendentName', '.FakeComponent2--modifierName']
  }), true);
  const tsFile = path.join(__dirname, 'styles/fakeComponent2.ts');
  const tsFileName = path.basename(tsFile, '.ts');
  t.is(tsFileName, 'fakeComponent2');
});

test('should create a new ts file with transformed classes', async (t) => {
  const cssFileName = path.join(__dirname, 'styles/fakeComponentModules.css');
  t.is(await saveFile({
    cssFileName,
    content: {
      fakeComponentModules: '_FakeComponentModules_h7423_1',
      fakeComponentModulesDescendentName: '_FakeComponentModules-descendentName_h7423_1',
      fakeComponentModulesModifierName: '_FakeComponentModules--modifierName_h7423_1'
    }
  }), true);
  const tsFile = path.join(__dirname, 'styles/fakeComponentModules.ts');
  const tsFileName = path.basename(tsFile, '.ts');
  t.is(tsFileName, 'fakeComponentModules');
});

test('throws if there is not a css file name', async (t) => {
  saveFile({
    cssFileName: null,
    content: ['.FakeComponent']
  }).catch((err: string) => {
    t.true(err.includes('TypeError: Path must be a string'));
  });
});

test('throws if there is not a content', async (t) => {
  const cssFileName = path.join(__dirname, 'styles/fakeComponent2.postcss');
  saveFile({
    cssFileName,
    content: null
  }).catch((err: string) => {
    t.true(err.includes('TypeError: Cannot convert undefined or null to object'));
  });
});
