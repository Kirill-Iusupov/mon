// export const uniqueValuesOfKeyInArrayObj = <T, K>(yourArray: Array<T>, key: keyof T) => {
//   return Array.from(new Set(yourArray.map((item: T) => item[key as keyof T] as K)));
// };

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
