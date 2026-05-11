import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { FileText } from 'lucide-react';

export const TermsOfService: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col text-white">
      <main className="flex-grow pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900/50 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-white/10"
          >
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/10">
              <div className="w-16 h-16 bg-racing-red/20 text-racing-red rounded-2xl flex items-center justify-center">
                <FileText className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-white uppercase tracking-tight">Terms of Service</h1>
                <p className="text-gray-400 mt-1">Last updated: May 2026</p>
              </div>
            </div>

            <div className="prose prose-invert max-w-none text-gray-300 space-y-6">
              <section>
                <h2 className="text-xl font-bold text-white uppercase tracking-wider mb-4">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using Alloy Legends, you accept and agree to be bound by the terms and provision of this agreement. 
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white uppercase tracking-wider mb-4">2. Purchases and Payment</h2>
                <p>
                  We offer products for sale on the site. We use Razorpay to process payments. By submitting your payment information, you grant us the right to provide the information to these third parties subject to our Privacy Policy.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white uppercase tracking-wider mb-4">3. Limitation of Liability</h2>
                <p>
                  In no event shall Alloy Legends, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white uppercase tracking-wider mb-4">4. Contact Information</h2>
                <p>
                  Questions about the Terms of Service should be sent to us at <a href="mailto:admin@alloylegends.com" className="text-racing-red hover:text-red-400 transition-colors underline">admin@alloylegends.com</a>.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};
