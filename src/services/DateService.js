const MONTHSTRINGS = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December',
}

export const DateService = (dateInput, format = 'month d,y') => {
  const d = new Date(dateInput)
  if (format === 'month d,y') {
    return `${MONTHSTRINGS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
  } else if (format === 'month d, y, h:m') {
    const hasMinutes = d.getMinutes() ? ':' + d.getMinutes() : ':00'
    return `${MONTHSTRINGS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}, ${d.getHours()}${hasMinutes}`
  } else {
    return 'date format unknown.'
  }
}
