export class DateService {
  constructor(dateInput) {
    this.dateInput = dateInput;
    this.months = {
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
    };
  }

  get(format = 'month d,y') {
    const d = new Date(this.dateInput);
    return format === 'month d,y'
      ? `${this.months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
      : 'date format unknown.';
  }
}
