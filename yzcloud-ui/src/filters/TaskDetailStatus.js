// 方法一
export const TaskDetailStatus = (val) => {
  switch (val) {
    case '0':
    case 0:
      return '未申请';
    case '1':
    case 1:
      return '已申请';
    case '2':
    case 2:
      return '申请通过';
    case '3':
    case 3:
      return '申请失败';
    case '4':
    case 4:
      return '已结束';
    case '5':
    case 5:
      return '已取消申请';
    default:
      return "未知"
  }
}