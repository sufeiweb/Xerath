import { formatTimeAll } from './formatTimeAll';
import { formatNumLength } from './formatNumLength';
import { ToThousands } from './ToThousands';
import { NewToThousands } from './NewToThousands';
import { SelectCheck } from './SelectCheck';
import { taskStatus } from './taskStatus';
import { ApplyStatus } from './ApplyStatus';
import { Sex } from './Sex';
import { checkBilltype } from './checkBilltype';
import { vueTaskStatus } from './vueTaskStatus';
import { checkHistoryStatus } from './checkHistoryStatus';
import { TaskDetailStatus } from './TaskDetailStatus';
import { salayType } from './salayType';


export default {
  formatTimeAll,//过滤时间，显示年月日时分秒
  formatNumLength,//保留几位有效数字
  ToThousands, // 千分位分割 。
  NewToThousands, // 千分位分割,- 。
  SelectCheck, // select过滤
  taskStatus, // 任务状态
  ApplyStatus, // 申请状态
  Sex, // 性别
  checkBilltype, // 报酬显示
  vueTaskStatus, // taskDetal vue
  checkHistoryStatus, // checkHistoryStatus vue
  TaskDetailStatus, // TaskDetailStatus vue
  salayType, // salayType vue 薪金类型
}