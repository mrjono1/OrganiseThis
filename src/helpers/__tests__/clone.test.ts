import { deepClone } from '../clone';

export class TestObject {
  public id: number;
  public name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
test('deepClone', () => {
  const complexObject = {
    name: 'Joe',
    address: { street: '1 Smith Street' },
    timestamp: new Date(2020, 1, 1, 12, 11, 1, 11),
    tags: ['smelly', 'lazy'],
    age: 44,
    qualities: [undefined, 'humm'],
    employed: true,
    skill: new TestObject(1, 'sdf')
  };

  const cloned = deepClone(complexObject);

  // string
  expect(cloned.name).toBe('Joe');
  complexObject.name = 'Fred';
  expect(cloned.name).toBe('Joe');
  cloned.name = 'Lou';
  expect(cloned.name).toBe('Lou');

  // nested string
  expect(cloned.address.street).toBe('1 Smith Street');
  complexObject.address.street = '1 Baker Street';
  expect(cloned.address.street).toBe('1 Smith Street');

  // Date
  expect(cloned.timestamp).toStrictEqual(new Date(2020, 1, 1, 12, 11, 1, 11));
  complexObject.timestamp = new Date(2011, 3, 9, 1, 1);
  expect(cloned.timestamp).toStrictEqual(new Date(2020, 1, 1, 12, 11, 1, 11));

  // undefined
  expect(cloned.qualities[0]).toBeUndefined();
  complexObject.qualities[0] = 'incoherant';
  expect(cloned.qualities[0]).toBeUndefined();

  // array
  expect(cloned.tags).toStrictEqual(['smelly', 'lazy']);
  complexObject.tags.push('tries');
  expect(cloned.tags).toStrictEqual(['smelly', 'lazy']);

  // boolean
  expect(cloned.employed).toBe(true);
  complexObject.employed = false;
  expect(cloned.employed).toBe(true);

  // custom Object
  expect(cloned.skill.id).toBe(1);
  complexObject.skill.id = 44;
  expect(cloned.skill.id).toBe(1);
});
