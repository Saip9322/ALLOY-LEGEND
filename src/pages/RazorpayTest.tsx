import React, { useState, useEffect } from 'react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const RazorpayTest: React.FC = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [amount, setAmount] = useState('10'); // Default ₹10
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'failed'>('idle');
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // Dynamically load the Razorpay checkout script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = () => {
    if (!scriptLoaded) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    setPaymentStatus('idle');
    setErrorMessage(null);

    // Convert INR to paise for Razorpay API (multiply by 100)
    const amountInPaise = parseInt(amount) * 100;

    const options = {
      key: 'rzp_live_SlhrHu2XTdkB2X', // The live key provided
      amount: amountInPaise, 
      currency: 'INR',
      name: 'Alloy Legends',
      description: 'Razorpay Test Transaction',
      image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?q=80&w=200&auto=format&fit=crop',
      handler: function (response: any) {
        setPaymentStatus('success');
        setPaymentId(response.razorpay_payment_id);
      },
      prefill: {
        name: 'Test Customer',
        email: 'test@alloylegends.com',
        contact: '9999999999'
      },
      notes: {
        testing: 'This is a test payment from the Alloy Legends testing page'
      },
      theme: {
        color: '#ca0000' // Racing Red
      }
    };

    const rzp1 = new window.Razorpay(options);
    
    rzp1.on('payment.failed', function (response: any) {
      setPaymentStatus('failed');
      setErrorMessage(response.error.description || 'Payment failed');
      console.error('Razorpay Error:', response.error);
    });

    rzp1.open();
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-black mb-4 uppercase tracking-tight">Razorpay Testing</h1>
      <p className="text-gray-500 mb-8 max-w-sm mx-auto">
        Test the Razorpay payment interface using the provided live API key. Make a small payment to verify the flow.
      </p>
      
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-left">
        <div className="mb-6">
          <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">
            Payment Amount (₹)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-racing-red focus:border-transparent outline-none transition-all font-mono"
            min="1"
          />
        </div>
        
        {paymentStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl">
            <p className="font-bold mb-1">Payment Successful!</p>
            <p className="text-sm">Payment ID: <span className="font-mono">{paymentId}</span></p>
          </div>
        )}

        {paymentStatus === 'failed' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
            <p className="font-bold mb-1">Payment Failed</p>
            <p className="text-sm">{errorMessage}</p>
          </div>
        )}
        
        <button
          onClick={handlePayment}
          disabled={!scriptLoaded || parseInt(amount) < 1}
          className="w-full bg-racing-red text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-red-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {scriptLoaded ? `Pay ₹${amount} with Razorpay` : 'Loading Razorpay SDK...'}
        </button>

        <p className="mt-4 text-xs text-gray-400 text-center">
          Note: This uses the LIVE Razorpay API Key. Real transactions will occur.
        </p>
      </div>
    </div>
  );
};
