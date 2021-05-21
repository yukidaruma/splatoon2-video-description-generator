/**
 * @example hmsToSeconds('1') === 1
 * @example hmsToSeconds('1:20') === 80
 * @example hmsToSeconds('1:02:30') === 3750
 */
export const hmsToSeconds = (hmsString: string): number => {
  const parts = hmsString.split(':').map((part) => parseInt(part, 10));
  return parts.reverse().reduce((sum, part, i) => sum + part * 60 ** i, 0);
};

const ONE_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const ONE_HOUR = MINUTES_IN_HOUR * ONE_MINUTE;
const zeroPadTimeUnit = (num: number) => num.toString().padStart(2, '0');

/**
 * @description Inverse function of `hmsToSeconds`.
 * @example formatTime(59) === '59'
 * @example formatTime(60) === '1:00'
 * @example formatTime(3723) === '1:02:03'
 */
export const formatTime = (time: number): string => {
  const seconds = time % ONE_MINUTE;
  const minutes = Math.floor(time / ONE_MINUTE) % MINUTES_IN_HOUR;
  const hours = Math.floor(time / ONE_HOUR);

  const formattedTime = [minutes, seconds].map(zeroPadTimeUnit).join(':');
  if (hours) {
    return `${hours}:${formattedTime}`;
  }
  return formattedTime;
};
