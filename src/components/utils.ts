export const formatTimeIST = (value: Date | string | undefined): string => {
  if (!value) return 'N/A';

  const date = new Date(value);
  return date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata',
  });
};

export const formatToDateTimeIST = (date: Date | string): string => {
  const inputDate = new Date(date);
  return inputDate.toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

export const startEndDateFormat = (start: Date | string, end: Date | string): string => {
  return `${formatToDateTimeIST(start)} – ${formatToDateTimeIST(end)}`;
};

export const formatFullDateWithWeekday = (date: Date | string): string => {
  const inputDate = new Date(date);
  return inputDate.toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });
};