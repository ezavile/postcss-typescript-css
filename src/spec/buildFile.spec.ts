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
