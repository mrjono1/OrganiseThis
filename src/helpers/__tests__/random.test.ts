import {
  randomIndex,
  randomArraySplitStartIndex,
  randomItem,
  randomSplitArray,
  randomTrueFalse,
  randomNumber,
  randomItems
} from '../random';

test('randomNumber', () => {
  const index1 = randomNumber(2, 5);
  expect([2, 3, 4, 5]).toContain(index1);

  const index2 = randomNumber(0, 5);
  expect([0, 1, 2, 3, 4, 5]).toContain(index2);

  const index3 = randomNumber(5, 5);
  expect([5]).toContain(index3);

  const index4 = randomNumber(0, 0);
  expect([0]).toContain(index4);
});

test('randomIndex', () => {
  const array1 = ['a'];
  const item1 = randomIndex(array1);
  expect(item1).toBe(0);

  const array2 = ['a', 'b', 'c'];
  const item2 = randomIndex(array2);
  expect(item2).toBeDefined();

  const array3: string[] = [];
  expect(() => randomIndex(array3)).toThrow();

  const item4 = randomIndex(array2, { cannotBeLastIndex: true });
  expect(item4).not.toBe(2);

  expect(() => randomIndex(array2, { startIndex: 2 })).toThrow();

  const item6 = randomIndex(array2, { startIndex: 1 });
  expect(item6).toBe(2);

  const item7 = randomIndex(array2, { cannotBeLastIndex: true, startIndex: 0 });
  expect(item7).toBe(1);
});

test('randomItem', () => {
  const array1 = ['a'];
  const item1 = randomItem(array1);
  expect(item1).toBe('a');

  const array2 = ['a', 'b', 'c'];
  const item2 = randomItem(array2);
  expect(item2).toBeDefined();

  const array3: string[] = [];
  expect(() => randomIndex(array3)).toThrow();
});

test('randomTrueFalse', () => {
  const value = randomTrueFalse();
  expect(value).toBeDefined();
});

test('randomArraySplitStartIndex', () => {
  const array1 = ['a', 'b'];
  const index1 = randomArraySplitStartIndex(array1);
  expect(index1).toBe(1);

  const array2 = ['a', 'b', 'c'];
  const index2 = randomArraySplitStartIndex(array2);

  expect([0, 1, 2]).toContain(index2);
  expect(index2).not.toBe(3);
});

test('randomSplitArray', () => {
  const array1 = ['a', 'b'];
  const index1 = randomSplitArray(array1);
  expect(index1).toStrictEqual({ array1: ['a'], array2: ['b'] });

  const array2 = ['a', 'b', 'c'];
  const index2 = randomSplitArray(array2);

  expect(index2.array1).not.toBe([]);
  expect(index2.array2).not.toBe([]);

  expect(index2.array1[0]).toBe('a');
  // item 'b' can be in either array1 or array2
  expect(index2.array2[index2.array2.length - 1]).toBe('c');
});

test('randomItems', () => {
  const array1 = ['a', 'b'];
  const items1 = randomItems(array1);
  expect([1, 2]).toContain(items1.length);

  const array2 = ['a'];
  const item2 = randomItems(array2);

  expect(item2).toStrictEqual(['a']);

  expect(randomItems([])).toStrictEqual([]);
});
