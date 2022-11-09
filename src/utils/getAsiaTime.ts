import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export function getNowDate(): string {
  return dayjs.utc().tz('Asia/Seoul').format('YYYY-MM-DD');
}

export function getNowDateTime(): string {
  return dayjs.utc().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss');
}
