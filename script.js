function parsePolynomial(input) {
    const terms = input.split('+').map(term => term.trim());
    const coefficients = terms.map(term => {
        const coefficient = term.split('x')[0].trim();
        return coefficient === '' ? 1 : parseInt(coefficient);
    });
    return coefficients;
}

function calculate() {
    const poly1 = parsePolynomial(document.getElementById('poly1').value);
    const poly2 = parsePolynomial(document.getElementById('poly2').value);

    const result_addition = polynomialToString(addPolynomials(poly1, poly2));
    const result_subtraction = polynomialToString(subtractPolynomials(poly1, poly2));
    const result_multiplication = polynomialToString(multiplyPolynomials(poly1, poly2));

    document.getElementById('result').innerText = `Addition: ${result_addition}\nSubtraction: ${result_subtraction}\nMultiplication: ${result_multiplication}`;
}

function addPolynomials(poly1, poly2) {
    const result = [];

    for (let i = 0; i < Math.max(poly1.length, poly2.length); i++) {
        const term1 = poly1[i] || 0;
        const term2 = poly2[i] || 0;
        result.push(term1 + term2);
    }

    return result;
}

function subtractPolynomials(poly1, poly2) {
    const result = [];

    for (let i = 0; i < Math.max(poly1.length, poly2.length); i++) {
        const term1 = poly1[i] || 0;
        const term2 = poly2[i] || 0;
        result.push(term1 - term2);
    }

    return result;
}

function multiplyPolynomials(poly1, poly2) {
    const result = Array(poly1.length + poly2.length - 1).fill(0);

    for (let i = 0; i < poly1.length; i++) {
        for (let j = 0; j < poly2.length; j++) {
            result[i + j] += poly1[i] * poly2[j];
        }
    }

    return result;
}

function polynomialToString(coefficients) {
    const terms = coefficients.map((coeff, index) => {
        if (coeff !== 0) {
            const term = coeff !== 1 ? coeff : '';
            const degree = coefficients.length - index - 1;
            const variable = degree > 0 ? `x^${degree}` : '';
            return term + variable;
        }
        return '';
    }).filter(term => term !== '');

    return terms.join(' + ') || '0';
}
