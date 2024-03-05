export const validateDate = (date: string, setError: () => void): boolean => {
  if (isNaN(Number(new Date(date)))) {
    setError();
    return false;
  }
  return true;
};

export const convertUTCtoLocaleZoneString = (date: Date) => {
  if (date.getTimezoneOffset() > 0) {
    return new Date(
      date.setMinutes(date.getMinutes() + date.getTimezoneOffset()),
    )
      .toISOString()
      .replace('T', ' ')
      .slice(0, 19);
  } else {
    return new Date(
      date.setMinutes(date.getMinutes() - date.getTimezoneOffset()),
    )
      .toISOString()
      .replace('T', ' ')
      .slice(0, 19);
  }
};
