export const uniqueValuesOfKeyInArrayObj = <T, K>(yourArray: Array<T>, key: keyof T) => {
  // @ts-ignore
  return Array.from(new Set(yourArray.map((item: T) => item[key as keyof T] as K)));
};

export const isExistsValueOfKeyInArrayObj = <T>(list: Array<T>, key: keyof T, value: any) => {
  return list.some((el) => el[key] === value);
};

export const sumValuesOfKeyInArrayObj = <T>(arr: T[], key: keyof T) => {
  return arr.reduce(
    (previousValue: number, currentValue: T, _currentIndex: number, _array: T[]) =>
      previousValue + (Number(currentValue[key]) || 0),
    0
  );
};

// export const groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
//   list.reduce((previous, currentItem) => {
//     const group = getKey(currentItem);
//     if (!previous[group]) previous[group] = [];
//     previous[group].push(currentItem);
//     return previous;
//   }, {} as Record<K, T[]>);

// A little bit simplified version
export const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
  arr.reduce((groups, item) => {
    (groups[key(item)] ||= []).push(item);

    return groups;
  }, {} as Record<K, T[]>);
