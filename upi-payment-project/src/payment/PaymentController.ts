class PaymentController {
    private paymentService: PaymentService;

    constructor(paymentService: PaymentService) {
        this.paymentService = paymentService;
    }

    public async initiatePayment(req: Request, res: Response): Promise<Response> {
        try {
            const paymentRequest = req.body;
            const paymentResponse = await this.paymentService.createPayment(paymentRequest);
            return res.status(200).json(paymentResponse);
        } catch (error) {
            return res.status(500).json({ message: 'Payment initiation failed', error });
        }
    }

    public async verifyPayment(req: Request, res: Response): Promise<Response> {
        try {
            const transactionId = req.params.transactionId;
            const verificationResponse = await this.paymentService.verifyPayment(transactionId);
            return res.status(200).json(verificationResponse);
        } catch (error) {
            return res.status(500).json({ message: 'Payment verification failed', error });
        }
    }
}