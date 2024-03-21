export const numberWithCommas = (number) => {
  return number.toLocaleString();
};

export const convertToKst = (originDate) => {
  var adjustDate = new Date(Date.parse(originDate) + 9 * 60 * 60000).toISOString(
    Date(Date.parse(originDate) + 9 * 60 * 60000)
  );
 
  const year = adjustDate.slice(0, 4);
  const month = adjustDate.slice(5, 7);
  const day = adjustDate.slice(8, 10);
  const hour = adjustDate.slice(11, 13);
  const minute = adjustDate.slice(14,16)
  const fullDate = year+""+month+""+day+""+hour+""+minute
  return { year,month,day,hour,minute,fullDate};
};

