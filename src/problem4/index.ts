//Use loop
//adding each number to the sum.The time complexity is O(n) because it performs n operations.
function sum_to_n_a(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}
// Use recursive
// It calls itself n-1 times untils n <=0. The time complexity is O(n) too, because it makes n times recursive call.
function sum_to_n_b(n: number): number {
    if (n <= 0) {
        return 0;
    } else {
        return n + sum_to_n_b(n - 1); // Call sum_to_n_b recursively
    }
}
//Use formula
//It return result as long as you provide n:number. The time complexity is O(1). Because it performs a constant number of operations
//Regardless of the size of n.But this function still can be error due to potential overflow issues.
function sum_to_n_c(n: number): number {
    return n * (n + 1) / 2;
}

let n: number = 5;

let resultTotal: { [key: string]: number } = {
    'sum_to_n_a': sum_to_n_a(n),
    'sum_to_n_b': sum_to_n_b(n),
    'sum_to_n_c': sum_to_n_c(n)
};

console.log(resultTotal)