import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Shield } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col text-white">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900/50 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-white/10"
          >
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/10">
              <div className="w-16 h-16 bg-racing-red/20 text-racing-red rounded-2xl flex items-center justify-center">
                <Shield className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-white uppercase tracking-tight">Privacy Policy</h1>
                <p className="text-gray-400 mt-1">Last updated: May 2026</p>
              </div>
            </div>

            <div className="prose prose-invert max-w-none text-gray-300 space-y-6">
              <section>
                <h2 className="text-xl font-bold text-white uppercase tracking-wider mb-4">1. Information We Collect</h2>
                <p>
                  When you visit Alloy Legends or make a purchase, we collect certain information about your device, your interaction with the site, and information necessary to process your purchases. We may also collect additional information if you contact us for customer support.
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li><strong>Device Information:</strong> browser version, IP address, time zone, cookie information, what sites or products you view, search terms, and how you interact with the site.</li>
                  <li><strong>Order Information:</strong> name, billing address, shipping address, payment info (including credit card numbers, parsed securely through Razorpay), email address, and phone number.</li>
                  <li><strong>Authentication Information:</strong> If you choose to sign in via Google or other provider, we receive your email and basic profile information from them.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white uppercase tracking-wider mb-4">2. How We Use Your Information</h2>
                <p>We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations). Additionally, we use this Order Information to:</p>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li>Communicate with you;</li>
                  <li>Screen our orders for potential risk or fraud; and</li>
                  <li>When in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white uppercase tracking-wider mb-4">3. Third Party Services</h2>
                <p>
                  In general, the third-party providers used by us will only collect, use and disclose your information to the extent necessary to allow them to perform the services they provide to us. For example, we use Razorpay for payment processing and Supabase for secure authentication and database management.
                </p>
                <p className="mt-2">
                  However, certain third-party service providers, such as payment gateways, have their own privacy policies in respect to the information we are required to provide to them for your purchase-related transactions.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white uppercase tracking-wider mb-4">4. Security</h2>
                <p>
                  To protect your personal information, we take reasonable precautions and follow industry best practices to make sure it is not inappropriately lost, misused, accessed, disclosed, altered or destroyed. Any payment processing is done through a PCI-DSS compliant provider.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white uppercase tracking-wider mb-4">5. Cookies</h2>
                <p>
                  We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white uppercase tracking-wider mb-4">6. Changes to This Policy</h2>
                <p>
                  We reserve the right to modify this privacy policy at any time, so please review it frequently. Changes and clarifications will take effect immediately upon their posting on the website.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white uppercase tracking-wider mb-4">7. Contact Information</h2>
                <p>
                  If you would like to: access, correct, amend or delete any personal information we have about you, register a complaint, or simply want more information, contact our Privacy Compliance Officer at <a href="mailto:admin@alloylegends.com" className="text-racing-red hover:text-red-400 transition-colors underline">admin@alloylegends.com</a>.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
