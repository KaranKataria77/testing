export const objectToArray = (data) => {
  return Object.entries(data).map((e) => e[1]);
}