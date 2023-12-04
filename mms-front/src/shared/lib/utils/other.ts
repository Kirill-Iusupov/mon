import { sha256 } from 'js-sha256';

const padWithZeros = (number: number, length: number): string => {
  let result = number.toString();

  while (result.length < length) {
    result = '0' + result;
  }

  return result;
};

const padLenWithZeros = (num: number, len: number): string => {
  return padWithZeros(num.toString().length, len);
};

const last4SymbolsOfHashFromSHA256 = (text: string): string => {
  // console.log(text);
  // console.log(sha256(text).toString());

  return sha256(text).toString().slice(-4);
};

export { padWithZeros, padLenWithZeros, last4SymbolsOfHashFromSHA256 };
