export const changeInArray = (array, index, changer) =>
  array.map((item, i) => (index === i ? changer(item) : item));

export const deleteInArray = (array, index) =>
  array.filter((item, i) => index !== i);

export const reorderArray = (array, oldIndex, newIndex) => {
  if (array) {
    array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
  }
};
