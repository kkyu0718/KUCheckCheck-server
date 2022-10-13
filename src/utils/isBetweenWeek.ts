import { addOneWeek } from 'src/utils/addOneWeek';
import * as dayjs from 'dayjs';
import * as isBetween from 'dayjs/plugin/isBetween';

function isBetweenWeek(date: Date, week: string): boolean {
  dayjs.extend(isBetween);
  const oneWeekAfter = addOneWeek(week);
  return dayjs(date).isBetween(week, oneWeekAfter, 'day', '(]');
}

export { isBetweenWeek };
