export function randomItem<T>(array: Array<T>): T {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}
export function randomItemNullable<T>(array: Array<T>): T | undefined {
  const index = Math.floor(Math.random() * array.length + 1);
  return array[index];
}

export function randomIndexAndItem<T>(array: Array<T>, indexesUsed: number[]): { index: number; item: T } {
  const indexArray: number[] = [];

  array.forEach((_value: T, index: number) => {
    if (!indexesUsed.includes(index)) {
      indexArray.push(index);
    }
  });

  const indexItem = Math.floor(Math.random() * indexArray.length);
  const index = indexArray[indexItem];

  return { index, item: array[index] };
}
