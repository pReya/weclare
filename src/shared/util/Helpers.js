export const changeInArray = (array, index, changer) =>
  array.map((item, i) => (index === i ? changer(item) : item));

export const deleteInArray = (array, index) =>
  array.filter((item, i) => index !== i);
