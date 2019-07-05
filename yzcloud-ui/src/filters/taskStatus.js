// 方法一
export const taskStatus = (val) => {
  switch (val) {
    case '0':
    case 0:
      return '草稿';
    case '1':
    case 1:
      return '已发布';
    case '2':
    case 2:
      return '进行中';
    case '3':
    case 3:
      return '已满员';
    case '4':
    case 4:
      return '已结束';
    default:
      return "未知";
  }
}