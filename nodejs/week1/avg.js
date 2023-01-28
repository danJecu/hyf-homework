const input = process.argv.slice(2);
const sum = input
    .map(item => parseFloat(item))
    .filter(item => !isNaN(item))
    .reduce((acc, val) => acc + val, 0);

const average = sum / input.filter(item => !isNaN(parseFloat(item))).length;

if (isNaN(average)) {
    console.log('Please enter at least two numbers...');
} else {
    console.log(average);
}
