document.getElementById('loanForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get input values
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value);
    const repaymentPeriod = parseInt(document.getElementById('repaymentPeriod').value);

    // Basic interest calculation (simple interest for this example)
    const monthlyInterestRate = interestRate / 100 / 12;
    const totalPayments = repaymentPeriod;
    const monthlyPayment = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -totalPayments));
    
    // Display repayment schedule (basic static example)
    let remainingBalance = loanAmount;
    const tableBody = document.querySelector('#repaymentTable tbody');
    tableBody.innerHTML = ''; // Clear previous data

    for (let i = 0; i < totalPayments; i++) {
        const interestApplied = remainingBalance * monthlyInterestRate;
        const principalPaid = monthlyPayment - interestApplied;
        remainingBalance -= principalPaid;

        // Append a row to the table
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${new Date().toLocaleDateString()}</td>
            <td>${monthlyPayment.toFixed(2)}</td>
            <td>${interestApplied.toFixed(2)}</td>
            <td>${remainingBalance.toFixed(2)}</td>
        `;
        tableBody.appendChild(row);
    }
});