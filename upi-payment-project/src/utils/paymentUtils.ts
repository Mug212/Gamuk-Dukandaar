function formatAmount(amount: number): string {
    return amount.toFixed(2);
}

function validatePaymentData(data: any): boolean {
    // Add validation logic here
    return true; // Placeholder for actual validation
}

export { formatAmount, validatePaymentData };