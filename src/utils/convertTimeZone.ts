import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';

function convertTimeZone(columns: string[], array: object): object {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  columns.map((column) => {
    array[column] = dayjs
      .utc(array[column])
      .tz('Asia/Seoul')
      .format('YYYY-MM-DD HH:mm:ss');
  });
  return array;
}

export { convertTimeZone };
