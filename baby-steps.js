// console.log(Number(process.argv[2]));

let arguments = process.argv.slice(2);
let numbers = arguments.map((arg) => Number(arg));
let sum = numbers.reduce((prev, curr) => prev + curr, 0);

console.log(sum);
// for (let i = 2; i < process.argv.length - 2; i++) {
//   Number(process.argv[i]);
// }
