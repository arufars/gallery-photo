export const capitalizeFirstLetter = (string: string) => {
  if (typeof string !== "string" || string.length === 0) return "";
  console.table({
    chartAt: string.charAt(0).toLocaleUpperCase(),
    slice: string.slice(1),
  });
  return string.charAt(0).toUpperCase() + string.slice(1);
};
