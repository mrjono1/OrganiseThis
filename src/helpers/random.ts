export const randomItem = <T>(array: Array<T>): T => {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
};
export const randomItemNullable = <T>(array: Array<T>): T | undefined => {
  const index = Math.floor(Math.random() * array.length + 1);
  return array[index];
};

export const randomIndexAndItem = <T>(array: Array<T>, indexesUsed: number[]): { index: number; item: T } => {
  const indexArray: number[] = [];

  array.forEach((_value: T, index: number) => {
    if (!indexesUsed.includes(index)) {
      indexArray.push(index);
    }
  });

  const indexItem = Math.floor(Math.random() * indexArray.length);
  const index = indexArray[indexItem];

  return { index, item: array[index] };
};

export const randomArraySplitStartIndex = <T>(array: Array<T>): number => {
  if (array.length === 2) {
    return 1;
  }
  return Math.floor(Math.random() * (array.length - 1)) + 1;
};

/**
 * The returning arrays will both have items in them, if the `array` has 2 or more items
 * @param array The array to be split in 2
 */
export const randomSplitArray = <T>(array: Array<T>): { array1: Array<T>; array2: Array<T> } => {
  const index = randomArraySplitStartIndex(array);

  return {
    array1: array.splice(0, index - 1),
    array2: array.splice(index)
  };
};
