// 方法一
export const vueTaskStatus = (val) => {
  switch (val) {
    case '0':
    case 0:
      return '未申请';
    case '1':
    case 1:
      return '已申请';
    case '2':
    case 2:
      return '已取消';
    case '3':
    case 3:
      return '已通过';
    case '4':
    case 4:
      return '未通过';
    case 5:
      return '已结束';
    default:
      return "未知";
  }
}