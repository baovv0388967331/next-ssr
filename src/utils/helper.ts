export const replaceString = (text: string, params: { [key: string]: string }) => {
  return Object.entries(params).reduce((result, val) => {
    return result.replace(`{${val[0]}}`, val[1]);
  }, text);
};
