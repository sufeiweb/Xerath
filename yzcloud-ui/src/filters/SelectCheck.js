
export const SelectCheck = (value, arr) => {
  const defalutOption = arr.filter(item => (item.value || item.name) === value);
  return defalutOption.length ? (defalutOption[0].code || defalutOption[0].name) : ''
}