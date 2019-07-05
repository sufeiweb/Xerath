// 方法一
export const ApplyStatus = (val) => {
  switch (val) {
    case '-1':
    case -1:
      return '未申请';
    case '0':
    case 0:
      return '待审核';
    case '1':
    case 1:
      return '已通过';
    case '2':
    case 2:
      return '已拒绝';
    case '3':
    case 3:
      return '已取消申请';
      default:
      return "未知"
  }
}