//Using loop
var sum_to_n_a = function (n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}
//Using if-else + recursion
var sum_to_n_b = function sum_to_n(n) {
    if (n === 1) {
        return 1;
    } else {
        return n + sum_to_n(n - 1);
    }
}
//Using the formula
var sum_to_n_c = function (n) {
    return n * (n + 1) / 2;
}
//declare
let n = 10;
//result
const result = {
    'sum_to_n_a': sum_to_n_a(n),
    'sum_to_n_b': sum_to_n_b(n),
    'sum_to_n_c': sum_to_n_c(n)
}
console.log(result)