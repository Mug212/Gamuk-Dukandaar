export interface PaymentRequest {
    amount: number;
    currency: string;
    transactionId: string;
    callbackUrl: string;
    merchantId: string;
}

export interface PaymentResponse {
    success: boolean;
    transactionId: string;
    status: string;
    message?: string;
}