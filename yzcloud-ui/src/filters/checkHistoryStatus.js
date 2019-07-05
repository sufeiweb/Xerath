// 方法一
export const checkHistoryStatus = (val) => {
  switch (val) {
    case '0':
    case 0:
      return '已申请';
    case '1':
    case 1:
      return '已取消';
    case '2':
    case 2:
      return '进行中';
    case '3':
    case 3:
      return '未通过';
    case '4':
    case 4:
      return '已通过';
    default:
      return "未知"
  }
}