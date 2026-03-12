// Simple rule-based chatbot for Courier FAQ
exports.askQuestion = async (req, res) => {
    try {
        const { question } = req.body;
        const q = question.toLowerCase();

        let answer = "I am a simple AI assistant. I can help you with questions about sending parcels, payment, and tracking. Could you rephrase your question?";

        if (q.includes('how to send') || q.includes('book a parcel')) {
            answer = "To send a parcel, please register an account, go to your User Dashboard, and click 'Create Parcel'. You will need to provide the receiver's details, parcel weight, and schedule a pickup time.";
        } else if (q.includes('payment') || q.includes('pay') || q.includes('esewa') || q.includes('khalti')) {
            answer = "We accept digital payments via eSewa, Khalti, or Cash on Delivery (COD). You can choose your preferred payment method after booking a parcel from your dashboard.";
        } else if (q.includes('track') || q.includes('status')) {
            answer = "You can track your parcel anytime by entering your Tracking Number on our Home page or in the 'Track Parcel' section of your dashboard.";
        } else if (q.includes('pickup') || q.includes('doorstep')) {
            answer = "We offer doorstep pickup! While booking your parcel, simply select your preferred pickup date, time slot, and location.";
        } else if (q.includes('bulk') || q.includes('wholesale')) {
            answer = "For bulk shipments, we offer special Wholesaler accounts with discount rates. Please contact our support team to upgrade your account.";
        }

        res.json({ answer });
    } catch (error) {
        console.error('AI Assistant Error:', error);
        res.status(500).json({ message: 'Error processing question' });
    }
};
