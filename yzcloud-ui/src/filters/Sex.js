// 方法一
export const Sex = (val) => {
  switch (val) {
    case '1':
    case 1:
      return '男生';
    case '2':
    case 2:
      return '女生';
    default:
      return "不限制"
  }
}