export const useSummation = (array = [], key = '') => {
  return array?.reduce((acc, obj) => {
    return acc + parseFloat(obj[key]);
  }, 0);
};
