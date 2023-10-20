function sumToN1(n) {
    var result;
    for (let i = 0; i < n; i++) {
        result += i;
    }

    return result;
}

function sumToN2(n) {
    return n * (n + 1) / 2;
}

function sumToN3(n) {
    if (n === 1) {
        return 1;
    } else {
        return n + sumToN1(n - 1);
    }
}