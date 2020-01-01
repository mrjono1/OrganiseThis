import { randomArraySplitStartIndex, randomItem, randomItemNullable } from './random';

test('randomItem', () => {
  const array1 = ['a'];
  const item1 = randomItem(array1);
  expect(item1).toBe('a');

  const array2 = ['a', 'b', 'c'];
  const item2 = randomItem(array2);
  expect(item2).toBeDefined();

  const array3: string[] = [];
  const item3 = randomItem(array3);
  expect(item3).toBeUndefined();
});

test('randomItemNullable', () => {
  const array1 = ['a'];
  const item1 = randomItemNullable(array1);
  expect(['a', undefined]).toContain(item1);

  const array2 = ['a', 'b', 'c'];
  const item2 = randomItemNullable(array2);
  expect(['a', 'b', 'c', undefined]).toContain(item2);

  const array3: string[] = [];
  const item3 = randomItemNullable(array3);
  expect(item3).toBeUndefined();
});

test('randomArraySplitStartIndex', () => {
  const array1 = ['a', 'b'];
  const index1 = randomArraySplitStartIndex(array1);
  expect(index1).toBe(1);

  const array2 = ['a', 'b', 'c'];
  const index2 = randomArraySplitStartIndex(array2);

  expect(index2).not.toBe(0);
  expect(index2).not.toBe(3);
});
