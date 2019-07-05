export const checkBilltype = (value, arr) => {
  let onArr = arr.filter(item => item.id == value);
  if (onArr.length) {
    return onArr[0].name
  }

}