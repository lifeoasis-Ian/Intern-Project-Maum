export const blockStringInput = (inputString: string) => {
  return inputString.replace(/[^0-9]/g, "");
};
