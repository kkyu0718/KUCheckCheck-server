import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import * as utc from 'dayjs/plugin/utc';
import * as tz from 'dayjs/plugin/timezone';

function addOneWeek(week: Date): Date {
  dayjs.extend(customParseFormat);
  dayjs.extend(utc);
  return dayjs.utc(week).tz('Asia/Seoul').add(1, 'week').toDate();
}

export { addOneWeek };
