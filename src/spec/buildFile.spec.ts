import test from 'ava';
import build from './../buildFile';

test('should create a string with the classes as a properties', t => {
  const template = build({
    cssFileName: 'fakeComponent',
    content: ['.FakeComponent', '.FakeComponent-descendentName', '.FakeComponent--modifierName']
  });
  t.true(template.includes('fakeComponentStyle'));
  t.true(template.includes('fakeComponent:'));
  t.true(template.includes('fakeComponentDescendentName:'));
  t.true(template.includes('fakeComponentModifierName:'));
});

test('should create a string with transformed classes', t => {
  const template = build({
    cssFileName: 'fakeComponentModules',
    content: {
      fakeComponentModules: '_FakeComponentModules_h7423_1',
      fakeComponentModulesDescendentName: '_FakeComponentModules-descendentName_h7423_1',
      fakeComponentModulesModifierName: '_FakeComponentModules--modifierName_h7423_1'
    }
  });
  t.true(template.includes('fakeComponentModulesStyle'));
  t.true(template.includes('fakeComponentModules:'));
  t.true(template.includes('fakeComponentModulesDescendentName:'));
  t.true(template.includes('fakeComponentModulesModifierName:'));
});
