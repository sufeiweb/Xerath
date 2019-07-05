// 方法一
export const salayType = (val) => {
  switch (val) {
    case '0':
    case 0:
      return '其他';
    case '1':
    case 1:
      return '工资';
    case '2':
    case 2:
      return '服务费';
    default:
      return "未知"
  }
}