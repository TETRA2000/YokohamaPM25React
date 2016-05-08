export default class PM25Data {
  constructor(src) {
    let arrayOfLines = src.match(/[^\r\n]+/g);

    console.log(src);

    this.headers = arrayOfLines[0].split(',');
    console.log(this.headers);

    this.data = arrayOfLines.slice(1).map((line) => {
      let arr = line.split(',');

      return {
        date: arr[0],
        average: arr[arr.length - 2],
        validHour: arr[arr.length - 1],
        values: arr.slice(1, arr.length - 2)
      }
    }).reverse();
    console.log(this.data);

    let lastLine = arrayOfLines[arrayOfLines.length -1];
    this.dayOfLastData = lastLine.split(',')[0];

    console.log(this.dayOfLastData);
  }
}