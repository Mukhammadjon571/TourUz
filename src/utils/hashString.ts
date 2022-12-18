export const hashstring = (input: string, result: string[]) => {
  const match = result.filter((e) => new RegExp(`^${input}`, 'ig').test(e));
  return match;
};
