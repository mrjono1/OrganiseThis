/**
 * Get a random array index
 *
 * @param array The array to get random index
 * @param options Designed to use `cannotBeLastIndex` or `startIndex` seperatly they *may* work togeather
 */
export const randomIndex = <T>(
  array: Array<T>,
  options?: {
    cannotBeLastIndex?: boolean;
    startIndex?: number;
  }
): number => {
  if (!array || array.length === 0) {
    throw 'Cannot get random index of empty array';
  }

  let length = array.length;

  if (options) {
    if (options.startIndex !== undefined) {
      length = length - (options.startIndex + 1);
    }
    if (options.cannotBeLastIndex === true) {
      length--;
    }
  }

  if (length <= 0) {
    throw '"options" values are invalid';
  }
  const index = Math.floor(Math.random() * length);

  if (options && options.startIndex !== undefined) {
    return index + options.startIndex + 1;
  }
  return index;
};

export const randomItem = <T>(array: Array<T>): T => {
  return array[randomIndex(array)];
};

export const randomTrueFalse = (): boolean => {
  return Math.floor(Math.random() * 2) === 1;
};

export const randomIndexAndItem = <T>(array: Array<T>, indexesUsed: number[] = []): { index: number; item: T } => {
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
    array1: array.slice(0, index),
    array2: array.slice(index)
  };
};
